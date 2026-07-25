export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  foundation: string;
  foundationId: string;
  status: string;
  description: string;
  story: string;
  healthStatus: { title: string; desc: string }[];
  image: any;
  galleryImages: any[];
  location: string;
  sex: string;
  weight: string;
  category: "perro" | "gato";
}

export interface ManadaPet {
  id: string;
  petId: string;
  name: string;
  rescueName: string;
  tag: string;
  monthlyAmount: number;
  category: string;
  image: any;
}

export interface Manada {
  id: string;
  name: string;
  pets: ManadaPet[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Subscription {
  id: string;
  userId: string;
  manadaId: string;
  pets: { petId: string; name: string; monthlyAmount: number; image: any }[];
  totalMonthly: number;
  status: "active" | "paused";
  pausedUntil?: string;
  createdAt: string;
}

export interface Evidence {
  id: string;
  petId: string;
  petName: string;
  foundationName: string;
  type: "photo" | "video";
  title: string;
  description: string;
  imageUrl: any;
  date: string;
  rating?: number;
  comment?: string;
  reported?: boolean;
  reportReason?: string;
}
