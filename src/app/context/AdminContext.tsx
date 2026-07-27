import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import { MOCK_SOLICITUDES } from "../../data/mockSolicitudes";
import { MOCK_DENUNCIAS } from "../../data/mockDenuncias";

interface AdminContextType {
  solicitudes: typeof MOCK_SOLICITUDES;
  denuncias: typeof MOCK_DENUNCIAS;
  addSolicitud: (sol: typeof MOCK_SOLICITUDES[0]) => void;
  updateSolicitud: (id: string, updates: Partial<typeof MOCK_SOLICITUDES[0]>) => void;
  updateDenuncia: (id: number, updates: Partial<typeof MOCK_DENUNCIAS[0]>) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [solicitudes, setSolicitudes] = useState(() => {
    const stored = storage.getSolicitudes();
    return stored.length > 0 ? stored : MOCK_SOLICITUDES;
  });

  const [denuncias, setDenuncias] = useState(() => {
    const stored = storage.getDenuncias();
    return stored.length > 0 ? stored : MOCK_DENUNCIAS;
  });

  const addSolicitud = useCallback((sol: typeof MOCK_SOLICITUDES[0]) => {
    setSolicitudes((prev) => {
      const updated = [sol, ...prev];
      storage.setSolicitudes(updated);
      return updated;
    });
  }, []);

  const updateSolicitud = useCallback((id: string, updates: Partial<typeof MOCK_SOLICITUDES[0]>) => {
    setSolicitudes((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
      storage.setSolicitudes(updated);
      return updated;
    });
  }, []);

  const updateDenuncia = useCallback((id: number, updates: Partial<typeof MOCK_DENUNCIAS[0]>) => {
    setDenuncias((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, ...updates } : d));
      storage.setDenuncias(updated);
      return updated;
    });
  }, []);

  return (
    <AdminContext.Provider value={{ solicitudes, denuncias, addSolicitud, updateSolicitud, updateDenuncia }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
