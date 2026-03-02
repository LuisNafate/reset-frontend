"use client";

import { useState, useEffect } from "react";
import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from "@/lib/api/journal";
import type { JournalEntry, MoodId } from "@/types";

export function useBitacora() {
  // ── Lista de entradas ────────────────────────────────────────────────────
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);

  // ── Formulario nueva entrada ─────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodId>("calmado");
  const [notes, setNotes] = useState("");
  const [consumed, setConsumed] = useState(false);

  // ── Estado general ───────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Cargar entradas al montar (orden cronológico inverso garantizado en API)
  useEffect(() => {
    getJournalEntries()
      .then(setEntries)
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
      const newEntry = await saveJournalEntry({ title, mood: selectedMood, notes, consumed });
      // Insertar al principio para mantener orden inverso sin recargar
      setEntries((prev) => [newEntry, ...prev]);
      setSaved(true);
      setTitle("");
      setNotes("");
      setConsumed(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la nota");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic update
    setEntries((prev) => prev.filter((e) => e.id !== id));
    try {
      await deleteJournalEntry(id);
    } catch {
      // Revertir si falla
      getJournalEntries().then(setEntries);
    }
  };

  return {
    entries,
    isLoadingEntries,
    title,
    selectedMood,
    notes,
    consumed,
    isSubmitting,
    error,
    saved,
    setTitle,
    setSelectedMood,
    setNotes,
    setConsumed,
    handleSave,
    handleDelete,
  };
}
