"use client";

import { useState, useEffect } from "react";
import { createLog, getLogs } from "@/lib/api/tracking";
import type { DailyLogResponse, TrackingLogFilters } from "@/lib/api/tracking";
import {
  getMoodLabel,
  getMoodColor,
  getCravingColor,
  getSliderTrack,
} from "@/lib/bitacora-helpers";
import type { JournalEntry, MoodId } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const DEFAULT_RECENT_LIMIT = 30;

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

function getTimestamp(raw: DailyLogResponse): string {
  return (
    raw.createdAt ??
    raw.created_at ??
    raw.logDate ??
    raw.log_date ??
    new Date().toISOString()
  );
}

function getEmotionLevel(raw: DailyLogResponse): number {
  if (typeof raw.emotionalState?.level === "number") return raw.emotionalState.level;
  if (typeof (raw as DailyLogResponse & { emotional_state?: number }).emotional_state === "number") {
    return (raw as DailyLogResponse & { emotional_state?: number }).emotional_state ?? 5;
  }
  if (typeof (raw as DailyLogResponse & { emotionalStateLevel?: number }).emotionalStateLevel === "number") {
    return (raw as DailyLogResponse & { emotionalStateLevel?: number }).emotionalStateLevel ?? 5;
  }
  return 5;
}

function parseYmdFromDate(rawDate?: string): { year: number; month: number; day: number } | null {
  if (!rawDate) return null;

  const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
    };
  }

  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return null;

  return {
    year: parsed.getUTCFullYear(),
    month: parsed.getUTCMonth() + 1,
    day: parsed.getUTCDate(),
  };
}

function applyClientSideFilters(data: DailyLogResponse[], filters: TrackingLogFilters): DailyLogResponse[] {
  const { year, month, day, from, to } = filters;

  if (year !== undefined || month !== undefined || day !== undefined) {
    return data.filter((item) => {
      const sourceDate = item.logDate ?? item.log_date ?? item.createdAt ?? item.created_at;
      const ymd = parseYmdFromDate(sourceDate);
      if (!ymd) return false;
      if (year !== undefined && ymd.year !== year) return false;
      if (month !== undefined && ymd.month !== month) return false;
      if (day !== undefined && ymd.day !== day) return false;
      return true;
    });
  }

  if (from || to) {
    const fromTime = from ? new Date(from).getTime() : Number.NEGATIVE_INFINITY;
    const toTime = to ? new Date(to).getTime() : Number.POSITIVE_INFINITY;
    return data.filter((item) => {
      const sourceDate = item.logDate ?? item.log_date ?? item.createdAt ?? item.created_at;
      const valueTime = sourceDate ? new Date(sourceDate).getTime() : Number.NaN;
      return Number.isFinite(valueTime) && valueTime >= fromTime && valueTime <= toTime;
    });
  }

  return data;
}

/** Convierte un registro diario de la API al formato JournalEntry del UI. */
function normalizeEntry(raw: DailyLogResponse): JournalEntry {
  const timestamp = getTimestamp(raw);
  const dateStr = raw.logDate ?? raw.log_date ?? timestamp;
  const emotionLevel = getEmotionLevel(raw);
  return {
    id: raw.id ?? String(Date.now()),
    title: dateStr ? dateStr.split('T')[0] : '',
    mood: closestMood(emotionLevel),
    notes: raw.notes ?? '',
    consumed: raw.consumed ?? false,
    createdAt: timestamp,
  };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useBitacora(filters: TrackingLogFilters = {}) {
  const { year, month, day, from, to, userId, page, limit } = filters;
  const hasActiveTrackingFilters =
    year !== undefined ||
    month !== undefined ||
    day !== undefined ||
    from !== undefined ||
    to !== undefined ||
    userId !== undefined ||
    page !== undefined ||
    limit !== undefined;

  // ── Lista de entradas ────────────────────────────────────────────────────────
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  // ── Formulario nueva entrada ─────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [moodLevel, setMoodLevel] = useState(5);       // 1-10: desanimado → muy animado
  const [notes, setNotes] = useState("");
  const [consumed, setConsumed] = useState(false);
  const [cravingLevel, setCravingLevel] = useState(5); // 1-10, el usuario lo elige

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadEntries() {
      setIsLoadingEntries(true);
      setError(null);

      try {
        const data = hasActiveTrackingFilters
          ? await getLogs({ year, month, day, from, to, userId, page, limit })
          : await getLogs(DEFAULT_RECENT_LIMIT);
        if (cancelled) return;

        const filteredData = Array.isArray(data)
          ? applyClientSideFilters(data, { year, month, day, from, to })
          : [];

        setEntries(
          filteredData
            ? filteredData
                .map(normalizeEntry)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            : []
        );
      } catch {
        if (!cancelled) setError("Error al cargar las entradas");
      } finally {
        if (!cancelled) setIsLoadingEntries(false);
      }
    }

    loadEntries();

    return () => {
      cancelled = true;
    };
  }, [year, month, day, from, to, userId, page, limit]);

  const handleSave = async () => {
    if (!notes.trim()) {
      setError("Escribe algo antes de guardar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      // La API recibe números directos 1-10, NO UUIDs de catálogos
      await createLog({
        consumed,
        craving_level: cravingLevel,
        emotional_state: moodLevel,
        notes: notes.trim() || undefined,
      });
      setSaved(true);
      const refreshed = hasActiveTrackingFilters
        ? await getLogs({ year, month, day, from, to, userId, page, limit })
        : await getLogs(DEFAULT_RECENT_LIMIT);

      const filteredRefreshed = Array.isArray(refreshed)
        ? applyClientSideFilters(refreshed, { year, month, day, from, to })
        : [];

      setEntries(
        filteredRefreshed
          ? filteredRefreshed.map(normalizeEntry).sort(
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

  // La API de tracking no expone endpoint DELETE por log — eliminación local optimista
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
