/**
 * @typedef {Object} Notificacion
 * @property {number} id                     // PK auto-increment
 * @property {number} [actualizacion_id]     // FK -> actualizacion_animal.id
 * @property {number} usuario_id             // FK -> usuario.id (destinatario)
 * @property {number} fundacion_id           // FK -> fundacion.id
 * @property {number} animal_id              // FK -> animal.id
 * @property {string} [createdAt]            // Fecha de creación
 * @property {string} [updatedAt]            // Fecha de actualización
 * @property {boolean} visible               // 1=Visible, 0=Borrada
 * @property {boolean} leido                 // 1=Leído, 0=No leído
 * @property {string} [fecha_leido]          // Fecha cuando se leyó
 * @property {number} [calificacion]         // Calificación dada por usuario (1-5)
 * @property {string} [fecha_calificacion]   // Fecha de la calificación
 * @property {boolean} es_alerta_salud       // 1=Es alerta de salud
 * @property {string} [descripcion_alerta]   // Descripción de la alerta
 * @property {string} [mensaje]              // Mensaje personalizado
 * @property {boolean} es_admin_mensaje      // 1=Mensaje de admin
 */
