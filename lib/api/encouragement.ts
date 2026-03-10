// lib/api/encouragement.ts
// Notas de aliento — endpoint /forum/encouragement

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface EncouragementNote {
  id: string;
  content: string;
  senderName: string;
  createdAt: string;
}

// ─── Funciones (Padrino) ─────────────────────────────────────────────────────

/**
 * Envía una nota de aliento al ahijado.
 * Solo disponible para usuarios con role PADRINO.
 */
export async function sendEncouragement(receiverId: string, content: string): Promise<void> {
  await apiRequest('/forum/encouragement', {
    method: 'POST',
    body: JSON.stringify({ receiverId, content }),
  });
}

// ─── Funciones (Adicto) ──────────────────────────────────────────────────────

/**
 * Obtiene las notas de aliento recibidas por el usuario.
 * Solo disponible para usuarios con role ADICTO.
 */
export async function getMyNotes(): Promise<EncouragementNote[]> {
  const res: any = await apiRequest('/forum/encouragement/my-notes');
  const items: any[] = Array.isArray(res) ? res : (res?.data ?? []);
  return items.map((item) => ({
    id: item.id ?? String(Date.now() + Math.random()),
    content: item.content ?? '',
    senderName: item.senderName ?? item.sender?.name ?? 'Tu padrino',
    createdAt: item.createdAt ?? new Date().toISOString(),
  }));
}
