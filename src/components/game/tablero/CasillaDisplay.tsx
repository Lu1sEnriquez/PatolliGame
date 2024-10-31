import {
  Casilla,
  CasillaTypeEnum,
  OrientacionCasilla,
} from "@/interfaces/Patolli";
import { FichaDisplay } from "./FichaDisplay";

interface CasillaProps {
  casilla: Casilla;
}

export const CasillaDisplay = ({ casilla }: CasillaProps) => {
  const getBackgroundColor = () => {
    switch (casilla.tipo) {
      case CasillaTypeEnum.CENTRAL:
        return "bg-green-500";
      // case CasillaTypeEnum.SEMICIRCULAR:
      //   return "bg-blue-500";
      case CasillaTypeEnum.FINAL:
        return "bg-red-500";
      case CasillaTypeEnum.INICIO:
        return "bg-blue-500";
      case CasillaTypeEnum.NORMAL:
        return "bg-amber-200";
      case CasillaTypeEnum.SALIDA:
        return "bg-cyan-500";
      case CasillaTypeEnum.TRIANGULO:
        return "bg-amber-200";
      case CasillaTypeEnum.NORMAL:
        return "bg-amber-200";
      case CasillaTypeEnum.SEMICIRCULAR:
        return "bg-blue-200";
      default:
        return "bg-transparent border-none";
    }
  };

  const getBorderRadius = () => {
    if (
      casilla.tipo === CasillaTypeEnum.FINAL ||
      casilla.tipo === CasillaTypeEnum.INICIO
    ) {
      switch (casilla.orientacion) {
        case OrientacionCasilla.IzquierdaSuperior:
          return "rounded-tl-full"; // Borde IzquierdaSuperior
        case OrientacionCasilla.IzquierdaInferior:
          return "rounded-bl-full"; // Borde IzquierdaInferior

        case OrientacionCasilla.DerechaSuperior:
          return "rounded-tr-full"; // Borde derecha superior
        case OrientacionCasilla.DerechaInferior:
          return "rounded-br-full"; // derecga inferior

        case OrientacionCasilla.SuperiorIzquierda:
          return "rounded-tl-full"; // Borde inferior izquierdo
        case OrientacionCasilla.SuperiorDerecha:
          return "rounded-tr-full"; // Borde inferior derecho

        case OrientacionCasilla.InferiorIzquierda:
          return "rounded-bl-full"; // Borde superior izquierdo
        case OrientacionCasilla.InferiorDerecha:
          return "rounded-br-full"; // Borde superior derecho

        default:
          return "";
      }
    }
    return "";
  };

  const getTriangleRotation = () => {
    switch (casilla.orientacion) {
      case "SuperiorDerecha":
        return "-rotate-90";
      case "SuperiorIzquierda":
        return "rotate-90";
      case "InferiorDerecha":
        return "-rotate-90";
      case "InferiorIzquierda":
        return "rotate-90";
      case "DerechaSuperior":
        return "rotate-180";
      case "DerechaInferior":
        return "rotate-360";
      case "IzquierdaSuperior":
        return "rotate-180";
      case "IzquierdaInferior":
        return "rotate-360";
    }
  };

  return (
    <div
      onClick={() => alert(`${casilla.orientacion + casilla.tipo}`)}
      className={`z-10  min-h-[3rem] min-w-[3rem]  border border-amber-700 shadow-lg shadow-gray-900 flex items-center justify-center ${getBackgroundColor()} ${getBorderRadius()}  `}
    >
      {casilla.tipo === CasillaTypeEnum.TRIANGULO ? (
        <div className="relative">
          <div className="absolute z-10 left-0 right-0 top-0 bottom-0">
            {casilla.ocupante && <FichaDisplay ficha={casilla.ocupante} />}
          </div>
          <div
            className={`w-0 h-0 border-l-[1.25rem] border-l-transparent  border-r-[1.25rem] border-r-transparent border-b-[2.25rem]  ${getTriangleRotation()}`}
          ></div>
        </div>
      ) : (
        <div className="text-xs text-slate-100">
          {/* aqui va la ficha */}

          {/* <p className="text-black text-xs">{casilla.id}</p>
          <p className="text-black text-xs">
            {casilla.posicion.X + "," + casilla.posicion.Y}
          </p> */}
          <p className="text-black text-xs">{casilla.id}</p>
          {casilla.ocupante && <FichaDisplay ficha={casilla.ocupante} />}
        </div>
      )}
    </div>
  );
};
