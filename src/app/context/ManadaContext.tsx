import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import type { ManadaAnimal } from "../lib/types";

interface ManadaContextType {
  mascotas: ManadaAnimal[];
  nombre: string;
  setNombre: (name: string) => void;
  addToManada: (animal: ManadaAnimal) => void;
  removeFromManada: (animalId: string) => void;
  updateAnimalAmount: (animalId: string, amount: number) => void;
  clearManada: () => void;
  totalMonthly: number;
}

const ManadaContext = createContext<ManadaContextType | null>(null);

export function ManadaProvider({ children }: { children: ReactNode }) {
  const [mascotas, setMascotas] = useState<ManadaAnimal[]>(() => storage.getManadaCart());
  const [nombre, setNombreState] = useState<string>(() => storage.getManadaNombre() || "Mi Manada");

  const persistMascotas = (updated: ManadaAnimal[]) => {
    setMascotas(updated);
    storage.setManadaCart(updated);
  };

  const setNombre = useCallback((name: string) => {
    setNombreState(name);
    storage.setManadaNombre(name);
  }, []);

  const addToManada = useCallback((animal: ManadaAnimal) => {
    setMascotas((prev) => {
      if (prev.some((a) => a.animalId === animal.animalId)) return prev;
      const updated = [...prev, animal];
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const removeFromManada = useCallback((animalId: string) => {
    setMascotas((prev) => {
      const updated = prev.filter((a) => a.animalId !== animalId);
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const updateAnimalAmount = useCallback((animalId: string, amount: number) => {
    setMascotas((prev) => {
      const updated = prev.map((a) => (a.animalId === animalId ? { ...a, montoMensual: amount } : a));
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const clearManada = useCallback(() => {
    persistMascotas([]);
    setNombreState("Mi Manada");
    storage.setManadaNombre("Mi Manada");
  }, []);

  const totalMonthly = mascotas.reduce((acc, a) => acc + a.montoMensual, 0);

  return (
    <ManadaContext.Provider value={{ mascotas, nombre, setNombre, addToManada, removeFromManada, updateAnimalAmount, clearManada, totalMonthly }}>
      {children}
    </ManadaContext.Provider>
  );
}

export function useManada() {
  const ctx = useContext(ManadaContext);
  if (!ctx) throw new Error("useManada must be used within ManadaProvider");
  return ctx;
}
