/**
 * @typedef {Object} Usuario
 * @property {string} id                     // Prefijo 'usr-' (UUID en BD)
 * @property {string} nombre                 // Nombres del usuario
 * @property {string} apellido               // Apellidos del usuario
 * @property {string} correo                 // Email (identificador único / login)
 * @property {string} [password]             // Contraseña (solo para envío de formularios)
 * @property {string} [telefono]             // Teléfono celular
 * @property {string} [cedula]               // Identificación / Cédula
 * @property {'donador' | 'fundacion' | 'admin'} rol // Rol asignado
 * @property {string} [fotoUrl]              // Avatar opcional de perfil
 * @property {boolean} estaActivo            // Estado de la cuenta
 */
