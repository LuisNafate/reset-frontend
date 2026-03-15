// lib/api/profile.ts
// Perfil del usuario — referenciado ahora a través de emergency.ts para
// los contactos de apoyo. Se mantiene este módulo para operaciones de perfil.

import { apiRequest } from './client';
import type { SupportPeer, ProfileUpdateData } from '@/types';

/**
 * El endpoint /profile no existe en la API actual.
 * Los datos del perfil se obtienen desde el contexto de Auth (login).
 * Esta función devuelve un objeto vacío para mantener compatibilidad.
 */
export async function getProfile(): Promise<{ username: string; addictionType: string }> {
  return { username: '', addictionType: '' };
}

/**
 * Actualiza el perfil de usuario (nombre).
 */
export async function updateProfile(data: { name: string }): Promise<void> {
  await apiRequest('/auth/profile', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** @deprecated Usar emergency.ts → getContacts() */
export async function getSupportPeers(): Promise<SupportPeer[]> {
  return [];
}

/** @deprecated Sin endpoint definido — no-op. */
export async function removeSupportPeer(_peerId: string): Promise<void> {
  void _peerId;
}

/** @deprecated Sin endpoint definido — no-op. */
export async function updateEmergencyNotifs(_enabled: boolean): Promise<void> {
  void _enabled;
}
