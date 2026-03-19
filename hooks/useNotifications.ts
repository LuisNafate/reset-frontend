'use client';
// hooks/useNotifications.ts
// Polling de notificaciones cada 30 s mientras la app está activa.
// Las notificaciones de tipo SPONSORSHIP_REQUEST también exponen
// acciones de aceptar/rechazar que actualizan la lista optimistamente.

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getNotifications,
  markOneRead,
  markAllRead,
} from '@/lib/api/notifications';
import {
  acceptSponsorship,
  rejectSponsorship,
} from '@/lib/api/sponsorship';
import type { NotificationItem } from '@/lib/api/notifications';

const POLL_INTERVAL_MS = 30_000;

export interface UseNotificationsResult {
  notifications: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
  handleMarkOne: (id: string) => Promise<void>;
  handleMarkAll: () => Promise<void>;
  handleAcceptSponsorship: (notifId: string) => Promise<void>;
  handleRejectSponsorship: (notifId: string) => Promise<void>;
  /** Recarga manualmente la lista (útil tras aceptar/rechazar sponsorship) */
  reload: () => void;
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('No se pudieron cargar las notificaciones', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial + polling
  useEffect(() => {
    load(true);
    timerRef.current = setInterval(() => load(), POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [load]);

  const handleMarkOne = useCallback(async (id: string) => {
    // Optimista: marcar en local antes de confirmar
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
    try {
      await markOneRead(id);
    } catch (err) {
      console.warn('No se pudo marcar notificación como leída', err);
    }
  }, []);

  const handleMarkAll = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllRead();
    } catch (err) {
      console.warn('No se pudieron marcar todas las notificaciones como leídas', err);
    }
  }, []);

  const handleAcceptSponsorship = useCallback(async (notifId: string) => {
    await acceptSponsorship();
    // Marcar notif como leída y recargar la lista
    setNotifications((prev) =>
      prev.map((n) => (n._id === notifId ? { ...n, isRead: true } : n))
    );
    await load();
  }, [load]);

  const handleRejectSponsorship = useCallback(async (notifId: string) => {
    await rejectSponsorship();
    setNotifications((prev) =>
      prev.map((n) => (n._id === notifId ? { ...n, isRead: true } : n))
    );
    await load();
  }, [load]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    handleMarkOne,
    handleMarkAll,
    handleAcceptSponsorship,
    handleRejectSponsorship,
    reload: () => load(),
  };
}
