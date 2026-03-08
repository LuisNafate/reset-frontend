// lib/api/dashboard.ts
// Progreso del usuario — racha activa y estadísticas.

import { apiRequest } from './client';
import { getStreak } from './streak';
import { getStatistics } from './tracking';
import type { UserProgress } from '@/types';

/** Devuelve el progreso de sobriedad del usuario autenticado.
 * Combina /streak (dayCounter) con /tracking/statistics como fallback.
 */
export async function getProgress(): Promise<UserProgress> {
  let days = 0;

  try {
    const streak = await getStreak();
    // La API devuelve dayCounter (camelCase), no day_counter
    days = streak?.dayCounter ?? 0;
  } catch {
    // Si el streak falla (ej: no hay racha activa), caer a estadísticas
    try {
      const stats = await getStatistics();
      days = stats?.day_counter ?? 0;
    } catch { /* seguir con 0 */ }
  }

  return {
    sobrietyDays: days,
    plantStage: getStageName(days),
    consecutiveDays: days,
  };
}

function getStageName(
  days: number
): UserProgress['plantStage'] {
  if (days >= 365) return 'Ciprés';
  if (days >= 180) return 'Árbol';
  if (days >= 90) return 'Planta';
  if (days >= 30) return 'Brote';
  return 'Semilla';
}

