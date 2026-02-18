import type { JournalEntry, SaveJournalEntryData } from "@/types";
import { MOCK_JOURNAL_ENTRIES } from "@/lib/mock/data";
import { authHeaders } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Save a new journal entry */
export async function saveJournalEntry(
  data: SaveJournalEntryData
): Promise<JournalEntry> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 400));
  const newEntry: JournalEntry = {
    id: `j${Date.now()}`,
    mood: data.mood,
    notes: data.notes,
    createdAt: new Date().toISOString(),
    isShared: false,
  };
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

/** Get paginated journal entries */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_JOURNAL_ENTRIES;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/journal`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener las entradas");
  // return res.json();
}
