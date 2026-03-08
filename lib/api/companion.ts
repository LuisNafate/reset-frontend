// lib/api/companion.ts
// Funciones del módulo acompañante (padrino).
// Usa /streak (racha del padrino) y /sponsorships/godchild/profile para ver al ahijado.

import { getStreak } from './streak';
import { getGodchildProfile } from './sponsorship';
import type { CompanionProgress, SupportedUser } from '@/types';

// ─── Progreso ────────────────────────────────────────────────────────────────

export async function getCompanionProgress(): Promise<CompanionProgress> {
  const streak = await getStreak();
  return {
    sobrietyDays: streak?.dayCounter ?? 0,
    plantStage: 'Brote',
    notesThisWeek: 0,
    messagesReceived: 0,
    consistency: 0,
    lastActiveAt: streak?.lastLogDate ?? new Date().toISOString(),
    recentActivity: [],
  };
}

// ─── Usuarios apoyados ───────────────────────────────────────────────────────

export async function getSupportedUsers(): Promise<SupportedUser[]> {
  try {
    const data = await getGodchildProfile();
    return [
      {
        id: data.godchild.id,
        displayName: data.godchild.name,
        addictionType: data.godchild.addiction?.custom_name ?? '',
        sobrietyDays: data.statistics.dayCounter,
        status: data.sponsorship.status === 'ACTIVE' ? 'Activo' : 'Inactivo',
      },
    ];
  } catch {
    // Sin ahijado activo
    return [];
  }
}

