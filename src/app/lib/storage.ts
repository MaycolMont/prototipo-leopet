const KEYS = {
  MANADA_CART: "leopet_manada_cart",
  USER: "leopet_user",
  SUBSCRIPTIONS: "leopet_subscriptions",
  EVIDENCE_RATINGS: "leopet_evidence_ratings",
  ADMIN_SOLICITUDES: "leopet_admin_solicitudes",
  ADMIN_DENUNCIAS: "leopet_admin_denuncias",
  FOUNDATION_MASCOTAS: "leopet_fundacion_mascotas",
  FOUNDATION_EVIDENCIAS: "leopet_fundacion_evidencias",
  FOUNDATION_ADVERTENCIAS: "leopet_fundacion_advertencias",
  NOTIFICACIONES: "leopet_notificaciones",
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

  getSolicitudes: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.ADMIN_SOLICITUDES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setSolicitudes: (solicitudes: any[]) => {
    localStorage.setItem(KEYS.ADMIN_SOLICITUDES, JSON.stringify(solicitudes));
  },

  getDenuncias: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.ADMIN_DENUNCIAS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setDenuncias: (denuncias: any[]) => {
    localStorage.setItem(KEYS.ADMIN_DENUNCIAS, JSON.stringify(denuncias));
  },

  getFoundationMascotas: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.FOUNDATION_MASCOTAS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setFoundationMascotas: (mascotas: any[]) => {
    localStorage.setItem(KEYS.FOUNDATION_MASCOTAS, JSON.stringify(mascotas));
  },

  getFoundationEvidencias: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.FOUNDATION_EVIDENCIAS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setFoundationEvidencias: (evidencias: any[]) => {
    localStorage.setItem(KEYS.FOUNDATION_EVIDENCIAS, JSON.stringify(evidencias));
  },

  getFoundationAdvertencias: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.FOUNDATION_ADVERTENCIAS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setFoundationAdvertencias: (advertencias: any[]) => {
    localStorage.setItem(KEYS.FOUNDATION_ADVERTENCIAS, JSON.stringify(advertencias));
  },

  getNotificaciones: (): any[] => {
    try {
      const data = localStorage.getItem(KEYS.NOTIFICACIONES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setNotificaciones: (notificaciones: any[]) => {
    localStorage.setItem(KEYS.NOTIFICACIONES, JSON.stringify(notificaciones));
  },
};
