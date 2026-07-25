import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import type { ManadaPet } from "../lib/types";

interface ManadaContextType {
  pets: ManadaPet[];
  addToManada: (pet: ManadaPet) => void;
  removeFromManada: (petId: string) => void;
  updatePetAmount: (petId: string, amount: number) => void;
  clearManada: () => void;
  totalMonthly: number;
}

const ManadaContext = createContext<ManadaContextType | null>(null);

export function ManadaProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<ManadaPet[]>(() => storage.getManadaCart());

  const persist = (updated: ManadaPet[]) => {
    setPets(updated);
    storage.setManadaCart(updated);
  };

  const addToManada = useCallback((pet: ManadaPet) => {
    setPets((prev) => {
      if (prev.some((p) => p.petId === pet.petId)) return prev;
      const updated = [...prev, pet];
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const removeFromManada = useCallback((petId: string) => {
    setPets((prev) => {
      const updated = prev.filter((p) => p.petId !== petId);
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const updatePetAmount = useCallback((petId: string, amount: number) => {
    setPets((prev) => {
      const updated = prev.map((p) => (p.petId === petId ? { ...p, monthlyAmount: amount } : p));
      storage.setManadaCart(updated);
      return updated;
    });
  }, []);

  const clearManada = useCallback(() => {
    persist([]);
  }, []);

  const totalMonthly = pets.reduce((acc, p) => acc + p.monthlyAmount, 0);

  return (
    <ManadaContext.Provider value={{ pets, addToManada, removeFromManada, updatePetAmount, clearManada, totalMonthly }}>
      {children}
    </ManadaContext.Provider>
  );
}

export function useManada() {
  const ctx = useContext(ManadaContext);
  if (!ctx) throw new Error("useManada must be used within ManadaProvider");
  return ctx;
}
