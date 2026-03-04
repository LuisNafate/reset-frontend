// lib/api/journal.ts
// Este módulo ha sido reemplazado por lib/api/tracking.ts.
// Se conserva para retrocompatibilidad como alias liviano.

import { apiRequest } from './client';
import type { JournalEntry, SaveJournalEntryData } from '@/types';

/** @deprecated Usar tracking.ts (createLog / getLogs) */
export async function saveJournalEntry(
  data: SaveJournalEntryData
): Promise<JournalEntry> {
  const res: any = await apiRequest('/tracking/logs', {
    method: 'POST',
    body: JSON.stringify({
      log_date: new Date().toISOString().split('T')[0],
      consumed: data.consumed,
      craving_level: data.cravingLevel ?? 5,
      emotional_state: 5,
    }),
  });
  const raw = res?.data ?? res;
  return {
    id: raw.id ?? raw._id ?? String(Date.now()),
    title: data.title,
    mood: data.mood,
    notes: data.notes,
    consumed: data.consumed,
    createdAt: raw.createdAt ?? new Date().toISOString(),
  };
}

/** @deprecated Usar tracking.ts (getLogs) */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  const res: any = await apiRequest('/tracking/logs?limit=30');
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list)
    ? list.map((raw: any) => ({
        id: raw.id ?? raw._id ?? String(Date.now()),
        title: raw.log_date ?? '',
        mood: 'calmado' as const,
        notes: '',
        consumed: raw.consumed ?? false,
        createdAt: raw.createdAt ?? raw.log_date ?? new Date().toISOString(),
      }))
    : [];
}

/** @deprecated La API de tracking no expone DELETE por log. */
export async function deleteJournalEntry(_id: string): Promise<void> {
  void _id;
}
