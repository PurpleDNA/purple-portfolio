import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { cn } from "../lib/utils";

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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
    <div
      className={cn(
        "fixed bottom-8 left-8 z-50 flex items-center gap-3 p-2 rounded-full transition-all duration-500",
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
  );
};

export default BackgroundMusic;
