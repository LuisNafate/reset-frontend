// lib/api/profile.ts
// Perfil del usuario — referenciado ahora a través de emergency.ts para
// los contactos de apoyo. Se mantiene este módulo para operaciones de perfil.

import { apiRequest } from './client';
import type { SupportPeer, ProfileUpdateData } from '@/types';

export async function getProfile(): Promise<{ username: string; addictionType: string }> {
  const res: any = await apiRequest('/profile');
  const data = res?.data ?? res;
  return {
    username: data?.name ?? data?.username ?? '',
    addictionType: data?.addictionName ?? data?.addictionType ?? '',
  };
}

export async function updateProfile(data: ProfileUpdateData): Promise<void> {
  await apiRequest('/profile', {
    method: 'PATCH',
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
