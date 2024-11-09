"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LuBean } from "react-icons/lu";
import { SiJsonwebtokens } from "react-icons/si";
import { CiWifiOff } from "react-icons/ci";
import { Jugador } from "../../interfaces/Patolli";

export enum UserColor {
  PRIMERO = "#00aae6", //AZUL
  SEGUNDO = "#00e63c", //VERDE
  TERCERO = "#9b59b6", //MORADO
  CUARTO = "#FF0000", //ROJO
}

interface UserProps {
  jugador: Jugador;
}

export const UserDisplay = ({ jugador }: UserProps) => {
  const [fichasArr] = useState<number[]>(
    Array(jugador.fichas.length).fill(0) as number[]
  );

  return (
    <div className={`flex flex-row  gap-3 text-[${jugador.color}] z-10`}>
      {/* icon user y name */}
      <div className="relative flex flex-col items-center gap-2">
        {jugador.isDisconected && (
          <CiWifiOff
            size={40}
            className="absolute -top-2 -right-3 text-yellow-500"
          />
        )}

        <FaUser size={60} className="" />
        <p>{jugador.nombre}</p>
      </div>

      {/*fondo y fichas  */}
      <div className="flex flex-col gap-3">
        {/*frijoles  */}
        <div className="flex flex-row gap-1 items-center">
          <LuBean size={25} className="text-orange-900" />
          <p className="text-2xl ">{jugador.fondoApuesta}</p>
        </div>

        {/* fichas */}
        <div className="grid grid-cols-3 gap-1 ">
          {fichasArr.map((v, i) => (
            <SiJsonwebtokens
              key={i}
              size={25}
              color={jugador.color}
              className="shadow-xl border rounded-full bg-foreground"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
