import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string | null;
  songUrl?: string | null;
}

// Poll the serverless proxy periodically. Kept modest so we stay well within
// Spotify's rate limits (the function also caches for 30s at the edge).
const POLL_MS = 30_000;

const SpotifyNowPlaying = () => {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVibing, setIsVibing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Poll real playback.
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) throw new Error("request failed");
        const json = (await res.json()) as NowPlaying;
        if (active) setData(json);
      } catch {
        // Backend not configured / offline — keep the widget hidden.
        if (active) setData(null);
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  // A stable key for the current song — changes on load AND whenever the polled
  // track changes, which is how we "catch onchange".
  const songKey =
    data?.isPlaying && data.title ? `${data.title}|${data.artist}` : null;

  // Whenever the song changes, look up a free playable preview. If one exists,
  // the "Vibe with me" button renders; otherwise it stays hidden.
  useEffect(() => {
    // Reset playback state for the new song.
    if (audioRef.current) audioRef.current.pause();
    setIsVibing(false);
    setPreviewUrl(null);

    if (!songKey || !data) return;
    let active = true;

    (async () => {
      try {
        const res = await fetch(
          `/api/preview?title=${encodeURIComponent(
            data.title ?? "",
          )}&artist=${encodeURIComponent(data.artist ?? "")}`,
        );
        const json = await res.json();
        if (active) setPreviewUrl(json.found ? json.previewUrl : null);
      } catch {
        if (active) setPreviewUrl(null);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songKey]);

  const toggleVibe = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isVibing) {
      audio.pause();
      setIsVibing(false);
    } else {
      audio.currentTime = 0;
      audio.play().catch(() => setIsVibing(false));
      setIsVibing(true);
    }
  };

  // Nothing playing (or backend unavailable) → render nothing.
  if (!data || !data.isPlaying) return null;

  return (
    <div className="flex items-center gap-2 max-w-[300px] rounded-full py-1 pl-1 pr-1.5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
      <a
        href={data.songUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        title={`${data.title} — ${data.artist}`}
        className="flex items-center gap-2 min-w-0 flex-1 pr-1 transition-opacity duration-300 hover:opacity-80"
      >
        {/* Spinning album art (falls back to a placeholder disc if no image) */}
        {data.albumImageUrl ? (
          <img
            src={data.albumImageUrl}
            alt=""
            className="w-7 h-7 shrink-0 rounded-full object-cover animate-spin [animation-duration:6s]"
          />
        ) : (
          <span className="w-7 h-7 shrink-0 rounded-full bg-white/10 animate-spin [animation-duration:6s]" />
        )}

        {/* Equalizer "listening" cue — reuses the music widget's bars */}
        <span className="flex items-end gap-px h-2.5 shrink-0 text-[#1DB954]">
          <span className="w-0.5 h-full bg-current animate-music-bar-1" />
          <span className="w-0.5 h-2/3 bg-current animate-music-bar-2" />
          <span className="w-0.5 h-full bg-current animate-music-bar-3" />
        </span>

        <span className="flex flex-col min-w-0 leading-tight">
          <span className="truncate font-consolas text-[11px] text-white/90">
            {data.title}
          </span>
          <span className="truncate font-consolas text-[9px] uppercase tracking-wider text-white/50">
            {data.artist}
          </span>
        </span>
      </a>

      {/* Vibe with me — only renders when a playable preview was found */}
      {previewUrl && (
        <button
          onClick={toggleVibe}
          title="Vibe with me"
          className="flex items-center gap-1 shrink-0 rounded-full bg-white/10 hover:bg-white/20 pl-2 pr-2.5 py-1.5 transition-colors"
        >
          {isVibing ? (
            <Pause size={11} fill="currentColor" />
          ) : (
            <Play size={11} fill="currentColor" />
          )}
          <span className="font-consolas text-[9px] uppercase tracking-wider whitespace-nowrap">
            {isVibing ? "Vibing" : "Vibe"}
          </span>
        </button>
      )}

      {previewUrl && (
        <audio
          ref={audioRef}
          src={previewUrl}
          onEnded={() => setIsVibing(false)}
        />
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
