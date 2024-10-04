// useSound.ts

import { useAudioStore } from "@/store/menu/AudioStore";

const useSound = () => {
  const { isSoundEnabled, soundVolume } = useAudioStore();
  
  const playSound = async (url: string) => {
    if (isSoundEnabled) {
      const audio = new Audio(url);
      audio.volume = soundVolume;

      try {
        await audio.play();
      } catch (error) {
        console.error("Error al intentar reproducir el sonido:", error);
      }
    }
  };

  return { playSound };
};

export default useSound;