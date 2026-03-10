// lib/api/emergency.ts
// Emergencias — contactos y alertas de emergencia del usuario.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface EmergencyContactPayload {
  contactName: string;
  relationship: string;
  email?: string;
  phone?: string;
  customRelationship?: string;
  priorityOrder?: number;
}

export interface TriggerAlertPayload {
  resultedInRelapse?: boolean;
  resolutionNotes?: string;
}

export interface TriggerAlertResponse {
  message: string;
  alert: {
    id: string;
    userId: string;
    activatedAt: string;
    resultedInRelapse: boolean;
  };
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Agrega un nuevo contacto de emergencia. */
export const addContact = (data: EmergencyContactPayload): Promise<any> =>
  apiRequest('/emergency/contacts', {
    method: 'POST',
    body: JSON.stringify({
      contact_name: data.contactName,
      relationship: data.relationship,
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.customRelationship ? { custom_relationship: data.customRelationship } : {}),
      priority_order: data.priorityOrder ?? 1,
    }),
  });

/** Obtiene la lista de contactos de emergencia del usuario autenticado. */
export const getContacts = (): Promise<any> =>
  apiRequest('/emergency/contacts');

/**
 * Dispara una alerta de emergencia (botón de pánico).
 * Notifica a todos los contactos activos del usuario.
 */
export const triggerAlert = (payload: TriggerAlertPayload = {}): Promise<TriggerAlertResponse> =>
  apiRequest<TriggerAlertResponse>('/emergency/alert', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

