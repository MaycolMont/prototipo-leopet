const KEYS = {
  MANADA_CART: "leopet_manada_cart",
  USER: "leopet_user",
  SUBSCRIPTIONS: "leopet_subscriptions",
  EVIDENCE_RATINGS: "leopet_evidence_ratings",
} as const;

export const storage = {
  getManadaCart: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.MANADA_CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setManadaCart: (cart: any[]) => {
    localStorage.setItem(KEYS.MANADA_CART, JSON.stringify(cart));
  },

  getUser: (): any | null => {
    try {
      const data = localStorage.getItem(KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: any | null) => {
    if (user) {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.USER);
    }
  },

  getSubscriptions: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.SUBSCRIPTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setSubscriptions: (subs: any[]) => {
    localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
  },

  getEvidenceRatings: (): Record<string, { rating: number; comment?: string }> => {
    try {
      const data = localStorage.getItem(KEYS.EVIDENCE_RATINGS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  setEvidenceRatings: (ratings: Record<string, { rating: number; comment?: string }>) => {
    localStorage.setItem(KEYS.EVIDENCE_RATINGS, JSON.stringify(ratings));
  },
};
