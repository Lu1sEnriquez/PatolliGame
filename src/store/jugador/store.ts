import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JugadorState {
  id: number | null; // ID del jugador
  name: string | null; // Nombre del jugador
  idFicha: number | null; // ID de la ficha seleccionada
  cantidad: number | null; // Cantidad de dados con puntos
  pagoApuesta: boolean; // Estado de si se ha pagado la apuesta
  setJugador: (id: number, name: string) => void; // Establece los datos del jugador
  resetJugador: () => void; // Reinicia los datos del jugador
  setIdFicha: (idFicha: number) => void; // Establece el ID de la ficha seleccionada
  setCantidad: (cantidad: number) => void; // Establece la cantidad de dados con puntos
  setPagoApuesta: (pago: boolean) => void; // Establece el estado de pago de la apuesta
}

// Crea el store usando Zustand con el middleware persist para el jugador
export const useJugadorStore = create<JugadorState>()(
  persist(
    (set) => ({
      id: null, // Inicializa el ID del jugador como nulo
      name: null, // Inicializa el nombre del jugador como nulo
      idFicha: null, // Inicializa la ficha seleccionada como nula
      cantidad: null, // Inicializa la cantidad de dados con puntos como nulo
      pagoApuesta: false, // Inicializa el estado de pago de apuesta como falso
      setJugador: (id, name) => set({ id, name }), // Establece los datos del jugador
      resetJugador: () => set({ id: null, name: null, idFicha: null, cantidad: null, pagoApuesta: false }), // Reinicia los datos del jugador
      setIdFicha: (idFicha) => set({ idFicha }), // Establece el ID de la ficha seleccionada
      setCantidad: (cantidad) => set({ cantidad }), // Establece la cantidad de dados con puntos
      setPagoApuesta: (pago) => set({ pagoApuesta: pago }), // Establece el estado de pago de la apuesta
    }),
    {
      name: "jugador-store", // Nombre clave en localStorage
      merge: (persistedState: unknown, currentState) => {
        const mergedState: JugadorState = {
          ...currentState,
          id: null,
          name: null,
          idFicha: null,
          cantidad: null,
          pagoApuesta: false,
        };

        if (typeof persistedState === "object" && persistedState !== null) {
          const persisted = persistedState as Partial<JugadorState>;

          if (persisted.id !== undefined) {
            mergedState.id = persisted.id;
          }
          if (persisted.name) {
            mergedState.name = persisted.name;
          }
          if (persisted.idFicha !== undefined) {
            mergedState.idFicha = persisted.idFicha;
          }
          if (persisted.cantidad !== undefined) {
            mergedState.cantidad = persisted.cantidad;
          }
          if (persisted.pagoApuesta !== undefined) {
            mergedState.pagoApuesta = persisted.pagoApuesta;
          }
        }

        return mergedState;
      },
    }
  )
);
