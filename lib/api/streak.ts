// lib/api/streak.ts
// Rachas — consulta y reinicio de la racha de sobriedad del usuario.

import { apiRequest } from './client';

/** Devuelve el estado actual de la racha. */
export const getStreak = (): Promise<any> => apiRequest('/streak');

/** Devuelve el historial de eventos de la racha. */
export const getStreakEvents = (): Promise<any> => apiRequest('/streak/events');

/** Reinicia la racha actual (recaída). */
export const resetStreak = (): Promise<any> =>
  apiRequest('/streak/reset', { method: 'POST' });
