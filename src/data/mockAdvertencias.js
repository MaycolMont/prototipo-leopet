/**
 * @type {import('../types/advertencia.js').Advertencia[]}
 */
export const MOCK_ADVERTENCIAS = [
  {
    id: "adv-01",
    fundacionId: "fund-01",
    fundacionNombre: "Huellitas Felices",
    denunciaId: "den-01",
    evidenciaId: "ev-01",
    motivo: "Evidencia borrosa",
    mensajeAdmin: "La imagen enviada como evidencia de Pluto no cumple con la calidad mínima requerida. Por favor, suba una foto clara que permita verificar el estado real de la mascota.",
    fecha: "2026-07-20",
    estado: "pendiente",
  },
  {
    id: "adv-02",
    fundacionId: "fund-02",
    fundacionNombre: "Refugio Almas Peludas",
    denunciaId: "den-02",
    evidenciaId: "ev-03",
    motivo: "Inconsistencia en frecuencia de envío",
    mensajeAdmin: "El donador reporta que no ha recibido evidencias mensuales como se comprometió la fundación. Favor regularizar el envío de reportes de seguimiento.",
    fecha: "2026-07-16",
    estado: "pendiente",
  },
  {
    id: "adv-03",
    fundacionId: "fund-03",
    fundacionNombre: "Huellitas Sanas",
    denunciaId: "den-03",
    evidenciaId: "ev-04",
    motivo: "Evidencia de mala calidad",
    mensajeAdmin: "Las fotos enviadas son de baja resolución. Se requiere que las evidencias permitan verificar claramente el estado de la mascota. Suba fotos de mayor calidad.",
    fecha: "2026-07-13",
    estado: "atendida",
    respuestaFundacion: "Se han actualizado las cámaras del refugio. Las próximas evidencias serán de mayor resolución. Adjuntamos nueva foto de Toby con mejor calidad.",
    fechaRespuesta: "2026-07-15",
  },
];
