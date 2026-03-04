// lib/api/tracking.ts
// Tracking / Bitácora — registros diarios de consumo, craving y estado emocional.

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface DailyLog {
  log_date: string;      // 'YYYY-MM-DD'
  consumed: boolean;     // ¿consumió hoy?
  craving_level: number; // 1-10
  emotional_state: number; // 1-10
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Crea un nuevo registro diario. */
export const createLog = (data: DailyLog) =>
  apiRequest('/tracking/logs', {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Obtiene los últimos `limit` registros. Si se pasa `userId`, filtra por usuario. */
export const getLogs = (limit = 30, userId?: string): Promise<any> => {
  const q = new URLSearchParams({ limit: String(limit) });
  if (userId) q.set('userId', userId);
  return apiRequest(`/tracking/logs?${q}`);
};

/** Devuelve las estadísticas generales del usuario (o del ahijado indicado). */
export const getStatistics = (userId?: string): Promise<any> => {
  const q = userId ? `?userId=${userId}` : '';
  return apiRequest(`/tracking/statistics${q}`);
};
