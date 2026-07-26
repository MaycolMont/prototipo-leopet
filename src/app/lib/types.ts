export interface Pet {
  id: number;
  nombre: string;
  status: "NO_APADRINADO" | "APADRINADO" | "EN_PROCESO" | "ADOPTADO";
  especie: string;
  raza?: string;
  descripcion: string;
  imagen: string;
  galeria?: string[];
  fundacionId: string;
  fundacionNombre?: string;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  edad?: number;
  peso?: number;
  sexo?: "Macho" | "Hembra";
  esterilizacion?: boolean | null;
  vacunacion?: boolean | null;
  desparasitacion?: boolean | null;
  enfermedades?: string;
  fechaRegistro?: string;
  fechaRescate?: string;
  historia?: string;
  ubicacion?: string;
}

export interface ManadaAnimal {
  id: string;
  manadaId: string;
  animalId: string;
  montoMensual: number;
  nombre?: string;
  refugioNombre?: string;
  etiqueta?: string;
  imagenUrl?: any;
}

export interface Manada {
  id: string;
  nombre: string;
  monto: number;
  userId: string;
  status: boolean;
  statusSubscription: boolean;
  mascotas: ManadaAnimal[];
  galeriamanada?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  cedula?: string;
  rol: "donador" | "fundacion" | "admin";
  estaActivo: boolean;
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
