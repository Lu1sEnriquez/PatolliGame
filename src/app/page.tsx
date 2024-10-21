"use client";
import { ToggleTheme } from "@/components/theme/ToggleTheme";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSound from "@/hooks/useSound";

import { DialogUnirsePartida } from "@/components/gameMenu/DialogUnirsePartida";
import { DialogSettings } from "@/components/gameMenu/DialogSettings";
import { IoSettingsSharp } from "react-icons/io5";
import { Sounds } from "@/constants/sound";
import { DialogConfigPartida } from "@/components/gameMenu/DialogConfigPartida";

export default function Home() {
  const { playSound } = useSound();

  // Función para reproducir el sonido de hover
  const handleHover = () => {
    playSound(Sounds.HOVER);
  };

  // Función para reproducir el sonido de click
  const handleClick = () => {
    playSound(Sounds.CLICK);
  };

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
            <DialogConfigPartida>
              <Button
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                onMouseEnter={handleHover}
                onClick={() => {
                  handleClick();
                  // Aquí puedes agregar la lógica para iniciar el juego
                }}
              >
                Crear Partida
              </Button>
            </DialogConfigPartida>
            <DialogUnirsePartida>
              <Button
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                onMouseEnter={handleHover}
                onClick={() => {
                  handleClick();
                  // Aquí puedes agregar la lógica para iniciar el juego
                }}
              >
                Unirse 
              </Button>
            </DialogUnirsePartida>
            <Button
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
              onMouseEnter={handleHover}
              onClick={() => {
                handleClick();
                // Aquí puedes agregar la lógica para mostrar las reglas del juego
              }}
            >
              Reglas del Juego
            </Button>
            <DialogSettings>
              <Button className="flex flex-row w-full gap-2 bg-slate-600 hover:bg-slate-700 text-white">
                Configuracion
                <IoSettingsSharp />
              </Button>
            </DialogSettings>
          </div>
        </div>
      </Card>
    </div>
  );
}
