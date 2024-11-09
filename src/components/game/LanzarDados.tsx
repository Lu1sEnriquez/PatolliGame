import { Sounds } from "@/constants/sound";
import useSound from "@/hooks/useSound";
import { Partida } from "@/interfaces/Patolli";
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { socket } from "@/lib/socket";
import { usePartidaStore } from "@/store/game/store";
import { useJugadorStore } from "@/store/jugador/store";
import React, { useState } from "react";

export const LanzarDados = () => {
  const [canas, setCanas] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [animando, setAnimando] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const { partida, setPartida } = usePartidaStore();
  const { id } = useJugadorStore();
  const [resultado, setResultado] = useState<number | null>(null);
  const { playSound } = useSound();

  const handleLazarDados = (cantidad: number) => {
    socket.emit(
      SocketEvents.MOVER_FICHA_AUTOMATICO,
      JSON.stringify({
        codigo: partida?.codigo,
        idJugador: id,
        cantidad: 1,
      }),
      (response: SocketResponse<Partida | null>) => {
        if (response.data) {
          setPartida(response.data);
          setDisable(false);
        }
      }
    );
  };

  const calcularCasillas = (estadoFinalCañas: boolean[]) => {
    const puntos = estadoFinalCañas.filter((cana) => cana).length;
    switch (puntos) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 10;
      default:
        return 0;
    }
  };

  const lanzarCanas = () => {
    setDisable(true);
    playSound("/sounds/dados.mp3");
    setResultado(null);
    setAnimando(true);

    let estadoFinalCañas: boolean[] = [];
    const interval = setInterval(() => {
      estadoFinalCañas = Array.from({ length: 5 }, () => Math.random() > 0.5);
      setCanas(estadoFinalCañas); // Actualizamos el estado para mostrar la animación
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setAnimando(false);
      const valorCasillas = calcularCasillas(estadoFinalCañas);
      setResultado(valorCasillas);

      if (valorCasillas === 0) {
        playSound(Sounds.PERDER);
      } else {
        playSound(Sounds.GANAR);
      }

      handleLazarDados(valorCasillas);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        disabled={disable}
        onClick={lanzarCanas}
        className={`px-4 py-2 bg-blue-500 text-white rounded mb-4 ${
          disable ? "opacity-50" : ""
        }`}
      >
        Lanzar cañas
      </button>

      <div className="flex space-x-4 mb-4">
        {canas.map((cana, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded border-2 ${
              animando
                ? cana
                  ? "bg-yellow-500"
                  : "bg-yellow-300"
                : cana
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            {cana ? "•" : ""}
          </div>
        ))}
      </div>

      {resultado !== null && (
        <p className="text-lg font-semibold">
          Avanza {resultado} casilla{resultado === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
};
