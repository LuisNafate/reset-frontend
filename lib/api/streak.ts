// lib/api/streak.ts
// Rachas — consulta de la racha activa del usuario autenticado.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipo de respuesta ────────────────────────────────────────────────────────

export interface StreakResponse {
  id: string;
  status: string;       // "ACTIVE" | "BROKEN"
  dayCounter: number;   // Días consecutivos limpios
  startedAt: string;    // ISO date
  lastLogDate: string;  // ISO date
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Devuelve la racha activa del usuario autenticado. */
export const getStreak = (): Promise<StreakResponse> =>
  apiRequest<StreakResponse>('/streak');

