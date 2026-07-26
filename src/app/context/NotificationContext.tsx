import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import { MOCK_NOTIFICACIONES } from "../../data/mockNotificaciones";

interface NotificationContextType {
  notificaciones: typeof MOCK_NOTIFICACIONES;
  marcarLeido: (id: number) => void;
  marcarTodasLeidas: () => void;
  calificar: (id: number, calificacion: number) => void;
  ocultar: (id: number) => void;
  noLeidas: number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notificaciones, setNotificaciones] = useState(() => {
    const stored = storage.getNotificaciones();
    return stored.length > 0 ? stored : MOCK_NOTIFICACIONES;
  });

  const persist = (updated: typeof MOCK_NOTIFICACIONES) => {
    setNotificaciones(updated);
    storage.setNotificaciones(updated);
  };

  const marcarLeido = useCallback((id: number) => {
    setNotificaciones((prev) => {
      const now = new Date().toISOString().split("T")[0];
      const updated = prev.map((n) =>
        n.id === id ? { ...n, leido: true, fecha_leido: now, updatedAt: now } : n
      );
      storage.setNotificaciones(updated);
      return updated;
    });
  }, []);

  const marcarTodasLeidas = useCallback(() => {
    setNotificaciones((prev) => {
      const now = new Date().toISOString().split("T")[0];
      const updated = prev.map((n) =>
        n.leido ? n : { ...n, leido: true, fecha_leido: now, updatedAt: now }
      );
      storage.setNotificaciones(updated);
      return updated;
    });
  }, []);

  const calificar = useCallback((id: number, calificacion: number) => {
    setNotificaciones((prev) => {
      const now = new Date().toISOString().split("T")[0];
      const updated = prev.map((n) =>
        n.id === id ? { ...n, calificacion, fecha_calificacion: now, updatedAt: now } : n
      );
      storage.setNotificaciones(updated);
      return updated;
    });
  }, []);

  const ocultar = useCallback((id: number) => {
    setNotificaciones((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, visible: false, updatedAt: new Date().toISOString() } : n
      );
      storage.setNotificaciones(updated);
      return updated;
    });
  }, []);

  const noLeidas = notificaciones.filter((n) => n.visible && !n.leido).length;

  return (
    <NotificationContext.Provider value={{ notificaciones, marcarLeido, marcarTodasLeidas, calificar, ocultar, noLeidas }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
