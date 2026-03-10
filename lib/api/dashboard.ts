// lib/api/dashboard.ts
// Progreso del usuario — racha activa y estadísticas.

import { getStreak } from './streak';
import type { UserProgress } from '@/types';

/** Devuelve el progreso de sobriedad del usuario autenticado.
 * Usa GET /streak → currentStreak como fuente principal del contador de días.
 */
export async function getProgress(): Promise<UserProgress> {
  const streak = await getStreak();
  const days = streak?.currentStreak ?? 0;

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

