"use client";
import React from "react";
import { Card } from "../ui/card";
import { DialogSettings } from "../gameMenu/DialogSettings";
import { FaGamepad } from "react-icons/fa";
import { ToggleTheme } from "../theme/ToggleTheme";
import { usePartidaStore } from "@/store/game/store";

export const NavbarGame = () => {
  const { partida } = usePartidaStore();
  return (
    <Card className="absolute z-20 w-full flex flex-row p-3 justify-between items-center">
      <div className="flex  flex-row items-center sm:gap-2">
        <h1 className="text-2xl hidden sm:block">Patolli Game</h1>
        <FaGamepad size={40} />
      </div>
      <div className="sm:pr-20">
        <p>
          CODIGO:<span>{partida?.codigo}</span>
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <ToggleTheme />
        <DialogSettings />
      </div>
    </Card>
  );
};
