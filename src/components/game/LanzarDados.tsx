import { Sounds } from "@/constants/sound";
import useSound from "@/hooks/useSound";
import React, { useState, useEffect } from "react";

//  son las cañas
const LanzarDados: React.FC = () => {
  // Estado para las 5 cañas, inicialmente lisas (false = liso, true = con punto)
  const [canas, setCanas] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [lanzando, setLanzando] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [resultado, setResultado] = useState<number | null>(null);

  // Controlador de la animación
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (lanzando) {
      interval = setInterval(() => {
        setCanas((prevCanas) => prevCanas.map(() => Math.random() > 0.5)); // Cambiar aleatoriamente entre liso y punto
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [lanzando]);

  // Función que se ejecuta al hacer clic en una caña
  const detenerCana = (index: number) => {
    setLanzando(false); // Detener la animación
  };

  // Función para calcular el número de casillas que se deben avanzar
  const calcularCasillas = () => {
    const puntos = canas.filter((cana) => cana).length; // Contar las cañas con punto

    switch (puntos) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 10;
      default:
        return 0; // No se avanza si todas las cañas son lisas
    }
  };

  const { playSound } = useSound();
  // Función para lanzar las cañas
  const lanzarCanas = () => {
    setDisable(true)
    playSound("/sounds/dados.mp3");
    setTimeout(() => {
      setLanzando(true);
      setResultado(null); // Resetear el resultado antes de lanzar
      setTimeout(() => {
        setLanzando(false); // Detener la animación después de 3 segundos
        const valorCasillas = calcularCasillas();
        if (valorCasillas == 0) {
          playSound(Sounds.PERDER);
        } else {
          playSound(Sounds.GANAR);
        }
        setResultado(valorCasillas); // Mostrar el número de casillas a avanzar
      }, 3000); // Duración de la animación
    }, 200);
  };

  return (
    <div className="flex flex-col items-center">
      <button
    //   disabled={disable}
        onClick={lanzarCanas}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Lanzar cañas
      </button>

      <div className="flex space-x-4 mb-4">
        {canas.map((cana, index) => (
          <div
            key={index}
            onClick={() => detenerCana(index)}
            className={`w-12 h-12 flex items-center justify-center rounded border-2 ${
              cana ? "bg-green-500" : "bg-gray-300"
            } cursor-pointer`}
          >
            {cana ? "•" : ""}
          </div>
        ))}
      </div>

      {resultado !== null && (
        <p className="text-lg font-semibold">
          Avanza {resultado} casilla{resultado === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
};

export default LanzarDados;
