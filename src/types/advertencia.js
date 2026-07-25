/**
 * @typedef {Object} Advertencia
 * @property {string} id                     // Prefijo 'adv-'
 * @property {string} fundacionId            // FK a la Fundación
 * @property {string} fundacionNombre        // Nombre de la fundación
 * @property {string} denunciaId             // FK a la denuncia que originó la alerta
 * @property {string} motivo                 // Ej: "Evidencia borrosa", "Inconsistencia"
 * @property {string} mensajeAdmin           // Indicaciones del Admin
 * @property {string} evidenciaId            // FK a la evidencia cuestionada
 * @property {string} fecha                  // YYYY-MM-DD
 * @property {'pendiente' | 'atendida'} estado
 * @property {string} [respuestaFundacion]   // Respuesta de la fundación
 * @property {string} [fechaRespuesta]       // Fecha de la respuesta
 */
