/**
 * @typedef {Object} Evidencia
 * @property {string} id                     // Prefijo 'ev-'
 * @property {string} mascotaId              // FK a Mascota
 * @property {string} mascotaNombre          // Nombre de la mascota
 * @property {string} fundacionId            // FK a Fundación remitente
 * @property {string} fundacionNombre        // Nombre de la fundación
 * @property {'foto' | 'video'} tipo
 * @property {string} titulo                 // Título del avance
 * @property {string} descripcion            // Detalle del estado/progreso del animal
 * @property {string} imagenUrl              // URL o vista previa del archivo subido
 * @property {string} fecha                  // Formato YYYY-MM-DD
 * @property {number} [calificacion]         // Opcional (1-5 estrellas)
 * @property {number} [calificacionPromedio] // Atributo virtual UI (1-5 estrellas)
 * @property {string} [comentario]           // Opcional
 * @property {'publicada' | 'en_revision'} [estado] // Para reportes
 */
