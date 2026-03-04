"use client";

import { useState, useEffect } from "react";
import { createLog, getLogs } from "@/lib/api/tracking";
import { useAuth } from "@/context/AuthContext";
import {
  getMoodLabel,
  getMoodColor,
  getCravingColor,
  getSliderTrack,
} from "@/lib/bitacora-helpers";
import type { JournalEntry, MoodId } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Valor numérico (1-10) que representa cada estado de ánimo para la API. */
const MOOD_TO_NUMBER: Record<MoodId, number> = {
  feliz:       9,
  motivado:    8,
  agradecido:  8,
  esperanzado: 7,
  calmado:     7,
  confundido:  5,
  ansioso:     4,
  agotado:     3,
  triste:      3,
  enojado:     2,
};

const NUMBER_TO_MOOD: Array<[number, MoodId]> = [
  [9, "feliz"],
  [8, "motivado"],
  [8, "agradecido"],
  [7, "esperanzado"],
  [7, "calmado"],
  [5, "confundido"],
  [4, "ansioso"],
  [3, "agotado"],
  [3, "triste"],
  [2, "enojado"],
];

function closestMood(value: number): MoodId {
  return NUMBER_TO_MOOD.reduce((best, [n, id]) =>
    Math.abs(n - value) < Math.abs(best[0] - value) ? [n, id] : best
  )[1];
}

/** Convierte un registro diario de la API al formato JournalEntry del UI.
 * La API devuelve: logDate (ISO), cravingLevelId (UUID), emotionalStateId (UUID).
 * Como los IDs son opacos, el mood se deja en 'calmado' por defecto si no viene como número.
 */
function normalizeEntry(raw: any): JournalEntry {
  // Soporta tanto el campo legácy (log_date) como el real de la API (logDate)
  const dateStr = raw.logDate ?? raw.log_date ?? "";
  return {
    id: raw.id ?? raw._id ?? String(Date.now()),
    title: dateStr ? dateStr.split('T')[0] : "",
    // emotional_state viene como número en /tracking/statistics pero como UUID en /tracking/logs
    mood: typeof raw.emotional_state === 'number'
      ? closestMood(raw.emotional_state)
      : "calmado",
    notes: raw.notes ?? "",
    consumed: raw.consumed ?? false,
    createdAt: raw.createdAt ?? dateStr ?? new Date().toISOString(),
  };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useBitacora() {
  const { user } = useAuth();
  // ── Lista de entradas ────────────────────────────────────────────────────────────
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  // ── Formulario nueva entrada ─────────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [moodLevel, setMoodLevel] = useState(5);           // 1-10: desanimado → muy animado
  const [notes, setNotes] = useState("");
  const [consumed, setConsumed] = useState(false);
  const [cravingLevel, setCravingLevel] = useState(5);     // 1-10, el usuario lo elige

  // ── Estado general ───────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Cargar entradas al montar
  useEffect(() => {
    getLogs(30, user?.id)
      .then((res: any) => {
        const data: any[] = res?.data ?? res ?? [];
        setEntries(
          Array.isArray(data)
            ? data.map(normalizeEntry).sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
            : []
        );
      })
      .catch(() => setError("Error al cargar las entradas"))
      .finally(() => setIsLoadingEntries(false));
  }, []);

  const handleSave = async () => {
    if (!notes.trim()) {
      setError("Escribe algo antes de guardar.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      await createLog({
        log_date: new Date().toISOString().split("T")[0],
        consumed,
        craving_level: cravingLevel,
        emotional_state: moodLevel,
      });
      setSaved(true);
      setError(null);
      // Recargar entradas desde la API
      const res: any = await getLogs(30, user?.id);
      const data: any[] = res?.data ?? res ?? [];
      setEntries(
        Array.isArray(data)
          ? data.map(normalizeEntry).sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          : []
      );
      setTitle("");
      setNotes("");
      setConsumed(false);
      setMoodLevel(5);
      setCravingLevel(5);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la nota");
    } finally {
      setIsSubmitting(false);
    }
  };

  // La API de tracking no expone endpoint DELETE por log — se omite
  const handleDelete = (_id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== _id));
  };

  return {
    // Lista
    entries,
    isLoadingEntries,
    // Formulario
    title,
    moodLevel,
    setMoodLevel,
    cravingLevel,
    setCravingLevel,
    notes,
    consumed,
    // Estado
    isSubmitting,
    error,
    saved,
    setTitle,
    setNotes,
    setConsumed,
    handleSave,
    handleDelete,
    // Valores derivados — el componente los usa directamente sin calcular nada
    moodLabel:   getMoodLabel(moodLevel),
    moodColor:   getMoodColor(moodLevel),
    moodTrack:   getSliderTrack(moodLevel, getMoodColor(moodLevel)),
    cravingColor: getCravingColor(cravingLevel),
    cravingTrack: getSliderTrack(cravingLevel, getCravingColor(cravingLevel)),
  };
}
