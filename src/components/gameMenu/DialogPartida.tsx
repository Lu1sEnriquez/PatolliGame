import { useState } from "react";
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

interface Props {
  children: React.ReactNode;
}

export const DialogPartida = ({ children }: Props) => {
  const [codigo, setCodigo] = useState<string>("");
    const router= useRouter()
  
    
  const handleCrearPartida = () => {
    router.push('/game')
        
    // Aquí va la lógica para crear la partida
    console.log("Crear partida");
  };

  const handleUnirsePartida = () => {
    if (codigo) {
      // Aquí va la lógica para unirse a la partida
      console.log(`Unirse a partida con código: ${codigo}`);
    } else {
      alert("Por favor, introduce un código válido");
    }
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
          <Button
            className="bg-green-500 text-white"
            onClick={handleCrearPartida}
          >
            Crear Partida
          </Button>

          <div className="flex flex-col space-y-2">
            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Código de Partida"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <Button
              className="bg-blue-500 text-white"
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
