// lib/api/tracking.ts
// Tracking / Bitácora — registros diarios de consumo, craving y estado emocional.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipos de petición ───────────────────────────────────────────────────────

/**
 * Payload para crear un registro diario.
 * Los niveles son números directos 1-10, NO son UUIDs de catálogos.
 * El backend usa snake_case para los campos del DTO de entrada.
 */
export interface CreateDailyLogPayload {
  consumed: boolean;
  /** Nivel de ansiedad/craving. Rango 1-10. */
  craving_level: number;
  /** Nivel de estado emocional. Rango 1-10. */
  emotional_state: number;
  /** Fecha del registro en formato YYYY-MM-DD. Por defecto: hoy. */
  log_date?: string;
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
  userId?: string;
  totalLogs?: number;
  avgCraving?: number;
  avgEmotion?: number;
  totalRelapses?: number;
  /** Días de sobriedad consecutivos según el backend. */
  dayCounter: number;
  streakStatus?: string;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Crea un nuevo registro diario. */
export const createLog = (data: CreateDailyLogPayload): Promise<DailyLogResponse> =>
  apiRequest<DailyLogResponse>('/tracking/logs', {
    method: 'POST',
    body: JSON.stringify({
      consumed: data.consumed,
      craving_level: data.craving_level,
      emotional_state: data.emotional_state,
      log_date: data.log_date ?? new Date().toISOString().split('T')[0],
      ...(data.triggers ? { triggers: data.triggers } : {}),
      ...(data.notes ? { notes: data.notes } : {}),
    }),
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

