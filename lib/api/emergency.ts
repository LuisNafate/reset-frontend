// lib/api/emergency.ts
// Emergencias — contactos y alertas de emergencia del usuario.

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface EmergencyContactPayload {
  contact_name: string;
  phone: string;
  email?: string;
  relationship?: string;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Agrega un nuevo contacto de emergencia. */
export const addContact = (data: EmergencyContactPayload): Promise<any> =>
  apiRequest('/emergency/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Obtiene la lista de contactos de emergencia del usuario autenticado. */
export const getContacts = (): Promise<any> =>
  apiRequest('/emergency/contacts');

/**
 * Dispara una alerta de emergencia.
 * @param notes Mensaje opcional de resolución notificado a los contactos.
 */
export const triggerAlert = (notes?: string): Promise<any> =>
  apiRequest('/emergency/alert', {
    method: 'POST',
    body: JSON.stringify({
      resulted_in_relapse: false,
      resolution_notes: notes ?? 'Alerta de emergencia activada',
    }),
  });

/** Obtiene el historial de alertas del usuario. */
export const getAlerts = (): Promise<any> => apiRequest('/emergency/alerts');
