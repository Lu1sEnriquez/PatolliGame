"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { socket } from "@/lib/socket";
import { SocketEvents, SocketResponse } from "@/interfaces/socket-response";
import { usePartidaStore } from "@/store/game/store";
import { Partida } from "@/interfaces/Patolli";

interface Props {
  children: React.ReactNode;
}

export const DialogUnirsePartida = ({ children }: Props) => {
  const [codigo, setCodigo] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const { setPartida } = usePartidaStore();

  // Manejar unirse a la partida
  const handleUnirsePartida = () => {
    if (!codigo) return alert("ingresa un código");
    const data = { codigo: codigo, nombre: username };
    // Emitir el evento para unirse a la partida
    socket.emit(
      SocketEvents.UNIRSE_PARTIDA,
      JSON.stringify(data),
      (response: SocketResponse<Partida | null>) => {
        if (response.success) {
          console.log("Unido a la partida:", response.data);
          router.push("/game"); // Redirige a la página del juego
        } else {
          alert(response.message); // Muestra un mensaje de error si falla
        }
      }
    );
  };

  useEffect(() => {
    // Escuchar el evento de jugador unido
    const handleJugadorUnido = (response: SocketResponse<Partida | null>) => {
      if (response.success && response.data) {
        console.log("Jugador unido:", response.data);
        // Aquí puedes manejar la lógica que desees cuando un jugador se une
        setPartida(response.data);
      } else {
        console.log("Error al unir jugador:", response.message);
      }
    };

    socket.on(SocketEvents.JUGADOR_UNIDO, handleJugadorUnido);

    // Limpiar la conexión y desuscribirse cuando el componente se desmonta
    return () => {
      socket.off(SocketEvents.JUGADOR_UNIDO, handleJugadorUnido);
      socket.off("connect"); // Desconectar el socket
    };
  }, [setPartida]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar o Unirse a Partida</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <Label>Username:</Label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Código de Partida"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <div className="flex flex-row w-full gap-2 justify-center">
            <Button
              className="bg-blue-500 text-white w-full"
              onClick={handleUnirsePartida}
            >
              Unirse a Partida
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => console.log("Diálogo cerrado")}>
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
