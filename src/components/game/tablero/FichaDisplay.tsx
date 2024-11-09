import { Ficha } from "@/interfaces/Patolli";
import { SiJsonwebtokens } from "react-icons/si";

interface FichaProps {
  ficha: Ficha;
}
export const FichaDisplay = ({ ficha }: FichaProps) => {
  return (
    <div className="relative col-span-1 row-span-1 flex items-center justify-center">
      <p className="absolute inset-0 z-10 flex items-center justify-center text-white font-bold ">
        {ficha.id}
      </p>
      <SiJsonwebtokens
        size={30}
        className="shadow-xl rounded-full bg-black"
        color={ficha.color}
      />
    </div>
  );
};
