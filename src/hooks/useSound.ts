import { useCallback, useEffect, useRef } from "react";

export const useSound = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio element
    audioRef.current = new Audio(url);

    // Optional: Preload the audio
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  const play = useCallback(() => {
    if (audioRef.current) {
      // Reset to beginning if already playing
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch((err) => {
        console.error("Error playing sound:", err);
      });
    }
  }, []);

  return { play };
};
