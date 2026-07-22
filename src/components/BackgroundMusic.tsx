import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, X } from "lucide-react";
import { cn } from "../lib/utils";

// Chamfered speech-bubble with a downward tail on the left (above the play
// button). Kept as a single clip-path so the glass bg + blur stay continuous
// through the tail. Coordinates leave 10px at the bottom for the tail.
const BUBBLE_CLIP =
  "polygon(10px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 10px) calc(100% - 10px), 30px calc(100% - 10px), 22px 100%, 14px calc(100% - 10px), 0 calc(100% - 10px), 0 10px)";

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(
    () => localStorage.getItem("soundHintDismissed") !== "true",
  );

  const dismissSoundHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem("soundHintDismissed", "true");
    setShowSoundHint(false);
  };

  // Fade-in effect
  useEffect(() => {
    if (audioRef.current && isPlaying && !hasInteracted) {
      const targetVolume = volume;
      audioRef.current.volume = 0;
      let currentVolume = 0;
      const fadeInInterval = setInterval(() => {
        if (currentVolume < targetVolume) {
          currentVolume = Math.min(currentVolume + 0.05, targetVolume);
          if (audioRef.current) audioRef.current.volume = currentVolume;
        } else {
          clearInterval(fadeInInterval);
          setHasInteracted(true);
        }
      }, 100);

      return () => clearInterval(fadeInInterval);
    }
  }, [isPlaying, volume, hasInteracted]);

  // Handle Autoplay and State Sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.loop = true;

    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay blocked. Waiting for user interaction.", err);
        setIsPlaying(false);
      }
    };

    playAudio();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Sound hint bubble — nudges toward the play button, dismissible */}
      {showSoundHint && !isPlaying && (
        <div className="absolute bottom-full left-0 mb-3 animate-sound-hint-in">
          <div className="animate-sound-hint-bob">
            {/* border layer — same construction as the Navbar: a chamfer layer
                that peeks out by 1px as the frame around a solid inner fill */}
            <div className="bg-white/60" style={{ clipPath: BUBBLE_CLIP }}>
              {/* solid black inner — the 1px inset reveals the border */}
              <div
                className="relative bg-black"
                style={{
                  clipPath: BUBBLE_CLIP,
                  margin: "1px",
                  padding: "16px 34px 26px 18px",
                }}
              >
                <p className="whitespace-nowrap font-consolas text-[10px] uppercase leading-none tracking-wider text-white/85">
                  Sounds better with the volume up
                </p>
                <button
                  onClick={dismissSoundHint}
                  aria-label="Dismiss sound hint"
                  className="absolute right-2 top-1.5 text-white/40 transition-colors hover:text-white"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-3 p-2 rounded-full transition-all duration-500",
          "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden",
          isExpanded ? "w-48" : "w-12",
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <audio ref={audioRef} src="/audio/bg-music-short.mp3" />

        {/* Icon/Button */}
        <button
          onClick={togglePlay}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full transition-all shrink-0",
            isPlaying
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20",
          )}
        >
          {isPlaying ? (
            <div className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-full bg-current animate-music-bar-1" />
              <span className="w-0.5 h-2/3 bg-current animate-music-bar-2" />
              <span className="w-0.5 h-full bg-current animate-music-bar-3" />
            </div>
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </button>

        {/* Expanded Controls */}
        <div
          className={cn(
            "flex items-center gap-3 transition-opacity duration-300 w-full",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Floating Label (optional) */}
        {!isExpanded && isPlaying && (
          <div className="absolute -top-10 left-0 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/80 animate-bounce">
            Music On
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusic;
