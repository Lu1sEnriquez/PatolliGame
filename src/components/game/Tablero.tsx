"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CasillaType =
  | "Centro"
  | "Final"
  | "Inicio"
  | "Normal"
  | "Salida"
  | "Triangulo";

type Orientacion =
  | "IzquierdaArriba"
  | "IzquierdaAbajo"
  | "ArribaIzquierda"
  | "ArribaDerecha"
  | "DerechaArriba"
  | "DerechaAbajo"
  | "AbajoIzquierda"
  | "AbajoDerecha";

interface CasillaProps {
  tipo: CasillaType;
  posicion: [number, number];
  tamanioTablero: number;
  orientacion: Orientacion;
}

const Casilla: React.FC<CasillaProps> = ({
  tipo,
  posicion,
  tamanioTablero,
  orientacion,
}) => {
  const getBackgroundColor = () => {
    switch (tipo) {
      case "Centro":
        return "bg-green-500";
      case "Final":
        return "bg-red-500";
      case "Inicio":
        return "bg-blue-500";
      case "Normal":
        return "bg-amber-200";
      case "Salida":
        return "bg-cyan-500";
      case "Triangulo":
        return "bg-amber-200";
      default:
        return "bg-amber-200";
    }
  };

  const getText = () => {
    switch (tipo) {
      case "Centro":
        return "Centro";
      case "Final":
        return "Final";
      case "Inicio":
        return "Inicio";
      case "Salida":
        return "Salida";
      default:
        return "";
    }
  };

  const getBorderRadius = () => {
    if (tipo === "Inicio" || tipo === "Final") {
      switch (orientacion) {
        case "IzquierdaArriba":
          return "rounded-tl-full"; // Borde superior derecho
        case "IzquierdaAbajo":
          return "rounded-bl-full"; // Borde inferior derecho

        case "DerechaArriba":
          return "rounded-tr-full"; // Borde superior izquierdo
        case "DerechaAbajo":
          return "rounded-br-full"; // Borde inferior izquierdo

        case "ArribaIzquierda":
          return "rounded-tl-full"; // Borde inferior izquierdo
        case "ArribaDerecha":
          return "rounded-tr-full"; // Borde inferior derecho

        case "AbajoIzquierda":
          return "rounded-bl-full"; // Borde superior izquierdo
        case "AbajoDerecha":
          return "rounded-br-full"; // Borde superior derecho

        default:
          return "";
      }
    }
    return "";
  };

  const getTriangleRotation = () => {
    switch (orientacion) {
      case "ArribaDerecha":
        return "-rotate-90";
      case "ArribaIzquierda":
        return "rotate-90";
      case "AbajoDerecha":
        return "-rotate-90";
      case "AbajoIzquierda":
        return "rotate-90";
      case "DerechaArriba":
        return "rotate-180";
      case "DerechaAbajo":
        return "rotate-360";
      case "IzquierdaArriba":
        return "rotate-180";
      case "IzquierdaAbajo":
        return "rotate-360";
    }
  };

  return (
    <div
      className={`w-full min-h-[3rem] min-w-[3rem] h-full border border-amber-700 flex items-center justify-center ${getBackgroundColor()} ${getBorderRadius()}  `}
    >
      {tipo === "Triangulo" ? (
        <div
          className={`w-0 h-0 border-l-[1.25rem] border-l-transparent borderra border-r-[1.25rem] border-r-transparent border-b-[2.25rem] border-b-red-600 ${getTriangleRotation()}`}
        />
      ) : (
        <div className="text-xs text-slate-100">{getText()}</div>
      )}
    </div>
  );
};

