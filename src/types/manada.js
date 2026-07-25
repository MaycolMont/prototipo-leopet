/**
 * @typedef {Object} ManadaMascota
 * @property {string} id                     // ID de la relación
 * @property {string} mascotaId              // FK a Mascota
 * @property {string} nombre                 // Nombre de la mascota
 * @property {string} refugioNombre          // Atributo virtual para UI (obtenido via JOIN)
 * @property {string} etiqueta               // Atributo virtual UI (ej: "SALUDABLE")
 * @property {number} montoMensual           // Monto aportado en USD
 * @property {string} imagenUrl
 *
 * @typedef {Object} Manada
 * @property {string} id
 * @property {string} nombre                 // Ej: "Mi Primera Manada"
 * @property {ManadaMascota[]} mascotas
 */
