import { Ficha } from "@/interfaces/Patolli";
import { SiJsonwebtokens } from "react-icons/si";

interface FichaProps {
  ficha: Ficha;
}
export const FichaDisplay = ({ ficha }: FichaProps) => {
  return (
    <div>
      <p className="text-white font-bold">{ficha.id}</p>
      <SiJsonwebtokens
        size={30}
        className=" z-10 shadow-xl rounded-full bg-black"
        color={ficha.color}
      />
    </div>
  );
};
