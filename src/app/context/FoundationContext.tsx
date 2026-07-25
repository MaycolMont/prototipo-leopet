import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import { MOCK_MASCOTAS } from "../../data/mockMascotas";
import { MOCK_EVIDENCIAS } from "../../data/mockEvidencias";
import { MOCK_ADVERTENCIAS } from "../../data/mockAdvertencias";
import { MOCK_PADRINOS } from "../../data/mockPadrinos";

type Mascota = typeof MOCK_MASCOTAS[0];
type Evidencia = typeof MOCK_EVIDENCIAS[0];
type Advertencia = typeof MOCK_ADVERTENCIAS[0];

interface FoundationContextType {
  mascotas: Mascota[];
  evidencias: Evidencia[];
  advertencias: Advertencia[];
  padrinos: typeof MOCK_PADRINOS;
  addMascota: (mascota: Mascota) => void;
  updateMascota: (id: number, updates: Partial<Mascota>) => void;
  addEvidencia: (evidencia: Evidencia) => void;
  updateAdvertencia: (id: string, updates: Partial<Advertencia>) => void;
}

const FoundationContext = createContext<FoundationContextType | null>(null);

export function FoundationProvider({ children }: { children: ReactNode }) {
  const [mascotas, setMascotas] = useState<Mascota[]>(() => {
    const stored = storage.getFoundationMascotas();
    return stored.length > 0 ? stored : MOCK_MASCOTAS;
  });

  const [evidencias, setEvidencias] = useState<Evidencia[]>(() => {
    const stored = storage.getFoundationEvidencias();
    return stored.length > 0 ? stored : MOCK_EVIDENCIAS;
  });

  const [advertencias, setAdvertencias] = useState<Advertencia[]>(() => {
    const stored = storage.getFoundationAdvertencias();
    return stored.length > 0 ? stored : MOCK_ADVERTENCIAS;
  });

  const padrinos = MOCK_PADRINOS;

  const addMascota = useCallback((mascota: Mascota) => {
    setMascotas((prev) => {
      const updated = [...prev, mascota];
      storage.setFoundationMascotas(updated);
      return updated;
    });
  }, []);

  const updateMascota = useCallback((id: number, updates: Partial<Mascota>) => {
    setMascotas((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, ...updates } : m));
      storage.setFoundationMascotas(updated);
      return updated;
    });
  }, []);

  const addEvidencia = useCallback((evidencia: Evidencia) => {
    setEvidencias((prev) => {
      const updated = [evidencia, ...prev];
      storage.setFoundationEvidencias(updated);
      return updated;
    });
  }, []);

  const updateAdvertencia = useCallback((id: string, updates: Partial<Advertencia>) => {
    setAdvertencias((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      storage.setFoundationAdvertencias(updated);
      return updated;
    });
  }, []);

  return (
    <FoundationContext.Provider value={{ mascotas, evidencias, advertencias, padrinos, addMascota, updateMascota, addEvidencia, updateAdvertencia }}>
      {children}
    </FoundationContext.Provider>
  );
}

export function useFoundation() {
  const ctx = useContext(FoundationContext);
  if (!ctx) throw new Error("useFoundation must be used within FoundationProvider");
  return ctx;
}
