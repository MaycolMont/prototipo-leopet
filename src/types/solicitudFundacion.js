/**
 * @typedef {Object} SolicitudFundacion
 * @property {string} id                     // Prefijo 'sol-' (ej: 'sol-01')
 * @property {string} fundacionNombre        // Nombre de la fundación
 * @property {string} ruc                    // RUC (13 dígitos)
 * @property {string} correo                 // Correo de contacto oficial
 * @property {string} representanteLegal     // Nombres completos del representante
 * @property {string} telefono               // Teléfono de contacto
 * @property {string} direccion              // Dirección física
 * @property {string} ubicacion              // Ciudad, País
 * @property {string} fechaSolicitud         // Formato YYYY-MM-DD
 * @property {'Pendiente' | 'Aprobada' | 'Rechazada'} estado
 * @property {string} [motivoRechazo]        // Opcional en caso de rechazo
 * @property {string[]} documentosUrls       // Archivos adjuntos en PDF/imagen (RUC, estatutos)
 */
