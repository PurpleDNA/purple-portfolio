import { useSyncExternalStore } from "react";

// Tiny coordinator so only one audio source plays at a time. The header's "Vibe
// with me" preview flips `vibing` on/off; the bottom-left background music
// listens and ducks out while a vibe is playing, then resumes.
let vibing = false;
const listeners = new Set<() => void>();

export const audioBus = {
  get: () => vibing,
  setVibing: (value: boolean) => {
    if (vibing === value) return;
    vibing = value;
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export const useVibing = () =>
  useSyncExternalStore(audioBus.subscribe, audioBus.get);
