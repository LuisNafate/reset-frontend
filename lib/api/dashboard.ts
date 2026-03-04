// lib/api/dashboard.ts
// Progreso del usuario — racha y estadísticas.

import { apiRequest } from './client';
import type { UserProgress } from '@/types';

/** Devuelve el progreso de sobriedad del usuario autenticado.
 * La API puede devolver soberDays (tracking/statistics) o currentStreak (streak).
 */
export async function getProgress(): Promise<UserProgress> {
  // Intentar /streak primero; si devuelve null, usar /tracking/statistics
  const res: any = await apiRequest('/streak');
  const streakData = res?.data;

  let days = 0;
  if (streakData && typeof streakData === 'object') {
    days = streakData.currentStreak ?? streakData.soberDays ?? streakData.streak ?? 0;
  }

  if (days === 0) {
    try {
      const stats: any = await apiRequest('/tracking/statistics');
      const sd = stats?.data ?? stats;
      days = sd?.soberDays ?? sd?.currentStreak ?? 0;
    } catch { /* ignorar */ }
  }

  return {
    sobrietyDays: days,
    plantStage: getStageName(days),
    consecutiveDays: days,
    lastNote: streakData?.lastNote,
    nextMilestone: streakData?.nextMilestone,
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
