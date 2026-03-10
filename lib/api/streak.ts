// lib/api/streak.ts
// Rachas — consulta de la racha activa del usuario autenticado.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipo de respuesta ────────────────────────────────────────────────────────

export interface StreakResponse {
  /** Días consecutivos de sobriedad según el backend (streak.dayCounter en DB). */
  currentStreak: number;
  status: string;        // "ACTIVE" | "BROKEN"
  startedAt: string;    // ISO date — cuando arrancó la racha actual
  /**
   * Fecha del último reporte diario del usuario (daily_log.log_date).
   * NO es updated_at (cuándo el sistema modificó la racha).
   * Usar este campo para mostrar "última actividad" o validar continuidad.
   */
  lastLogDate: string;
  totalDaysAchievedHistorical?: number;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Devuelve la racha activa del usuario autenticado. */
export const getStreak = (): Promise<StreakResponse> =>
  apiRequest<StreakResponse>('/streak');

