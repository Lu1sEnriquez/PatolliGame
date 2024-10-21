"use client";
import { cn } from "@/lib/utils";

import { CasillaDisplay } from "./CasillaDisplay";

import { useEffect, useState } from "react";

import { Casilla, Tablero } from "@/interfaces/Patolli";

// Componente del tablero
interface TableroProps {
  tableroInicial: Tablero;
}

export const TableroDisplay = ({ tableroInicial }: TableroProps) => {
  const [tablero] = useState<Tablero>(tableroInicial);

  useEffect(() => {
    // setTablero(tableroChicoTest);
  }, []);

  // const jugador: Jugador = {
  //   id: 0,
  //   color: "red",
  //   fondoApuesta: 10,
  //   haPerdido: false,
  //   nombre: "prueba",

  // };

  const handleMover = () => {
    // const tableroUpdate = moverFicha(
    //   jugador,
    //   1,
    //   tablero,
    //   Direcciones.ADELANTE,
    //   [jugador]
    // );
    // setTablero(tableroUpdate);
  };
  const handleMoverAtras = () => {
    // const tableroUpdate = moverFicha(jugador, 1, tablero, Direcciones.ATRAS, [
    //   jugador,
    // ]);
    // setTablero(tableroUpdate);
  };

  const renderTablero = (tablero: Tablero) => {
    console.log(tablero);

    return tablero.casillas.map((casilla: Casilla, index: number) => {
      if (casilla) {
        return <CasillaDisplay key={index} casilla={casilla} />;
      } else {
        return (
          <div
            key={index}
            className={cn(
              "w-full h-full",
              { "bg-amber-700": false } //true muestra las casillas extras de la matriz
            )}
          >
            <p className="z-10">{casilla}</p>
          </div>
        );
      }
    });
  };

  return (
    <div className="  ">
      {/* <div className="rotate-1 z-10 w-full flex justify-center ">
        <Button onClick={handleMover}>+</Button>
        <Button onClick={handleMoverAtras}>-</Button>
      </div> */}
      <div
        className={cn(`rotate-45 grid gap-1px    min-h-max min-w-max   `)}
        style={{
          gridTemplateColumns: `repeat(${
            tablero !== undefined && tablero.numeroCasillasPorAspa
          }, minmax(0, 1fr))`,
        }}
      >
        {tablero !== undefined && renderTablero(tablero)}
      </div>
    </div>
  );
};
