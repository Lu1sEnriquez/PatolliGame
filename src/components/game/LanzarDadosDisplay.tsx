import { Sounds } from "@/constants/sound";
import useSound from "@/hooks/useSound";
import { Partida } from "@/interfaces/Patolli";
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { socket } from "@/lib/socket";
import { usePartidaStore } from "@/store/game/store";
import { useJugadorStore } from "@/store/jugador/store";
import React, { useState, useEffect } from "react";

export const LanzarDadosDisplay = () => {
  const [canas, setCanas] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [animando, setAnimando] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [mostrarPago, setMostrarPago] = useState<boolean>(false);
  const [tiempoRestante, setTiempoRestante] = useState<number>(5);
  const { partida, setPartida } = usePartidaStore();
  const { id, setPagoApuesta, setCantidad } = useJugadorStore();
  const [resultado, setResultado] = useState<number | null>(null);
  const { playSound } = useSound();

  const handleLanzarDadosAutomatico = (cantidad: number) => {
    socket.emit(
      SocketEvents.MOVER_FICHA_AUTOMATICO,
      JSON.stringify({
        codigo: partida?.codigo,
        idJugador: id,
        cantidad: cantidad,
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
    return puntos === 5 ? 10 : puntos;
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
        setDisable(false);
      } else {
        playSound(Sounds.GANAR);
        
        // Solo mostramos el botón de "Pagar Apuesta" si alguna ficha ha avanzado
        const algunaFichaAvanzada = partida?.jugadores
          .find((jugador) => jugador.id === id)
          ?.fichas.some((ficha) => ficha.casillasAvanzadas > 0);
  
        if (algunaFichaAvanzada) {
          setMostrarPago(true);
          setTiempoRestante(5); // Reinicia el temporizador a 5 segundos
        } else {
          setMostrarPago(false);
          handleLanzarDadosAutomatico(valorCasillas); // Lanzamos automáticamente si ninguna ficha ha avanzado
        }
      }
    }, 3000);
  };
  
  // Controla el temporizador para "Pagar Apuesta"
  useEffect(() => {
    if (mostrarPago && tiempoRestante > 0) {
      const timer = setTimeout(
        () => setTiempoRestante(tiempoRestante - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (mostrarPago && tiempoRestante === 0) {
      setPagoApuesta(false);
      setMostrarPago(false);
      handleLanzarDadosAutomatico(resultado!);
    }
  }, [mostrarPago, tiempoRestante, resultado, setPagoApuesta]);

  const handlePagoApuesta = () => {
    setPagoApuesta(true);
    setCantidad(resultado!);
    setMostrarPago(false);
  };

  return (
    <div className="flex flex-col items-center">
      {!mostrarPago ? (
        <button
          disabled={disable}
          onClick={lanzarCanas}
          className={`px-4 py-2 bg-blue-500 text-white rounded mb-4 ${
            disable ? "opacity-50" : ""
          }`}
        >
          Lanzar cañas
        </button>
      ) : (
        <button
          onClick={handlePagoApuesta}
          className="px-4 py-2 bg-red-500 text-white rounded mb-4"
        >
          Pagar Apuesta ({tiempoRestante}s)
        </button>
      )}

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
