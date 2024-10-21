"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LuBean } from "react-icons/lu";
import { SiJsonwebtokens } from "react-icons/si";

export enum UserColor {
  PRIMERO = "#00aae6", //AZUL
  SEGUNDO = "#00e63c", //VERDE
  TERCERO = "#9b59b6", //MORADO
  CUARTO = "#FF0000", //ROJO
}

interface UserProps {
  username: string;
  fichas: number;
  fondo: number;
  color: string;
}

export const UserDisplay = ({ fichas, fondo, username, color }: UserProps) => {
  const [fichasArr] = useState<number[]>(Array(fichas).fill(0) as number[]);

  return (
    <div className={`flex flex-row  gap-3 text-[${color}] z-10`}>
      {/* icon user y name */}
      <div className="flex flex-col items-center gap-2">
        <FaUser size={60} className="" />
        <p>{username}</p>
      </div>

      {/*fondo y fichas  */}
      <div className="flex flex-col gap-3">
        {/*frijoles  */}
        <div className="flex flex-row gap-1 items-center">
          <LuBean size={25} className="text-orange-900" />
          <p className="text-2xl ">{fondo}</p>
        </div>

        {/* fichas */}
        <div className="grid grid-cols-3 gap-1 ">
          {fichasArr.map((v, i) => (
            <SiJsonwebtokens
              key={i}
              size={25}
              color={color}
              className="shadow-xl border rounded-full bg-foreground"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
