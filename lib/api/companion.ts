// lib/api/companion.ts
// Funciones del módulo acompañante (padrino).
// Usa el cliente HTTP centralizado (lib/api/client.ts).

import { apiRequest } from './client';
import type {
  CompanionProgress,
  CompanionProfile,
  SupportedUser,
  Message,
  MessageLibraryItem,
} from '@/types';

// ─── Progreso ────────────────────────────────────────────────────────────────

export async function getCompanionProgress(): Promise<CompanionProgress> {
  const res: any = await apiRequest('/streak');
  const data = res?.data ?? res;
  return {
    sobrietyDays: data?.currentStreak ?? 0,
    plantStage: data?.plantStage ?? 'Brote',
    notesThisWeek: data?.notesThisWeek ?? 0,
    messagesReceived: data?.messagesReceived ?? 0,
    consistency: data?.consistency ?? 0,
    lastActiveAt: data?.lastActiveAt ?? new Date().toISOString(),
    recentActivity: data?.recentActivity ?? [],
  };
}

// ─── Mensajes ────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<Message[]> {
  const res: any = await apiRequest('/messages');
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list)
    ? list.map((m: any) => ({
        id: m.id ?? m._id,
        text: m.text ?? m.content ?? '',
        time: m.createdAt
          ? new Date(m.createdAt).toLocaleTimeString('es', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '',
        fromMe: m.fromMe ?? false,
      }))
    : [];
}

export async function sendMessage(text: string): Promise<Message> {
  const res: any = await apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  const data = res?.data ?? res;
  return {
    id: data?.id ?? data?._id ?? `m${Date.now()}`,
    text: data?.text ?? text,
    time: data?.createdAt
      ? new Date(data.createdAt).toLocaleTimeString('es', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    fromMe: true,
  };
}

export async function getMessageLibrary(): Promise<MessageLibraryItem[]> {
  const res: any = await apiRequest('/messages/library').catch(() => []);
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list)
    ? list.map((item: any) => ({
        id: item.id ?? item._id ?? String(Date.now()),
        text: item.text ?? '',
      }))
    : [];
}

// ─── Perfil del acompañante ──────────────────────────────────────────────────

export async function getCompanionProfile(): Promise<CompanionProfile> {
  const res: any = await apiRequest('/profile');
  const data = res?.data ?? res;
  return {
    name: data?.name ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    emailAlerts: data?.emailAlerts ?? false,
    smsAlerts: data?.smsAlerts ?? false,
  };
}

export async function updateCompanionProfile(data: CompanionProfile): Promise<void> {
  await apiRequest('/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// ─── Usuarios apoyados ───────────────────────────────────────────────────────

export async function getSupportedUsers(): Promise<SupportedUser[]> {
  const res: any = await apiRequest('/sponsorships/my-godchildren');
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list)
    ? list.map((u: any) => ({
        id: u.id ?? u._id ?? String(Date.now()),
        displayName: u.name ?? u.displayName ?? 'Usuario',
        addictionType: u.addictionName ?? u.addictionType ?? '',
        sobrietyDays: u.sobrietyDays ?? 0,
        status: u.status === 'Inactivo' ? 'Inactivo' : 'Activo',
      }))
    : [];
}
