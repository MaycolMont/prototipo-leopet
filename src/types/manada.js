/**
 * @typedef {Object} ManadaAnimal
 * @property {string} id                     // ID de la relación (manada_animal)
 * @property {string} manadaId               // FK -> manada.id
 * @property {string} animalId               // FK -> mascota.id
 * @property {number} montoMensual           // Monto aportado en USD
 * @property {string} [nombre]               // Nombre de la mascota (virtual, via JOIN)
 * @property {string} [refugioNombre]        // Nombre de la fundación (virtual, via JOIN)
 * @property {string} [etiqueta]             // Etiqueta virtual UI (ej: "SALUDABLE")
 * @property {string} [imagenUrl]            // URL de imagen (virtual, via JOIN)
 *
 * @typedef {Object} Manada
 * @property {number} id                     // PK auto-increment
 * @property {string} nombre                 // Nombre de la manada (ej: "Mi Primera Manada")
 * @property {number} monto                  // Monto mensual total de la suscripción
 * @property {number} userId                 // FK -> usuario.id
 * @property {boolean} status                // 1=Activo, 0=Inactivo (default=1)
 * @property {boolean} statusSubscription    // 1=Activo, 0=Inactivo (default=0)
 * @property {string} [productId]            // ID del producto PayPal
 * @property {Object} [responseProduct]      // Response JSON del producto PayPal
 * @property {string} [planId]               // ID del plan de suscripción PayPal
 * @property {Object} [responsePlan]         // Response JSON del plan PayPal
 * @property {string} [subscriptionId]       // ID de la suscripción PayPal
 * @property {Object} [responseSubscription] // Response JSON de suscripción PayPal
 * @property {string} [createdAt]            // Fecha de creación
 * @property {string} [updatedAt]            // Fecha de actualización
 * @property {string[]} [galeriamanada]      // Galería de fotos de la manada
 * @property {ManadaAnimal[]} [mascotas]     // Mascotas asociadas (via manada_animal)
 */
