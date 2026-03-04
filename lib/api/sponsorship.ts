// lib/api/sponsorship.ts
// Apadrinamiento — asignación y terminación de tutorías entre padrino y ahijado.

import { apiRequest } from './client';

/** Asigna un padrino a un ahijado. */
export const assignSponsor = (
  sponsorId: string,
  addictId: string
): Promise<any> =>
  apiRequest('/sponsorships/assign', {
    method: 'POST',
    body: JSON.stringify({ sponsorId, addictId }),
  });

/** Termina una relación de patrocinio indicando la razón. */
export const terminateSponsor = (
  sponsorshipId: string,
  reason: string
): Promise<any> =>
  apiRequest(`/sponsorships/${sponsorshipId}/terminate`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });

/** El ahijado se gradúa y finaliza su proceso de recuperación formal. */
export const graduate = (): Promise<any> =>
  apiRequest('/sponsorships/graduate', { method: 'POST' });

/** Devuelve la lista de ahijados del padrino autenticado. */
export const getMyGodchildren = (): Promise<any> =>
  apiRequest('/sponsorships/my-godchildren');
