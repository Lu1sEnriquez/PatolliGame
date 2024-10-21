"use client";

import { useAudioStore } from "@/store/menu/AudioStore";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export const SoundProvider = ({ children }: Props) => {
  const { isMusicEnabled, musicVolume } = useAudioStore();

  useEffect(() => {
    const audioElement = document.getElementById("music") as HTMLAudioElement | null;

    if (audioElement) {
      // Reproducir o pausar la música según el estado
      if (isMusicEnabled) {
        audioElement.play().catch((error) => {
          console.error("Error al intentar reproducir la música:", error);
        });
      } else {
        audioElement.pause();
      }

      // Ajustar el volumen de la música
      audioElement.volume = musicVolume;
    }
  }, [isMusicEnabled, musicVolume]);

  return <div id="soundProvider">
    
    {children}</div>;
};
