import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";

interface AuthUser {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  cedula?: string;
  rol: "donador" | "fundacion" | "admin";
  estaActivo: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (correo: string, password: string) => boolean;
  register: (nombre: string, apellido: string, correo: string, password: string, cedula?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => storage.getUser());

  const ADMIN_EMAIL = "admin@leopet.com";
  const ADMIN_PASS = "Admin123!";

  const FOUNDATION_ACCOUNTS: Record<string, { id: string; nombre: string; fundacionId: string }> = {
    "fundacion1@leopet.com": { id: "usr-fund1", nombre: "María Torres", fundacionId: "fund-01" },
    "fundacion2@leopet.com": { id: "usr-fund2", nombre: "Carlos Ruiz", fundacionId: "fund-02" },
    "fundacion3@leopet.com": { id: "usr-fund3", nombre: "Ana García", fundacionId: "fund-03" },
  };
  const FOUNDATION_PASS = "Fundacion123!";

  const login = useCallback((correo: string, password: string) => {
    if (correo === ADMIN_EMAIL && password === ADMIN_PASS) {
      const adminUser: AuthUser = {
        id: "usr-admin",
        nombre: "Administrador",
        apellido: "Leopet",
        correo: ADMIN_EMAIL,
        rol: "admin",
        estaActivo: true,
      };
      setUser(adminUser);
      storage.setUser(adminUser);
      return true;
    }
    const foundationAccount = FOUNDATION_ACCOUNTS[correo];
    if (foundationAccount && password === FOUNDATION_PASS) {
      const fundUser: AuthUser = {
        id: foundationAccount.id,
        nombre: foundationAccount.nombre,
        apellido: "Fundación",
        correo,
        rol: "fundacion",
        estaActivo: true,
      };
      setUser(fundUser);
      storage.setUser(fundUser);
      return true;
    }
    const mockUser: AuthUser = {
      id: "usr-001",
      nombre: correo.split("@")[0],
      apellido: "",
      correo,
      rol: "donador",
      estaActivo: true,
    };
    setUser(mockUser);
    storage.setUser(mockUser);
    return true;
  }, []);

  const register = useCallback((nombre: string, apellido: string, correo: string, _password: string, cedula?: string) => {
    const mockUser: AuthUser = {
      id: "usr-" + Date.now(),
      nombre,
      apellido,
      correo,
      cedula,
      rol: "donador",
      estaActivo: true,
    };
    setUser(mockUser);
    storage.setUser(mockUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    storage.setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
