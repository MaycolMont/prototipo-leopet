/**
 * @typedef {Object} Padrino
 * @property {string} id                     // Prefijo 'pad-'
 * @property {string} donadorId              // FK a Usuario donador
 * @property {string} donadorNombre          // Nombre completo del donador
 * @property {string} donadorCorreo          // Email del donador
 * @property {string} mascotaId              // FK a Mascota apadrinada
 * @property {string} mascotaNombre          // Nombre de la mascota
 * @property {string} fundacionId            // FK a la fundación
 * @property {string} fundacionNombre        // Nombre de la fundación
 * @property {number} montoMensual           // Aporte mensual en USD
 * @property {'activo' | 'pausado'} estado   // Estado de la suscripción
 * @property {string} fechaInicio            // YYYY-MM-DD
 */

/**
 * @type {Padrino[]}
 */
export const MOCK_PADRINOS = [
  {
    id: "pad-01",
    donadorId: "usr-010",
    donadorNombre: "Pedro José Lara Mena",
    donadorCorreo: "pedro.lara@email.com",
    mascotaId: "masc-01",
    mascotaNombre: "Pluto",
    fundacionId: "fund-01",
    fundacionNombre: "Huellitas Felices",
    montoMensual: 25,
    estado: "activo",
    fechaInicio: "2026-03-15",
  },
  {
    id: "pad-02",
    donadorId: "usr-015",
    donadorNombre: "Daniela Estefanía Castillo Ríos",
    donadorCorreo: "daniela.castillo@email.com",
    mascotaId: "masc-02",
    mascotaNombre: "Luna",
    fundacionId: "fund-02",
    fundacionNombre: "Refugio Almas Peludas",
    montoMensual: 20,
    estado: "activo",
    fechaInicio: "2026-04-01",
  },
  {
    id: "pad-03",
    donadorId: "usr-020",
    donadorNombre: "Andrea Carolina Ponce Salazar",
    donadorCorreo: "andrea.ponce@email.com",
    mascotaId: "masc-03",
    mascotaNombre: "Toby",
    fundacionId: "fund-03",
    fundacionNombre: "Huellitas Sanas",
    montoMensual: 30,
    estado: "activo",
    fechaInicio: "2026-02-10",
  },
  {
    id: "pad-04",
    donadorId: "usr-025",
    donadorNombre: "Luis Miguel Espinoza Cárdenas",
    donadorCorreo: "luis.espinoza@email.com",
    mascotaId: "masc-05",
    mascotaNombre: "Rex",
    fundacionId: "fund-02",
    fundacionNombre: "Refugio Almas Peludas",
    montoMensual: 35,
    estado: "activo",
    fechaInicio: "2026-01-20",
  },
  {
    id: "pad-05",
    donadorId: "usr-030",
    donadorNombre: "María Fernanda López Bravo",
    donadorCorreo: "maria.lopez@email.com",
    mascotaId: "masc-04",
    mascotaNombre: "Michi",
    fundacionId: "fund-01",
    fundacionNombre: "Huellitas Felices",
    montoMensual: 15,
    estado: "activo",
    fechaInicio: "2026-05-05",
  },
  {
    id: "pad-06",
    donadorId: "usr-035",
    donadorNombre: "Carlos Andrés Mejía Vera",
    donadorCorreo: "carlos.mejia@email.com",
    mascotaId: "masc-06",
    mascotaNombre: "Nina",
    fundacionId: "fund-03",
    fundacionNombre: "Huellitas Sanas",
    montoMensual: 20,
    estado: "pausado",
    fechaInicio: "2026-03-01",
  },
];
