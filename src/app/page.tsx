"use client"
import { useEffect, useRef } from "react";
import { ToggleTheme } from "@/components/theme/ToggleTheme";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSound from "@/hooks/useSound";
import SoundSettings from "@/components/gameMenu/SoundSettings";
import { useAudioStore } from "@/store/menu/AudioStore";
import { DialogPartida } from "@/components/gameMenu/DialogPartida";

export default function Home() {
  const { playSound } = useSound();
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const { isMusicEnabled, musicVolume } = useAudioStore();

  // Función para reproducir el sonido de hover
  const handleHover = () => {
    playSound("/sounds/hover.mp3");
  };

  // Función para reproducir el sonido de click
  const handleClick = () => {
    playSound("/sounds/click.mp3");
  };

  useEffect(() => {
    // Inicializar la música de fondo si aún no se ha hecho
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio("/sounds/music-background.mp3");
      backgroundMusicRef.current.loop = true;
    }

    // Configurar el volumen
    backgroundMusicRef.current.volume = musicVolume;

    // Reproducir la música si está habilitada
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch((error) => {
        alert(error)
        console.error("Error al intentar reproducir la música:", error);
      });
    } else {
      backgroundMusicRef.current.pause();
    }

    // Limpiar el efecto al desmontar
    return () => {
      backgroundMusicRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    // Reproducir o pausar la música según el estado
    if (isMusicEnabled) {
      backgroundMusicRef.current?.play().catch((error) => {
        console.error("Error al intentar reproducir la música:", error);
      });
    } else {
      backgroundMusicRef.current?.pause();
    }
  }, [isMusicEnabled, musicVolume]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 bg-[url('/imgs/patolli.jpg')] bg-auto bg-center">
      {/* Cabecera del juego */}
      <Card className="p-6 mb-8 w-full max-w-md flex justify-between items-center shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Juego de Patolli
        </h1>
        <ToggleTheme />
      </Card>

      {/* Contenido principal */}
      <Card className="p-8 w-full max-w-md shadow-lg bg-white dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ¡Bienvenido al Patolli!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Elige una opción para comenzar:
          </p>

          <div className="space-y-4">
            <DialogPartida>
              <Button
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                onMouseEnter={handleHover}
                onClick={() => {
                  handleClick();
                  // Aquí puedes agregar la lógica para iniciar el juego
                }}
              >
                Iniciar Juego
              </Button>
            </DialogPartida>
            <Button
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
              onMouseEnter={handleHover}
              onClick={() => {
                handleClick();
                // Aquí puedes agregar la lógica para mostrar las reglas del juego
              }}
            >
              Reglas del Juego
            </Button>
            <SoundSettings />
          </div>
        </div>
      </Card>
    </div>
  );
}
