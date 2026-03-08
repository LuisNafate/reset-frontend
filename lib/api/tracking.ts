// lib/api/tracking.ts
// Tracking / Bitácora — registros diarios de consumo, craving y estado emocional.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipos de petición ───────────────────────────────────────────────────────

/**
 * Payload para crear un registro diario.
 * cravingLevelLevel y emotionalStateLevel son números directos 1-10,
 * NO son UUIDs de catálogos.
 */
export interface CreateDailyLogPayload {
  consumed: boolean;
  /** Nivel de ansiedad/craving. Rango 1-10. */
  cravingLevelLevel: number;
  /** Nivel de estado emocional. Rango 1-10. */
  emotionalStateLevel: number;
  triggers?: string;
  notes?: string;
}

// ─── Tipos de respuesta ──────────────────────────────────────────────────────

export interface DailyLogResponse {
  id: string;
  userId: string;
  logDate: string;      // 'YYYY-MM-DD'
  consumed: boolean;
  triggers: string;
  notes: string;
  cravingLevel?: { level: number; label: string };
  emotionalState?: { level: number; label: string };
}

export interface TrackingStatisticsResponse {
  user_id: string;
  total_logs: number;
  avg_craving: number;
  avg_emotion: number;
  total_relapses: number;
  day_counter: number;
  streak_status: string;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Crea un nuevo registro diario. */
export const createLog = (data: CreateDailyLogPayload): Promise<DailyLogResponse> =>
  apiRequest<DailyLogResponse>('/tracking/logs', {
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * Obtiene los últimos registros del usuario autenticado.
 * @param page Página (1-based). Default 1.
 * @param limit Cantidad de registros por página. Default 30.
 */
export const getLogs = (limit = 30, page = 1): Promise<DailyLogResponse[]> =>
  apiRequest<DailyLogResponse[]>(`/tracking/logs?page=${page}&limit=${limit}`);

/** Devuelve las estadísticas consolidadas del usuario autenticado. */
export const getStatistics = (): Promise<TrackingStatisticsResponse> =>
  apiRequest<TrackingStatisticsResponse>('/tracking/statistics');

