import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => storage.getUser());

  const login = useCallback((email: string, _password: string) => {
    const mockUser = { id: "user-1", name: email.split("@")[0], email };
    setUser(mockUser);
    storage.setUser(mockUser);
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    const mockUser = { id: "user-" + Date.now(), name, email };
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
