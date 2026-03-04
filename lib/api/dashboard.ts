// lib/api/dashboard.ts
// Progreso del usuario — racha y estadísticas.

import { apiRequest } from './client';
import type { UserProgress } from '@/types';

/** Devuelve el progreso de sobriedad del usuario autenticado. */
export async function getProgress(): Promise<UserProgress> {
  const res: any = await apiRequest('/streak');
  const data = res?.data ?? res;
  return {
    sobrietyDays: data?.currentStreak ?? 0,
    plantStage: getStageName(data?.currentStreak ?? 0),
    consecutiveDays: data?.currentStreak ?? 0,
    lastNote: data?.lastNote,
    nextMilestone: data?.nextMilestone,
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
