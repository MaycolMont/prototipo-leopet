import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { storage } from "../lib/storage";
import type { Subscription } from "../lib/types";

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (sub: Subscription) => void;
  pauseSubscription: (subId: string) => void;
  resumeSubscription: (subId: string) => void;
  removePetFromSubscription: (subId: string, petId: string) => void;
  getActiveSubscriptions: () => Subscription[];
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => storage.getSubscriptions());

  const persist = (updated: Subscription[]) => {
    setSubscriptions(updated);
    storage.setSubscriptions(updated);
  };

  const addSubscription = useCallback((sub: Subscription) => {
    setSubscriptions((prev) => {
      const updated = [...prev, sub];
      storage.setSubscriptions(updated);
      return updated;
    });
  }, []);

  const pauseSubscription = useCallback((subId: string) => {
    setSubscriptions((prev) => {
      const updated = prev.map((s) =>
        s.id === subId ? { ...s, status: "paused" as const, pausedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() } : s
      );
      storage.setSubscriptions(updated);
      return updated;
    });
  }, []);

  const resumeSubscription = useCallback((subId: string) => {
    setSubscriptions((prev) => {
      const updated = prev.map((s) => (s.id === subId ? { ...s, status: "active" as const, pausedUntil: undefined } : s));
      storage.setSubscriptions(updated);
      return updated;
    });
  }, []);

  const removePetFromSubscription = useCallback((subId: string, petId: string) => {
    setSubscriptions((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== subId) return s;
        const newPets = s.pets.filter((p) => p.petId !== petId);
        return { ...s, pets: newPets, totalMonthly: newPets.reduce((a, p) => a + p.monthlyAmount, 0) };
      }).filter((s) => s.pets.length > 0);
      storage.setSubscriptions(updated);
      return updated;
    });
  }, []);

  const getActiveSubscriptions = useCallback(() => {
    return subscriptions.filter((s) => s.status === "active");
  }, [subscriptions]);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription, pauseSubscription, resumeSubscription, removePetFromSubscription, getActiveSubscriptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscriptions must be used within SubscriptionProvider");
  return ctx;
}
