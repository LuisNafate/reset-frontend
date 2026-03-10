// lib/api/journal.ts
// Este módulo ha sido reemplazado por lib/api/tracking.ts.
// Se conserva para retrocompatibilidad como alias liviano.

import { createLog, getLogs } from './tracking';
import type { JournalEntry, SaveJournalEntryData } from '@/types';

/** @deprecated Usar tracking.ts (createLog / getLogs) */
export async function saveJournalEntry(
  data: SaveJournalEntryData
): Promise<JournalEntry> {
  const raw = await createLog({
    consumed: data.consumed,
    craving_level: data.cravingLevel ?? 5,
    emotional_state: 5,
  });
  return {
    id: raw.id ?? String(Date.now()),
    title: data.title,
    mood: data.mood,
    notes: data.notes,
    consumed: data.consumed,
    createdAt: raw.logDate ?? new Date().toISOString(),
  };
}

/** @deprecated Usar tracking.ts (getLogs) */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  const list = await getLogs(30);
  return Array.isArray(list)
    ? list.map((raw) => ({
        id: raw.id ?? String(Date.now()),
        title: raw.logDate ?? '',
        mood: 'calmado' as const,
        notes: raw.notes ?? '',
        consumed: raw.consumed ?? false,
        createdAt: raw.logDate ?? new Date().toISOString(),
      }))
    : [];
}

/** @deprecated La API de tracking no expone DELETE por log. */
export async function deleteJournalEntry(_id: string): Promise<void> {
  void _id;
}

