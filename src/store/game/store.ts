import { Jugador, Partida } from "@/interfaces/Patolli";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PartidaState {
  partida: Partida | null; // Estado inicial de la partida
  setPartida: (partida: Partida) => void; // Función para establecer la partida
  resetPartida: () => void; // Función para reiniciar la partida
  addJugador: (jugador: Jugador) => void; // Función para añadir un jugador a la partida
  removeJugador: (jugadorId: number) => void; // Función para eliminar un jugador de la partida
}

// Crea el store usando Zustand con el middleware persist
export const usePartidaStore = create<PartidaState>()(
  persist(
    (set) => ({
      partida: null, // Inicializa la partida como nula
      setPartida: (partida) => set({ partida }), // Establece la partida
      resetPartida: () => set({ partida: null }), // Reinicia la partida
      addJugador: (jugador) =>
        set((state) => {
          if (state.partida) {
            return {
              partida: {
                ...state.partida,
                jugadores: [...state.partida.jugadores, jugador], // Añade el jugador
              },
            };
          }
          return state; // Si la partida es nula, no se hace nada
        }),
      removeJugador: (jugadorId) =>
        set((state) => {
          if (state.partida) {
            return {
              partida: {
                ...state.partida,
                jugadores: state.partida.jugadores.filter((j) => j.id !== jugadorId), // Filtra el jugador por ID
              },
            };
          }
          return state; // Si la partida es nula, no se hace nada
        }),
    }),
    {
      name: "partida-store", // Nombre clave en localStorage
      // Función que transforma los datos cuando son recuperados del localStorage
      merge: (persistedState: unknown, currentState) => {
        const mergedState: PartidaState = {
          ...currentState,
          partida: null, // Asegúrate de que el valor predeterminado sea null
        };

        // Asegúrate de que persistedState sea un objeto y contenga una propiedad 'partida'
        if (typeof persistedState === "object" && persistedState !== null && 'partida' in persistedState) {
          const partidaPersistida = persistedState.partida as Partida; // Tipo explícito

          // Verificar que la partidaPersistida tiene la forma esperada
          if (partidaPersistida && 'codigo' in partidaPersistida) {
            mergedState.partida = partidaPersistida; // Asigna solo si tiene la forma correcta
          }
        }

        return mergedState;
      },
    }
  )
);
