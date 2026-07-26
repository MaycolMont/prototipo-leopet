import React, { createContext, useContext, useState, useCallback } from "react";
import { storage } from "../lib/storage";

interface FavoritosContextValue {
  favoritos: string[];
  toggleFavorito: (fundacionId: string) => void;
  isFavorito: (fundacionId: string) => boolean;
}

const FavoritosContext = createContext<FavoritosContextValue | null>(null);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>(() => storage.getFavoritos());

  const toggleFavorito = useCallback((fundacionId: string) => {
    setFavoritos((prev) => {
      const next = prev.includes(fundacionId)
        ? prev.filter((id) => id !== fundacionId)
        : [...prev, fundacionId];
      storage.setFavoritos(next);
      return next;
    });
  }, []);

  const isFavorito = useCallback(
    (fundacionId: string) => favoritos.includes(fundacionId),
    [favoritos]
  );

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error("useFavoritos must be used within FavoritosProvider");
  return ctx;
}
