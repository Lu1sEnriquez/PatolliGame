import type{ Ficha } from "@/backend/interface/ficha.interface";
import { SiJsonwebtokens } from "react-icons/si";

interface FichaProps {
    ficha: Ficha;
  }
  export const FichaDisplay = ({ ficha }: FichaProps) => {
    return (
      <SiJsonwebtokens
        size={30}
        className=" z-10 shadow-xl rounded-full bg-black"
        color={ficha.color}
      />
    );
  };
  