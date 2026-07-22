import { useEffect, useState } from "react";

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

  // Nothing playing (or backend unavailable) → render nothing.
  if (!data || !data.isPlaying) return null;

  return (
    <a
      href={data.songUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      title={`${data.title} — ${data.artist}`}
      className="flex items-center gap-2 max-w-[230px] rounded-full py-1 pl-1 pr-3.5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-colors duration-300 hover:bg-white/10"
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
  );
};

export default SpotifyNowPlaying;
