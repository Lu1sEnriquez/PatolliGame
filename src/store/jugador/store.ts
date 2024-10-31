import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JugadorState {
  id: number | null; // ID del jugador
  name: string | null; // Nombre del jugador
  setJugador: (id: number, name: string) => void; // Función para establecer los datos del jugador
  resetJugador: () => void; // Función para reiniciar los datos del jugador
}

// Crea el store usando Zustand con el middleware persist para el jugador
export const useJugadorStore = create<JugadorState>()(
  persist(
    (set) => ({
      id: null, // Inicializa el ID del jugador como nulo
      name: null, // Inicializa el nombre del jugador como nulo
      setJugador: (id, name) => set({ id, name }), // Establece los datos del jugador
      resetJugador: () => set({ id: null, name: null }), // Reinicia los datos del jugador
    }),
    {
      name: "jugador-store", // Nombre clave en localStorage
      merge: (persistedState: unknown, currentState) => {
        const mergedState: JugadorState = {
          ...currentState,
          id: null,
          name: null,
        };

        if (typeof persistedState === "object" && persistedState !== null) {
          const persisted = persistedState as Partial<JugadorState>;

          if (persisted.id !== undefined) {
            mergedState.id = persisted.id;
          }
          if (persisted.name) {
            mergedState.name = persisted.name;
          }
        }

        return mergedState;
      },
    }
  )
);