export const Tablero = () => {
  const [tamanio, setTamanio] = useState(14);
  const [showConfig, setShowConfig] = useState(true);

  const esCasillaDeCruz = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila >= medio - 1 && fila <= medio) ||
      (columna >= medio - 1 && columna <= medio) ||
      (fila >= 0 && fila < medio - 1 && columna === medio - 1) ||
      (fila > medio && fila < tamanio && columna === medio - 1) ||
      (columna >= 0 && columna < medio - 1 && fila === medio - 1) ||
      (columna > medio && columna < tamanio && fila === medio - 1)
    );
  };

  const esCasillaCentro = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila === medio - 1 || fila === medio) &&
      (columna === medio - 1 || columna === medio)
    );
  };

  const esCasillaFinal = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila === tamanio - 1 && columna === medio - 1) ||
      (fila === 0 && columna === medio) ||
      (fila === medio - 1 && columna === 0) ||
      (fila === medio && columna === tamanio - 1)
    );
  };

  const esCasillaInicio = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila === tamanio - 1 && columna === medio) ||
      (fila === 0 && columna === medio - 1) ||
      (fila === medio && columna === 0) ||
      (fila === medio - 1 && columna === tamanio - 1)
    );
  };

  const esCasillaTriangulo = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila === tamanio - 3 && columna === medio - 1) ||
      (fila === tamanio - 3 && columna === medio) ||
      (fila === medio - 1 && columna === tamanio - 3) ||
      (fila === medio && columna === tamanio - 3) ||
      (fila === 2 && columna === medio - 1) ||
      (fila === 2 && columna === medio) ||
      (fila === medio - 1 && columna === 2) ||
      (fila === medio && columna === 2)
    );
  };

  const esCasillaSalida = (fila: number, columna: number) => {
    const medio = tamanio / 2;
    return (
      (fila === medio - 2 && columna === medio) ||
      (fila === medio && columna === medio + 1) ||
      (fila === medio - 1 && columna === medio - 2) ||
      (fila === medio + 1 && columna === medio - 1)
    );
  };

  const getTipoCasilla = (fila: number, columna: number): CasillaType => {
    if (esCasillaCentro(fila, columna)) return "Centro";
    if (esCasillaFinal(fila, columna)) return "Final";
    if (esCasillaInicio(fila, columna)) return "Inicio";
    if (esCasillaTriangulo(fila, columna)) return "Triangulo";
    if (esCasillaSalida(fila, columna)) return "Salida";
    return "Normal";
  };

  const getOrientacion = (fila: number, columna: number): Orientacion => {
    const medio = tamanio / 2;

    // Casillas en el brazo izquierdo
    if (fila === medio - 1 && columna < medio) return "IzquierdaArriba";
    if (fila === medio && columna < medio) return "IzquierdaAbajo";

    // Casillas en el brazo derecho
    if (fila === medio - 1 && columna > medio) return "DerechaArriba";
    if (fila === medio && columna > medio) return "DerechaAbajo";

    // Casillas en el brazo superior
    if (fila < medio && columna === medio - 1) return "ArribaIzquierda";
    if (fila < medio && columna === medio) return "ArribaDerecha";

    // Casillas en el brazo inferior
    if (fila > medio && columna === medio - 1) return "AbajoIzquierda";
    if (fila > medio && columna === medio) return "AbajoDerecha";

    return "AbajoDerecha"; // Default orientation
  };

  const renderTablero = () => {
    const tablero = [];
    for (let fila = 0; fila < tamanio; fila++) {
      for (let columna = 0; columna < tamanio; columna++) {
        if (esCasillaDeCruz(fila, columna)) {
          const tipo = getTipoCasilla(fila, columna);
          const orientacion = getOrientacion(fila, columna);
          tablero.push(
            <Casilla
              key={`${fila}-${columna}`}
              tipo={tipo}
              posicion={[fila, columna]}
              tamanioTablero={tamanio}
              orientacion={orientacion}
            />
          );
        } else {
          tablero.push(
            <div
              key={`${fila}-${columna}`}
              className="w-full h-full bg-amber-700"
            />
          );
        }
      }
    }
    return tablero;
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfig(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background ">
      <Dialog open={showConfig} onOpenChange={setShowConfig}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Patolli Game</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleConfigSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tamanio">
                Board size (even number between 12 and 20):
              </Label>
              <Input
                id="tamanio"
                type="number"
                min="12"
                max="20"
                step="2"
                value={tamanio}
                onChange={(e) => setTamanio(parseInt(e.target.value))}
              />
            </div>
            <Button type="submit">Start Game</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div
        className="grid gap-0.5 bg-amber-900 p-4  shadow-lg min-h-max min-w-max scale-50 sm:scale-75 md:scale-100 "
        style={{
          gridTemplateColumns: `repeat(${tamanio}, minmax(0, 1fr))`,
        
        }}
      >
        {renderTablero()}
      </div>
    </div>
  );
};
