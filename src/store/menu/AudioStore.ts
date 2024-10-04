// useSoundStore.ts
import { create } from 'zustand';

interface SoundStore {
  isMusicEnabled: boolean;
  setIsMusicEnabled: (enabled: boolean) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (enabled: boolean) => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  soundVolume: number;
  setSoundVolume: (volume: number) => void;
}

// Estado inicial separado
const initialState: SoundStore = {
  isMusicEnabled: true,
  isSoundEnabled: true,
  musicVolume: 0.5,
  soundVolume: 0.5,
  setIsMusicEnabled: () => {},
  setIsSoundEnabled: () => {},
  setMusicVolume: () => {},
  setSoundVolume: () => {},
};

export const useAudioStore = create<SoundStore>((set) => ({
  ...initialState,
  setIsMusicEnabled: (enabled) => set({ isMusicEnabled: enabled }),
  setIsSoundEnabled: (enabled) => set({ isSoundEnabled: enabled }),
  setMusicVolume: (volume) => set({ musicVolume: volume }),
  setSoundVolume: (volume) => set({ soundVolume: volume }),
}));
