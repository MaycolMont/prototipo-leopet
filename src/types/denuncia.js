/**
 * @typedef {Object} Denuncia
 * @property {number} id                     // PK auto-increment
 * @property {string} motivo                 // Motivo de la denuncia
 * @property {'pendiente' | 'notificada' | 'resuelta'} estado  // Default 'pendiente'
 * @property {string} fecha                  // Fecha de la denuncia
 * @property {number} usuarioId              // FK -> usuario.id
 * @property {number} fundacionId            // FK -> fundacion.id
 * @property {string} [createdAt]            // Fecha de creación
 * @property {string} [updatedAt]            // Fecha de actualización
 */
