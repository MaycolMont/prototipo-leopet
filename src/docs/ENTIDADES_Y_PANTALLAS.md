# RESTRICCIONES DE PANTALLAS Y ENTIDADES

## Reglas Generales

1. **Uso de Entidades:** Usar **ÚNICAMENTE** las propiedades definidas en `src/types/`. No agregar campos inventados.
2. **Persistencia:** Los datos mock son estáticos. Cualquier estado mutado (carrito, calificaciones, suscripciones) se maneja en `localStorage` con las keys definidas en `src/app/lib/storage.ts`.

---

## Entidades

### Fundación (`src/types/fundacion.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | Sí | Identificador único (prefijo `fund-`) |
| `nombre` | string | Sí | Nombre oficial de la fundación |
| `descripcionCorta` | string | Sí | Descripción en una línea |
| `historia` | string | No | Narrativa ampliada de la fundación |
| `ubicacion` | string | Sí | Ciudad, País |
| `logoUrl` | string | Sí | URL o import de imagen del logo |
| `portadaUrl` | string | Sí | URL o import de imagen de portada |
| `estadoSolicitud` | enum | Sí | `'Aprobada'` \| `'Pendiente'` \| `'Rechazada'` |
| `cantidadMascotasCuidado` | number | Sí | Número de mascotas bajo cuidado |

### Mascota (`src/types/mascota.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | Sí | Identificador único (prefijo `masc-`) |
| `nombre` | string | Sí | Nombre de la mascota |
| `raza` | string | Sí | Raza o mixtura |
| `edad` | string | Sí | Edad legible (ej: "3 años") |
| `sexo` | enum | Sí | `'Macho'` \| `'Hembra'` |
| `peso` | string | Sí | Peso con unidad (ej: "9 Kg") |
| `ubicacion` | string | Sí | Ciudad donde se encuentra |
| `fundacionId` | string | Sí | ID de la fundación asociada |
| `estadoSalud` | enum | Sí | `'Saludable'` \| `'En tratamiento'` \| `'Urgente'` |
| `descripcionCorta` | string | Sí | Descripción en una línea |
| `historia` | string | Sí | Narrativa completa de la mascota |
| `estadoSaludDetallado` | array | Sí | Lista de `{ titulo, descripcion }` |
| `imagenUrl` | string | Sí | Imagen principal |
| `galeriaUrls` | string[] | Sí | Imágenes adicionales |
| `categoria` | enum | Sí | `'perro'` \| `'gato'` |

### Manada (`src/types/manada.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | Sí | Identificador único |
| `nombre` | string | Sí | Nombre de la manada |
| `mascotas` | ManadaMascota[] | Sí | Lista de mascotas en la manada |

### ManadaMascota (`src/types/manada.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | Sí | ID de la relación manada-mascota |
| `mascotaId` | string | Sí | ID de la mascota referenciada |
| `nombre` | string | Sí | Nombre de la mascota |
| `refugioNombre` | string | Sí | Nombre del refugio/fundación |
| `etiqueta` | string | Sí | Etiqueta de estado (ej: "SALUDABLE", "ATENCIÓN") |
| `montoMensual` | number | Sí | Monto en USD |
| `categoria` | string | Sí | Tipo de cuidado (ej: "Alimentación Canina") |
| `imagenUrl` | string | Sí | Imagen de la mascota |

### Evidencia (`src/types/evidencia.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | Sí | Identificador único (prefijo `ev-`) |
| `mascotaId` | string | Sí | ID de la mascota asociada |
| `mascotaNombre` | string | Sí | Nombre de la mascota |
| `fundacionNombre` | string | Sí | Nombre de la fundación remitente |
| `tipo` | enum | Sí | `'foto'` \| `'video'` |
| `titulo` | string | Sí | Título de la evidencia |
| `descripcion` | string | Sí | Descripción del contenido |
| `imagenUrl` | string | Sí | URL o import de imagen |
| `fecha` | string | Sí | Fecha en formato `YYYY-MM-DD` |

---

## Pantallas

### `/mascotas` — Catálogo de Mascotas
- **Estado:** IMPLEMENTADA
- Muestra grid de tarjetas con imagen, nombre, raza, edad, fundación y estado de salud.
- Filtros: Todos / Perros / Gatos.
- Búsqueda por nombre o raza.
- Botón "Apadrinar" agrega la mascota al carrito (manada) en `localStorage`.

### `/mascota/:id` — Detalle de Mascota
- **Estado:** IMPLEMENTADA
- Muestra: imagen principal, nombre, raza, edad, sexo, peso, ubicación, fundación.
- Historia narrativa y estado de salud detallado.
- Botón "Apadrinar" agrega al carrito.

### `/fundaciones` — Listado de Fundaciones
- **Estado:** IMPLEMENTADA
- Muestra grid de tarjetas con portada, logo, nombre, ubicación, descripción corta y cantidad de mascot
- **NO IMPLEMENTAR:** Formularios de donación directa, chat interno o métricas avanzadas.

### `/fundaciones/:id` — Detalle de Fundación
- **Estado:** IMPLEMENTADA
- Muestra: nombre, logo, ubicación, descripción corta, historia y lista de mascotas asociadas (filtradas por `fundacionId`).
- Cada mascota tiene botón "Apadrinar" que agrega al carrito.
- **NO IMPLEMENTAR:** Formularios de donación directa, chat interno o métricas avanzadas.

### `/mi-manada/configurar` — Configurador de Manada / Carrito
- **Estado:** IMPLEMENTADA
- Muestra mascotas seleccionadas con sliders para ajustar monto mensual individual.
- Resumen con total mensual.
- Botón "Confirmar Apadrinamiento":
  - Si NO está logueado → Modal de Login/Registro Rápido.
  - Si SÍ está logueado → Botón de Pago PayPal Sandbox.

### `/dashboard` — Dashboard del Padrino
- **Estado:** IMPLEMENTADA
- Resumen: suscripciones activas, mascotas apadrinadas, aporte mensual, manada pendiente.
- Acciones rápidas a Evidencias y Gestión de Manada.

### `/dashboard/evidencias` — Evidencias
- **Estado:** IMPLEMENTADA
- Lista de evidencias con calificación 1-5 estrellas y comentario opcional.
- Botón "Reportar Inconsistencia" con motivos predefinidos.

### `/dashboard/manada` — Gestión de Manada
- **Estado:** IMPLEMENTADA
- Controles para modificar montos, pausar cobros por 30 días o eliminar mascotas.
