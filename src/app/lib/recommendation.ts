import type { Pet } from "./types";

/**
 * Algoritmo de recomendación y scoring de mascotas.
 *
 * Calcula un puntaje de 0 a 100 basado en 5 factores:
 *  1. Urgencia de apadrinamiento (0-35 pts)
 *  2. Vulnerabilidad de salud   (0-25 pts)
 *  3. Tiempo de espera          (0-25 pts)
 *  4. Bonificación por juventud (0-10 pts)
 *  5. Frescura de registro      (0-5 pts)
 *
 * Solo mascotas `visible === true` y `status !== "ADOPTADO"` se muestran en el catálogo principal.
 */

const TODAY = new Date("2026-07-25");

function daysBetween(dateStr: string): number {
  const d = new Date(dateStr);
  return Math.max(0, Math.floor((TODAY.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)));
}

// ── Factor 1: Urgencia de apadrinamiento (0–35) ────────────────────────────
function urgencyScore(pet: Pet): number {
  switch (pet.status) {
    case "NO_APADRINADO": return 35;
    case "EN_PROCESO":    return 20;
    case "APADRINADO":    return 5;
    case "ADOPTADO":      return 0;
    default:              return 0;
  }
}

// ── Factor 2: Vulnerabilidad de salud (0–25) ───────────────────────────────
function healthScore(pet: Pet): number {
  let score = 0;
  if (pet.enfermedades)                    score += 10;
  if (pet.esterilizacion === false)        score += 5;
  if (pet.vacunacion === false)            score += 5;
  if (pet.desparasitacion === false)       score += 5;
  return Math.min(score, 25);
}

// ── Factor 3: Tiempo de espera en el refugio (0–25) ────────────────────────
function waitingScore(pet: Pet): number {
  const ref = pet.fechaRescate || pet.fechaRegistro;
  if (!ref) return 0;
  const days = daysBetween(ref);
  // Lineal: 0 días = 0 pts, 90+ días = 25 pts
  return Math.min(Math.round((days / 90) * 25), 25);
}

// ── Factor 4: Bonificación por juventud (0–10) ─────────────────────────────
function youthScore(pet: Pet): number {
  if (pet.edad === undefined) return 0;
  if (pet.edad === 0) return 10;   // cachorro/gatito
  if (pet.edad === 1) return 7;
  if (pet.edad === 2) return 4;
  return 0;
}

// ── Factor 5: Frescura del registro (0–5) ──────────────────────────────────
function freshnessScore(pet: Pet): number {
  if (!pet.fechaRegistro) return 0;
  const days = daysBetween(pet.fechaRegistro);
  if (days <= 15)  return 5;   // registrado en los últimos 15 días
  if (days <= 30)  return 3;
  if (days <= 60)  return 1;
  return 0;
}

// ── Score total (0–100) ─────────────────────────────────────────────────────
export function computeScore(pet: Pet): number {
  return (
    urgencyScore(pet) +
    healthScore(pet) +
    waitingScore(pet) +
    youthScore(pet) +
    freshnessScore(pet)
  );
}

export interface ScoredPet extends Pet {
  score: number;
}

/** Retorna las mascotas elegibles rankeadas por score descendente. */
export function rankPets(pets: Pet[]): ScoredPet[] {
  return pets
    .filter((p) => p.visible !== false && p.status !== "ADOPTADO")
    .map((p) => ({ ...p, score: computeScore(p) }))
    .sort((a, b) => b.score - a.score);
}

/** Retorna las top-N mascotas destacadas (para landing page). */
export function topFeatured(pets: Pet[], count: number = 3): ScoredPet[] {
  return rankPets(pets).slice(0, count);
}

/** Indicador de prioridad — solo distingue "necesita apoyo" vs normal. */
export function isHighPriority(score: number): boolean {
  return score >= 60;
}
