"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IoSettingsSharp } from "react-icons/io5";
import SoundSettings from "./SoundSettings";
import { redirect, useRouter } from "next/navigation";

interface Props {
  children?: ReactNode;
}

export const DialogSettings = ({ children }: Props) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {children ? (
            children
          ) : (
            <Button>
              <IoSettingsSharp />
            </Button>
          )}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Ajustes</DialogTitle>
        <DialogDescription>opciones de configuracion</DialogDescription>
        <SoundSettings></SoundSettings>
        <Button variant={"destructive"} onClick={() => router.push("/")}>
          Salir
        </Button>
      </DialogContent>
    </Dialog>
  );
};
