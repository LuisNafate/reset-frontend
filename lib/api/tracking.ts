// lib/api/tracking.ts
// Tracking / Bitácora — registros diarios de consumo, craving y estado emocional.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

export interface TrackingLogFilters {
  year?: number;
  month?: number;
  day?: number;
  from?: string;
  to?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

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
  logDate: string;
  consumed: boolean;
  triggers?: string;
  notes?: string;
  cravingLevel?: { level: number; label: string };
  emotionalState?: { level: number; label: string };
  cravingLevelId?: string;
  emotionalStateId?: string;
  createdAt?: string;
  log_date?: string;
  created_at?: string;
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

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') return;
  params.set(key, String(value));
}

function buildLogsPath(filters: TrackingLogFilters = {}): string {
  const params = new URLSearchParams();

  appendParam(params, 'year', filters.year);
  appendParam(params, 'month', filters.month);
  appendParam(params, 'day', filters.day);
  appendParam(params, 'from', filters.from);
  appendParam(params, 'to', filters.to);
  appendParam(params, 'userId', filters.userId);
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);

  const query = params.toString();
  return query ? `/tracking/logs?${query}` : '/tracking/logs';
}

/**
 * Obtiene los últimos registros del usuario autenticado.
 */
export function getLogs(limit?: number, page?: number): Promise<DailyLogResponse[]>;
export function getLogs(filters?: TrackingLogFilters): Promise<DailyLogResponse[]>;
export function getLogs(
  arg1: number | TrackingLogFilters = 30,
  arg2 = 1
): Promise<DailyLogResponse[]> {
  if (typeof arg1 === 'number') {
    return apiRequest<DailyLogResponse[]>(buildLogsPath({ limit: arg1, page: arg2 }));
  }

  return apiRequest<DailyLogResponse[]>(buildLogsPath(arg1));
}

/** Devuelve las estadísticas consolidadas del usuario autenticado. */
export const getStatistics = (): Promise<TrackingStatisticsResponse> =>
  apiRequest<TrackingStatisticsResponse>('/tracking/statistics');

