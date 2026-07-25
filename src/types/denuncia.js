/**
 * @typedef {Object} Denuncia
 * @property {string} id                     // Prefijo 'den-' (ej: 'den-01')
 * @property {string} fundacionId            // FK a la Fundación reportada
 * @property {string} fundacionNombre        // Nombre de la Fundación
 * @property {string} donadorId              // ID del usuario donador que reporta
 * @property {string} donadorNombre          // Nombre del donador
 * @property {string} motivo                 // Ej: "Foto falsa", "Evidencia de mala calidad", "Incoherencia en uso de fondos"
 * @property {string} descripcion            // Explicación detallada del reporte
 * @property {string[]} [pruebasUrls]        // Capturas o imágenes de respaldo
 * @property {string} fecha                  // Formato YYYY-MM-DD
 * @property {'pendiente' | 'investigando' | 'resuelta' | 'rechazada'} estado
 * @property {string} [resolucionAdmin]     // Comentario final del administrador
 */
