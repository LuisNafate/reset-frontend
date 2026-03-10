// lib/api/notifications.ts
// Notificaciones in-app — polling REST (sin Socket.io).

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type NotificationType =
  | 'REACTION'
  | 'COMMENT'
  | 'REPLY'
  | 'SPONSORSHIP_REQUEST'
  | 'SPONSORSHIP_ACCEPTED'
  | 'SPONSORSHIP_REJECTED';

export interface NotificationItem {
  _id: string;
  userId: string;
  actorId: string;
  type: NotificationType;
  targetId: string;
  isRead: boolean;
  createdAt: string;
  /** Nombre del actor — puede venir del backend o calcularse en el front */
  actorName?: string;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

export const getNotifications = (): Promise<NotificationItem[]> =>
  apiRequest<NotificationItem[]>('/notifications');

export const markOneRead = (id: string): Promise<{ message: string }> =>
  apiRequest<{ message: string }>(`/notifications/${id}/read`, {
    method: 'PATCH',
    body: JSON.stringify({}),
  });

export const markAllRead = (): Promise<{ message: string }> =>
  apiRequest<{ message: string }>('/notifications/read-all', {
    method: 'PATCH',
    body: JSON.stringify({}),
  });
