"use client";
import { cn } from "@/lib/utils";
import { UserDisplay } from "./UserDisplay";
import { Card } from "../ui/card";
import Image from "next/image";
import { TableroDisplay } from "./tablero/TableroDisplay";
import { usePartidaStore } from "@/store/game/store"; // Importa tu store
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { socket } from "@/lib/socket";
import { Jugador, Partida } from "@/interfaces/Patolli";
import React from "react";

export const GameDisplay = () => {
  const { partida, setPartida } = usePartidaStore();

  React.useEffect(() => {
    // Escuchar el evento de jugador unido
    const handleJugadorUnido = (response: SocketResponse<Partida | null>) => {
      if (response.success && response.data) {
        console.log("Jugador unido:", response.data);
        setPartida(response.data); // Actualiza el estado con la nueva partida
      } else {
        console.error("Error al unir jugador:", response.message); // Usa console.error para errores
      }
    };

    // Suscribirse al evento
    socket.on(SocketEvents.JUGADOR_UNIDO, handleJugadorUnido);

    // Limpiar la conexión y desuscribirse cuando el componente se desmonta
    return () => {
      socket.off(SocketEvents.JUGADOR_UNIDO, handleJugadorUnido);
    };
  }, [setPartida]); // Si setPartida no cambia, podrías considerar omitirlo aquí

  if (!partida) {
    return <div>Cargando partida...</div>; // Manejo de estado si no hay partida
  }

  return (
    <div className="flex justify-center pt-10 w-full max-h-screen">
      <Card
        className={cn(
          `scale-50 sm:scale-75 md:scale-75 lg:scale-90`,
          "h-full relative min-w-fit "
        )}
      >
        {/* imagen de fondo */}
        <div className="absolute -z-10 w-full h-full  flex justify-center items-center ">
          <Image
            style={{
              width: "100%",
              height: "auto",
            }}
            src={"/imgs/calendario-1.png"}
            width={1500}
            height={1500}
            className="h-full w-full "
            alt="calendario"
          />
        </div>


            {/* jugadores */}
        <div className="h-full w-full absolute">
          {/* Renderizar los jugadores dinámicamente */}
          {partida.jugadores.map((jugador: Jugador, index: number) => {
            const positionClass =
              index === 0
                ? "absolute bottom-0 left-0 w-[50%] h-[50%] flex items-end p-3"
                : index === 1
                ? "absolute bottom-0 right-0  w-[50%] h-[50%] flex justify-end items-end p-3"
                : index === 2
                ? "absolute top-0 left-0  w-[50%] h-[50%] flex items-start p-3"
                : "absolute top-0 right-0  w-[50%] h-[50%] flex items-start justify-end p-3";

            return (
              <div key={jugador.id} className={positionClass}>
                <UserDisplay
                  fichas={jugador.fichas.length} // Asumiendo que tienes la cantidad de fichas
                  fondo={jugador.fondoApuesta || 0} // Asumiendo que el fondo es opcional
                  username={jugador.nombre}
                  color={partida.colores[index]} // Asegúrate de que UserColor tenga los colores adecuados
                />
              </div>
            );
          })}

          <div className="absolute top-3 left-0 right-0 z-10">
            {/* Aquí puedes agregar componentes adicionales como LanzarDados */}
          </div>
        </div>


        {/* tablero */}
        <div className="p-20 z-20">
          {partida.tablero && (
            <TableroDisplay tableroInicial={partida.tablero} key={2} />
          )}
        </div>
      </Card>
    </div>
  );
};
