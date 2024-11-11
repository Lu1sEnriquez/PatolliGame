import { Ficha, Partida } from "@/interfaces/Patolli";
import { SiJsonwebtokens } from "react-icons/si";
import { useJugadorStore } from "@/store/jugador/store";
import { socket } from "@/lib/socket";
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { usePartidaStore } from "@/store/game/store";
import { IoCloseSharp } from "react-icons/io5";

interface FichaProps {
  ficha: Ficha;
}

export const FichaDisplay = ({ ficha }: FichaProps) => {
  const { pagoApuesta, id, cantidad, setPagoApuesta } = useJugadorStore();
  const { partida, setPartida } = usePartidaStore();

  // Función para manejar la selección de una ficha
  const handleSelectFicha = () => {
    // alert(`${pagoApuesta} ${partida?.turnoActual}  ${id}`);
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
            // setDisable(false);
          }
        }
      );
    }
  };
  const jugador = partida?.jugadores.find((jugador) => jugador.id == id);
  const activa =
    pagoApuesta &&
    partida?.turnoActual == id &&
    !ficha.eliminada &&
    ficha.color == jugador?.color 
    &&(ficha.casillasAvanzadas > 0 ); // si la cantidad es ==1 puede sacar fichas faltantes si no no se activa
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
