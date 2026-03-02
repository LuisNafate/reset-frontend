import type { JournalEntry, SaveJournalEntryData } from "@/types";
import { MOCK_JOURNAL_ENTRIES } from "@/lib/mock/data";
import { authHeaders } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// In-memory store que arranca con los mocks y acepta nuevas entradas en la sesión
const _store: JournalEntry[] = [...MOCK_JOURNAL_ENTRIES];

/** Save a new journal entry */
export async function saveJournalEntry(
  data: SaveJournalEntryData
): Promise<JournalEntry> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 400));
  const newEntry: JournalEntry = {
    id: `j${Date.now()}`,
    title: data.title.trim() || "Sin título",
    mood: data.mood,
    notes: data.notes,
    consumed: data.consumed,
    createdAt: new Date().toISOString(),
  };
  _store.unshift(newEntry); // orden cronológico inverso
  return newEntry;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/journal`, {
  //   method: "POST",
  //   headers: authHeaders(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Error al guardar la entrada");
  // return res.json();
}

/** Get journal entries (reverse-chronological) */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 300));
  return [..._store].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/journal`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener las entradas");
  // return res.json();
}

/** Delete a journal entry by id */
export async function deleteJournalEntry(id: string): Promise<void> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  const idx = _store.findIndex((e) => e.id === id);
  if (idx !== -1) _store.splice(idx, 1);
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/journal/${id}`, {
  //   method: "DELETE",
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Error al eliminar la entrada");
}
