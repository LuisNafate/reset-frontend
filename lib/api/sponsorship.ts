// lib/api/sponsorship.ts
// Apadrinamiento — todos los endpoints documentados en la API v1.

import { apiRequest } from './client';

// ─── Tipos de respuesta ──────────────────────────────────────────────────────

export interface SponsorshipItem {
  id: string;
  sponsorId: string;
  addictId: string;
  status: 'PENDING' | 'ACTIVE' | 'TERMINATED';
  createdAt: string;
}

export interface RequestSponsorshipResponse {
  message: string;
  sponsorship: SponsorshipItem;
}

export interface GodchildProfileResponse {
  godchild: {
    id: string;
    name: string;
    role: string;
    createdAt: string;
    addiction: {
      custom_name: string;
      classification: string;
      is_active: boolean;
      registered_at: string;
    } | null;
  };
  sponsorship: {
    id: string;
    startedAt: string;
    status: 'ACTIVE';
  };
  statistics: {
    dayCounter: number;
    averageCraving: number;
    averageEmotionalState: number;
    streakStatus: string;
    totalRelapses: number;
  };
  recentLogs: Array<{
    logDate: string;
    consumed: boolean;
    cravingLevel: { level: number; label: string };
    emotionalState: { level: number; label: string };
    triggers: string;
    notes: string;
  }>;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/**
 * Solicita apadrinamiento usando el código de 8 caracteres del padrino.
 * Solo disponible para usuarios con role ADICTO.
 */
export const requestSponsorship = (
  sponsorCode: string
): Promise<RequestSponsorshipResponse> =>
  apiRequest<RequestSponsorshipResponse>('/sponsorships/request', {
    method: 'POST',
    body: JSON.stringify({ sponsor_code: sponsorCode }),
  });

/**
 * Acepta la solicitud de apadrinamiento pendiente.
 * El backend resuelve el sponsorship a partir del token JWT.
 * Solo disponible para usuarios con role PADRINO.
 */
export const acceptSponsorship = (): Promise<{ message: string }> =>
  apiRequest<{ message: string }>('/sponsorships/accept', {
    method: 'PATCH',
    body: JSON.stringify({}),
  });

/**
 * Rechaza la solicitud de apadrinamiento pendiente.
 * Solo disponible para usuarios con role PADRINO.
 */
export const rejectSponsorship = (): Promise<{ message: string }> =>
  apiRequest<{ message: string }>('/sponsorships/reject', {
    method: 'PATCH',
    body: JSON.stringify({}),
  });

/**
 * Termina una relación de apadrinamiento activa.
 * @param id UUID del sponsorship a terminar.
 * @param reason Motivo opcional de la terminación.
 */
export const terminateSponsorship = (
  id: string,
  reason?: string
): Promise<{ message: string }> =>
  apiRequest<{ message: string }>(`/sponsorships/${id}/terminate`, {
    method: 'PATCH',
    body: JSON.stringify({ ...(reason ? { reason } : {}) }),
  });

/**
 * Obtiene el perfil completo del ahijado con estadísticas y logs recientes.
 * Solo disponible para usuarios con role PADRINO con sponsorship ACTIVE.
 */
export const getGodchildProfile = (): Promise<GodchildProfileResponse> =>
  apiRequest<GodchildProfileResponse>('/sponsorships/godchild/profile');

