"use client";
import { cn } from "@/lib/utils";

import { CasillaDisplay } from "./CasillaDisplay";

import { Casilla, Tablero } from "@/interfaces/Patolli";
import { usePartidaStore } from "@/store/game/store";

// Componente del tablero

export const TableroDisplay = () => {
  const renderTablero = (tablero: Tablero) => {
    // Convertimos el array unidimensional de casillas en una matriz 2D (filas y columnas)
    const gridSize = tablero.tableroSize;

    // Creamos una matriz vacía
    const casillasMatriz: (Casilla | null)[][] = Array.from(
      { length: gridSize },
      () => Array(gridSize).fill(null)
    );

    // Colocamos cada casilla en su posición en la matriz de casillas
    tablero.casillas.forEach((casilla) => {
      const { X, Y } = casilla.posicion;
      if (X < gridSize && Y < gridSize) {
        casillasMatriz[X][Y] = casilla;
      }
    });

    // Recorremos la matriz de casillas para renderizar el tablero
    return casillasMatriz.map((fila, rowIndex) =>
      fila.map((casilla, colIndex) => {
        if (casilla) {
          return (
            <CasillaDisplay key={`${rowIndex}-${colIndex}`} casilla={casilla} />
          );
        } else {
          // Renderizamos una celda vacía si no hay casilla en esta posición
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-full h-full bg-transparent shadow-custom shadow-gray-900 "
            >
              {/* Espacio para casillas vacías */}
            </div>
          );
        }
      })
    );
  };
  const { partida } = usePartidaStore();

  return (
    <div
      className={cn(
        // "rotate-180 transform scale-x-[-1]",
        " rounded-full  overflow-hidden shadow-customXl shadow-black"
      )}
    >
      {/* <div className=" z-10 w-full flex justify-center ">
        <Button onClick={handleMover}>+</Button>
        <Button onClick={handleMoverAtras}>-</Button>
      </div> */}
      <div
        className={cn(
          // "-rotate-45 ",
          "grid gap-0.5 min-h-max min-w-max"
        )}
        style={{
          gridTemplateColumns: `repeat(${
            partida?.tablero !== undefined && partida?.tablero.tableroSize
          }, minmax(0, 1fr))`,
        }}
      >
        {partida?.tablero !== undefined && renderTablero(partida.tablero)}
      </div>
    </div>
  );
};
