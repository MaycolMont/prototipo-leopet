import imgPluto from "../imports/Catalog/7abaafcc2a09d50e0fc877db77c9c704cd360ae6.png";
import imgJasper from "../imports/Manada/05315c921ffb0646b298e09ecd7293761ebbf584.png";
import imgMain from "../imports/DetalleDeMascotaLeoPet/b5e67b3823fbd4287dcd8b82dc791a0d64b1d4a9.png";
import imgFood from "../imports/DetalleDeMascotaLeoPet/9ec279e8e0b77d8a1cef5b76d12950fe70e8b841.png";
import imgPlay from "../imports/DetalleDeMascotaLeoPet/bd95c8085784a9dd890c235868f306b717608099.png";

/**
 * @type {import('../types/fundacion.js').Fundacion[]}
 */
export const MOCK_FUNDACIONES = [
  {
    id: "fund-01",
    nombre: "Huellitas Felices",
    ruc: "1791234567001",
    correo: "contacto@huellitasfelices.org",
    telefono: "0991234567",
    direccion: "Av. 9 de Octubre 1234, Guayaquil",
    ubicacion: "Guayaquil, Ecuador",
    descripcionCorta: "Refugio dedicado al rescate y rehabilitación de animales en situación de calle.",
    historia: "Huellitas Felices nació en 2018 como un esfuerzo comunitario para brindar refugio, alimento y atención veterinaria a animales abandonados. Desde entonces ha rescatado más de 200 mascotas y encontrado hogar para más de 150 de ellas.",
    logoUrl: imgPluto,
    portadaUrl: imgMain,
    estadoSolicitud: "Aprobada",
    cantidadMascotasCuidado: 24,
  },
  {
    id: "fund-02",
    nombre: "Refugio Almas Peludas",
    ruc: "1792345678002",
    correo: "info@almaspeludas.org",
    telefono: "0987654321",
    direccion: "Calle Principal 567, Quito",
    ubicacion: "Quito, Ecuador",
    descripcionCorta: "Especializado en el cuidado de perros con necesidades médicas especiales.",
    historia: "Fundado por un grupo de veterinarios voluntarios, Refugio Almas Peludas se enfoca en la rehabilitación de animales con condiciones de salud que requieren atención continua y tratamientos especializados.",
    logoUrl: imgMain,
    portadaUrl: imgFood,
    estadoSolicitud: "Aprobada",
    cantidadMascotasCuidado: 18,
  },
  {
    id: "fund-03",
    nombre: "Huellitas Sanas",
    ruc: "1793456789003",
    correo: "admin@huellitassanas.org",
    telefono: "0971122334",
    direccion: "Av. Solano 890, Cuenca",
    ubicacion: "Cuenca, Ecuador",
    descripcionCorta: "Centro de rescate felino con énfasis en esterilización y adopción responsable.",
    logoUrl: imgJasper,
    portadaUrl: imgPlay,
    estadoSolicitud: "Aprobada",
    cantidadMascotasCuidado: 31,
  },
];
