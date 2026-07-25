/**
 * @typedef {Object} Evidencia
 * @property {string} id
 * @property {string} mascotaId
 * @property {string} mascotaNombre
 * @property {string} fundacionNombre
 * @property {'foto' | 'video'} tipo
 * @property {string} titulo
 * @property {string} descripcion
 * @property {string} imagenUrl
 * @property {string} fecha
 */

/**
 * @typedef {Object} CalificacionEvidencia
 * @property {string} evidenciaId
 * @property {number} calificacion
 * @property {string} [comentario]
 */

/**
 * @typedef {Object} ReporteEvidencia
 * @property {string} evidenciaId
 * @property {string} motivo
 * @property {'pendiente' | 'en_revision' | 'resuelto'} estado
 * @property {string} fechaReporte
 */
