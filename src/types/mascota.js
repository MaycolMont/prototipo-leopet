/**
 * @typedef {Object} Mascota
 * @property {number} id                     // PK auto-increment (INT)
 * @property {string} nombre                 // VARCHAR(191)
 * @property {'NO_APADRINADO' | 'APADRINADO' | 'EN_PROCESO' | 'ADOPTADO'} status // Estado de apadrinamiento
 * @property {string} especie                // VARCHAR(191) — Perro, Gato, etc.
 * @property {string} [raza]                 // VARCHAR(191) nullable
 * @property {string} descripcion            // VARCHAR(200) — descripción detallada
 * @property {string} imagen                 // VARCHAR(500) — URL de imagen principal
 * @property {string[]} [galeria]            // JSON — Array de URLs de fotos adicionales
 * @property {string} fundacionId            // FK a la fundación propietaria
 * @property {boolean} [visible]             // TINYINT(1) — 1=Visible, 0=Oculto (default=1)
 * @property {string} [createdAt]            // DATETIME — Fecha de creación
 * @property {string} [updatedAt]            // DATETIME — Fecha de actualización
 * @property {number} [edad]                 // INT — Edad en años
 * @property {number} [peso]                 // DECIMAL(10,0) — Peso en kg
 * @property {'Macho' | 'Hembra'} [sexo]     // Sexo del animal
 * @property {boolean | null} [esterilizacion]  // TINYINT — 1=Esterilizado, 0=No, NULL=Desconocido
 * @property {boolean | null} [vacunacion]      // TINYINT — 1=Vacunado, 0=No
 * @property {boolean | null} [desparasitacion] // TINYINT — 1=Desparasitado, 0=No
 * @property {string} [enfermedades]         // VARCHAR(45) — Enfermedades conocidas
 * @property {string} [fechaRegistro]        // Fecha de registro en el sistema
 * @property {string} [fechaRescate]         // Fecha de rescate del animal
 * @property {string} [historia]             // Virtual UI — narrativa ampliada (no está en BD)
 * @property {string} [ubicacion]            // Virtual UI — ciudad (no está en BD)
 */
