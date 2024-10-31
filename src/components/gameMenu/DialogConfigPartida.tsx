import React, { useState } from "react";
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
import { estadoEnum, Partida } from "@/interfaces/Patolli";
import { UserColor } from "../game/UserDisplay";
import { useJugadorStore } from "@/store/jugador/store";

interface Props {
  children: React.ReactNode;
}

export const DialogConfigPartida = ({ children }: Props) => {
  const [codigo, setCodigo] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fondoApuestaFijo, setFondoApuestaFijo] = useState<number>(100.0);
  const [montoApuesta, setMontoApuesta] = useState<number>(50.0);
  const [coloresSeleccionado, setColoresSeleccionado] = useState<string[]>([
    UserColor.PRIMERO,
    UserColor.SEGUNDO,
    UserColor.TERCERO,
    UserColor.CUARTO,
  ]);
  const [tableroSize, setTableroSize] = useState<number>(12);
  const [fichasTotales, setFichasTotales] = useState<number>(3);
  const router = useRouter();
  const { setPartida } = usePartidaStore();
  const { setJugador } = useJugadorStore();
  // Función para actualizar un color
  const handleColorChange = (index: number, color: string) => {
    const newColores = [...coloresSeleccionado];
    newColores[index] = color;
    setColoresSeleccionado(newColores);
  };

  // Manejar la creación de la partida
  const handleCrearPartida = () => {
    if (!username) return alert("Ingresa tu nombre");
    if (!codigo) return alert("Ingresa un código de partida");

    const data: Partial<Partida> = {
      codigo: codigo,
      creadorNombre: username,
      fondoApuestaFijo: fondoApuestaFijo,
      montoApuesta: montoApuesta,
      fichasTotales: fichasTotales,
      colores: coloresSeleccionado, // Asumiendo que solo se selecciona un color por partida
      tableroSize: tableroSize,
      estado: estadoEnum.EN_ESPERA,
    };

    // Emitir el evento para crear la partida
    socket.emit(
      SocketEvents.CREAR_PARTIDA,
      JSON.stringify(data),
      (response: SocketResponse<Partida | null>) => {
        if (response.success && response.data) {
          console.log("Partida creada:", response.data);
          setPartida(response.data);
          setPartida(response.data);
          const jugador = response.data.jugadores.find(
            (jugador) => jugador.nombre == username
          );
          if (!jugador)
            return alert("Error al unir jugador:" + response.message);
          setJugador(jugador?.id, jugador?.nombre);
          // Redirigir a la página del juego
          router.push("/game");
        } else {
          alert(response.message); // Muestra un mensaje de error si falla
        }
      }
    );
  };

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
            placeholder="Ingrese su nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label>Código de Partida:</Label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Código de Partida"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <div className="flex flex-row w-full">
            <div>
              <Label>Fondo Apuesta Fijo:</Label>
              <input
                type="number"
                className="border p-2 rounded"
                value={fondoApuestaFijo}
                onChange={(e) => setFondoApuestaFijo(Number(e.target.value))}
              ></input>
            </div>
            <div>
              <Label>Monto Apuesta:</Label>
              <input
                type="number"
                className="border p-2 rounded"
                value={montoApuesta}
                onChange={(e) => setMontoApuesta(Number(e.target.value))}
              />
            </div>
          </div>

          <Label>Seleccionar Color:</Label>
          <div className="flex flex-row justify-between">
            {coloresSeleccionado.map((color, index) => (
              <div key={index} className="flex flex-col items-center ">
                <Label>{`Jugador ${index + 1}`}</Label>
                <input
                  value={color}
                  className="h-12 w-12 rounded-full border-hidden "
                  type="color"
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-row w-full">
            <div>
              <Label>Tamaño del Tablero:</Label>
              <input
                type="number"
                className="border p-2 rounded"
                value={tableroSize}
                onChange={(e) => setTableroSize(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Fichas Por Jugador:</Label>
              <input
                type="number"
                className="border p-2 rounded"
                value={fichasTotales}
                onChange={(e) => setFichasTotales(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-2 justify-center">
            <Button
              className="bg-green-500 text-white w-full"
              onClick={handleCrearPartida}
            >
              Crear Partida
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
