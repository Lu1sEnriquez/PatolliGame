import React from "react";
import { Card } from "../ui/card";
import { DialogSettings } from "../gameMenu/DialogSettings";
import { FaGamepad } from "react-icons/fa";
import { ToggleTheme } from "../theme/ToggleTheme";

export const NavbarGame = () => {
  return (
    <Card className="absolute z-20 w-full flex flex-row p-3 justify-between items-center">
      <div className="flex  flex-row items-center gap-2">
        <h1 className="text-2xl ">Patolli Game</h1>
        <FaGamepad size={40} />
      </div>
      <div className="flex flex-row gap-2">
        <ToggleTheme />
        <DialogSettings />
      </div>
    </Card>
  );
};
