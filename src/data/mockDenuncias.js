/**
 * @type {import('../types/denuncia.js').Denuncia[]}
 */
export const MOCK_DENUNCIAS = [
  {
    id: 1,
    motivo: "Foto duplicada — La evidencia enviada el 2026-07-18 muestra exactamente la misma imagen que la del reporte anterior. No se evidencia un avance real en el cuidado de Pluto.",
    estado: "pendiente",
    fecha: "2026-07-19T10:30:00",
    usuarioId: 10,
    fundacionId: 1,
    createdAt: "2026-07-19T10:30:00",
    updatedAt: "2026-07-19T10:30:00",
  },
  {
    id: 2,
    motivo: "Incoherencia en uso de fondos — Llevo 4 meses apadrinando a Luna y nunca he recibido un reporte con video. Solo fotos genéricas que no muestran a mi mascota.",
    estado: "notificada",
    fecha: "2026-07-15T14:15:00",
    usuarioId: 15,
    fundacionId: 2,
    createdAt: "2026-07-15T14:15:00",
    updatedAt: "2026-07-16T09:00:00",
  },
  {
    id: 3,
    motivo: "Evidencia de mala calidad — Las fotos son de muy baja resolución y no permiten verificar el estado de Toby. Solicito mejora o un video.",
    estado: "resuelta",
    fecha: "2026-07-12T08:45:00",
    usuarioId: 20,
    fundacionId: 3,
    createdAt: "2026-07-12T08:45:00",
    updatedAt: "2026-07-14T16:20:00",
  },
  {
    id: 4,
    motivo: "No corresponde a la mascota — La foto enviada como evidencia de Rex no coincide con la foto de perfil de la mascota en el catálogo.",
    estado: "notificada",
    fecha: "2026-07-08T11:00:00",
    usuarioId: 25,
    fundacionId: 1,
    createdAt: "2026-07-08T11:00:00",
    updatedAt: "2026-07-09T10:00:00",
  },
];
