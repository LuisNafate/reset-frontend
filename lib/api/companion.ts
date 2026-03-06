// lib/api/companion.ts
// Funciones del módulo acompañante (padrino).
// Los únicos endpoints disponibles son los compartidos con el paciente:
// /streak/active y /tracking/stats/me y /tracking/logs
// No existen endpoints de mensajería ni perfil específicos del padrino.

import { apiRequest } from './client';
import type { CompanionProgress, SupportedUser } from '@/types';

// ─── Progreso ────────────────────────────────────────────────────────────────

export async function getCompanionProgress(): Promise<CompanionProgress> {
  const res: any = await apiRequest('/streak/active');
  const data = res?.data ?? res;
  return {
    sobrietyDays: data?.day_counter ?? data?.currentStreak ?? 0,
    plantStage: data?.plantStage ?? 'Brote',
    notesThisWeek: 0,
    messagesReceived: 0,
    consistency: 0,
    lastActiveAt: data?.lastActiveAt ?? new Date().toISOString(),
    recentActivity: [],
  };
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
