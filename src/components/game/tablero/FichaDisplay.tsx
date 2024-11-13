import { Ficha, Partida } from "@/interfaces/Patolli";
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { socket } from "@/lib/socket";
import { usePartidaStore } from "@/store/game/store";
import { useJugadorStore } from "@/store/jugador/store";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { SiJsonwebtokens } from "react-icons/si";

interface FichaProps {
  ficha: Ficha;
}
export const FichaDisplay = ({ ficha }: FichaProps) => {
  const { pagoApuesta, id, cantidad, setPagoApuesta } = useJugadorStore();
  const { partida, setPartida } = usePartidaStore();

  const [activa, setActiva] = useState(false);

  // Actualiza `activa` cuando cambian las dependencias relevantes
  useEffect(() => {
    const jugador = partida?.jugadores.find((jugador) => jugador.id === id);
    const nuevaActiva =
      pagoApuesta &&
      partida?.turnoActual === id &&
      !ficha.eliminada &&
      ficha.color === jugador?.color &&
      (ficha.casillasAvanzadas > 0 || cantidad === 1);

    setActiva(nuevaActiva);
  }, [pagoApuesta, partida, ficha, id, cantidad]);

  // Función para manejar la selección de una ficha
  const handleSelectFicha = () => {
    if (activa) {
      socket.emit(
        SocketEvents.MOVER_FICHA_PAGANDO,
        JSON.stringify({
          codigo: partida?.codigo,
          idJugador: id,
          cantidad: cantidad,
          idFicha: ficha.id,
        }),
        (response: SocketResponse<Partida | null>) => {
          if (response.data) {
            setPartida(response.data);
            setPagoApuesta(false);
          }
        }
      );
    }
  };

  return (
    <div
      className={`z-10 relative col-span-1 row-span-1 flex items-center justify-center ${
        activa ? "cursor-pointer" : ""
      }`}
      onClick={handleSelectFicha}
    >
      <p className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold">
        {ficha.id}
      </p>

      {ficha.eliminada && (
        <IoCloseSharp className="absolute text-red-600 z-10" size={50} />
      )}
      <SiJsonwebtokens
        size={30}
        className={`shadow-xl rounded-full ${
          activa ? "bg-black animate-pulse" : "bg-black"
        }`}
        color={ficha.color}
      />
    </div>
  );
};
