/**
 * @typedef {Object} Fundacion
 * @property {string} id                     // Prefijo 'fund-'
 * @property {string} nombre                 // Nombre oficial de la fundación
 * @property {string} ruc                    // RUC (13 dígitos) - Requerido en BD
 * @property {string} correo                 // Correo de contacto/auth - Requerido en BD
 * @property {string} telefono               // Teléfono de contacto - Requerido en BD
 * @property {string} direccion              // Dirección física - Requerido en BD
 * @property {string} ubicacion              // Ciudad, País (para UI)
 * @property {string} descripcionCorta       // Resumen para tarjetas
 * @property {string} [historia]             // Narrativa ampliada
 * @property {string} logoUrl                // URL/import del logo
 * @property {string} portadaUrl             // URL/import de portada
 * @property {'Aprobada' | 'Pendiente' | 'Rechazada'} estadoSolicitud
 * @property {number} cantidadMascotasCuidado
 */
