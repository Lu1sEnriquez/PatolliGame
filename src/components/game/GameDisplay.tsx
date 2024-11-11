"use client";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";
import { UserDisplay } from "./UserDisplay";
import { Card } from "../ui/card";
import Image from "next/image";
import { TableroDisplay } from "./tablero/TableroDisplay";
import { usePartidaStore } from "@/store/game/store"; // Importa tu store
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { socket } from "@/lib/socket";
import { estadoEnum, Jugador, Partida } from "@/interfaces/Patolli";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { useJugadorStore } from "@/store/jugador/store";
import { LanzarDadosDisplay } from "./LanzarDadosDisplay";
import confetti from "canvas-confetti";
import useSound from "@/hooks/useSound";
import { useRouter } from "next/navigation";

export const GameDisplay = () => {
  const { partida, setPartida, resetPartida } = usePartidaStore();
  const { name, id } = useJugadorStore();
  const { playSound } = useSound();
  // Importa la biblioteca de confeti que estés utilizando (ej: confetti.js)
  const router = useRouter();

  // Usa una bandera para verificar si el estado persistente se ha cargado
  const partidaStoreCargada = usePartidaStore.persist?.hasHydrated();
  const jugadorStoreCargado = useJugadorStore.persist?.hasHydrated();

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (partidaStoreCargada && jugadorStoreCargado) {
      setIsLoaded(true); // Marcar como cargado cuando ambos stores estén listos
    }
  }, [partidaStoreCargada, jugadorStoreCargado]);

  React.useEffect(() => {
    if (isLoaded && !partida) {
      router.push("/");
    }
  }, [isLoaded, partida, router]);

  // Función para lanzar el confetti con muchos efectos
  const lanzarConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }, // Posición inicial
      zIndex: 2000, // Para asegurar que esté encima del modal
    });

    // Lanzar más confetti repetidamente para un efecto "celebración"
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.4 },
        zIndex: 2000,
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        zIndex: 2000,
      });
    }, 600);
  };

  const limpiarPartida = useCallback(() => {
    console.log("terminar partida");
    resetPartida();
    router.push("/");
    Swal.fire({
      icon:"error",
      title:"partida Terminada"
    })
  }, [resetPartida, router]);

  const handleTerminarPartida = useCallback(() => {
    socket.emit(
      SocketEvents.TERMINAR_PARTIDA,
      JSON.stringify({ codigo: partida?.codigo }),
      (response: SocketResponse<Partida | null>) => {
        if (response.success && response.data) {
          limpiarPartida();
        }
      }
    );
  }, [limpiarPartida, partida?.codigo]);

  const handleHayGanador = useCallback(
    (response: SocketResponse<Jugador | null>) => {
      const jugador = response.data;

      if (jugador && jugador?.id == id) {
        // Mostrar confetti

        playSound("/sounds/win.mp3");
        // Mostrar el modal de SweetAlert
        lanzarConfetti();
        Swal.fire({
          title: `¡Felicidades, ${jugador.nombre}!`,
          text: "¡Eres el ganador!",
          icon: "success",
          confirmButtonText: "Aceptar",
          backdrop: true,
          willClose: () => {
            // Puedes añadir más lógica aquí si es necesario
            handleTerminarPartida();
          },
        });
      } else if (jugador && jugador.id != id) {
        playSound("/sounds/perder.mp3");
        Swal.fire({
          title: `Lo siento, ${name}`,
          text: "¡Has perdido, mejor suerte la próxima vez!",
          icon: "error",
          confirmButtonText: "Aceptar",
          backdrop: true,
          willClose: () => {
            // Puedes añadir más lógica aquí si es necesario
            handleTerminarPartida();
          },
        });
      }
    },
    [handleTerminarPartida, id, name, playSound]
  );

  const handleIniciarPartida = () => {
    socket.emit(
      SocketEvents.INICIAR_PARTIDA,
      JSON.stringify({ codigo: partida?.codigo }),
      (response: SocketResponse<Partida | null>) => {
        if (response.success && response.data) {
          console.log("Partida Iniciada:", response.data);
          setPartida(response.data);
        }
      }
    );
  };

  React.useEffect(() => {
    // Escuchar el evento de jugador unido
    const handleUpdatePartida = (response: SocketResponse<Partida | null>) => {
      if (response.data && response.success) {
        setPartida(response.data); // Actualiza el estado con la nueva partida
        // Muestra una alerta de error en la esquina derecha
        Swal.fire({
          title: response.message,
          icon: "success",
          position: "top-end", // Posición de la alerta
          showConfirmButton: false, // Oculta el botón de confirmación
          timer: 3000, // Duración de la alerta antes de que se cierre automáticamente (en milisegundos)
          toast: true, // Hace que la alerta se muestre como un toast
        });
      } else if (response.data) {
        setPartida(response.data); // Actualiza el estado con la nueva partida
        // Muestra una alerta de error en la esquina derecha
        Swal.fire({
          title: response.message,
          icon: "error",
          position: "top-end", // Posición de la alerta
          showConfirmButton: false, // Oculta el botón de confirmación
          timer: 3000, // Duración de la alerta antes de que se cierre automáticamente (en milisegundos)
          toast: true, // Hace que la alerta se muestre como un toast
        });
      } else {
        Swal.fire({
          title: response.message,
          icon: "error",
          position: "top-end", // Posición de la alerta
          showConfirmButton: false, // Oculta el botón de confirmación
          timer: 3000, // Duración de la alerta antes de que se cierre automáticamente (en milisegundos)
          toast: true, // Hace que la alerta se muestre como un toast
        });
      }
    };

    // Suscribirse al evento
    socket.on(SocketEvents.JUGADOR_UNIDO, handleUpdatePartida);
    socket.on(SocketEvents.MOVER_FICHA_PAGANDO, handleUpdatePartida);
    socket.on(SocketEvents.MOVER_FICHA_AUTOMATICO, handleUpdatePartida);
    socket.on(SocketEvents.MOVER_FICHA_PAGANDO, handleUpdatePartida);
    socket.on(SocketEvents.INICIAR_PARTIDA, handleUpdatePartida);
    socket.on(SocketEvents.GANADOR, handleHayGanador);
    socket.on(SocketEvents.JUGADOR_DESCONECTADO, handleUpdatePartida);
    socket.on(SocketEvents.TERMINAR_PARTIDA, limpiarPartida);
    // Limpiar la conexión y desuscribirse cuando el componente se desmonta
    return () => {
      socket.off(SocketEvents.JUGADOR_UNIDO, handleUpdatePartida);
      socket.off(SocketEvents.MOVER_FICHA_AUTOMATICO, handleUpdatePartida);
      socket.off(SocketEvents.MOVER_FICHA_PAGANDO, handleUpdatePartida);
      socket.off(SocketEvents.INICIAR_PARTIDA, handleUpdatePartida);
      socket.off(SocketEvents.GANADOR, handleHayGanador);
      socket.off(SocketEvents.JUGADOR_DESCONECTADO, handleUpdatePartida);
      socket.off(SocketEvents.TERMINAR_PARTIDA, limpiarPartida);
    };
  }, [handleHayGanador, setPartida, limpiarPartida]); // Si setPartida no cambia, podrías considerar omitirlo aquí

  if (!partida) {
    return <div>Cargando partida...</div>; // Manejo de estado si no hay partida
  }

  return (
    <div className="relative flex  justify-center md:pt-10  w-full max-h-screen">
      <div className="absolute  mt-10 left-10  z-20">
        <h1 className="flex flex-row">
          codigo de partida: <p>{partida.codigo}</p>
        </h1>
        <h1 className="flex flex-row">
          costo de Apuesta: <p>{partida.montoApuesta}</p>
        </h1>
      </div>
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
                ? "absolute top-0 right-0  w-[50%] h-[50%] flex items-start justify-end p-3"
                : "absolute top-0 left-0  w-[50%] h-[50%] flex items-start p-3";

            return (
              <div key={jugador.id} className={positionClass}>
                <UserDisplay jugador={jugador} />
              </div>
            );
          })}

          <div className="absolute top-3 left-0 right-0 z-10">
            {/* Aquí puedes agregar componentes adicionales como LanzarDados */}
          </div>
        </div>

        {/* tablero */}
        <div className="p-20 z-20">
          {partida.tablero && <TableroDisplay key={2} />}
        </div>
      </Card>

      <div className="absolute bottom-0 ">
        {/* se muestra el boton de iniciar partida */}
        {partida.creadorNombre == name &&
          partida.estado == estadoEnum.EN_ESPERA && (
            <div className="flex flex-row gap-2">
              <Button variant={"destructive"} onClick={handleTerminarPartida}>
                Cancelar
              </Button>
              <Button variant={"default"} onClick={handleIniciarPartida}>
                Empezar{" "}
              </Button>
            </div>
          )}
        {/* se muestra el componente lanzar dados */}
        {partida.estado == estadoEnum.EN_CURSO &&
          partida.turnoActual === id && <LanzarDadosDisplay />}
      </div>
    </div>
  );
};
