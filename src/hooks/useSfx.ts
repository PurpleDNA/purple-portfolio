import { useSyncExternalStore } from "react";

// Global on/off switch for UI sound effects (the click sounds played via
// useSound). Lives outside React so useSound can read it at play-time and the
// toggle in BackgroundMusic can flip it for the whole app. Persisted, default on.
const STORAGE_KEY = "sfxEnabled";

let enabled = ((): boolean => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === "true";
})();

const listeners = new Set<() => void>();

export const sfxStore = {
  get: () => enabled,
  set: (value: boolean) => {
    enabled = value;
    localStorage.setItem(STORAGE_KEY, String(value));
    listeners.forEach((listener) => listener());
  },
  toggle: () => sfxStore.set(!enabled),
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// React binding for components that need to reflect the current state.
export const useSfxEnabled = () =>
  useSyncExternalStore(sfxStore.subscribe, sfxStore.get);
