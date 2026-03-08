"use client";
// hooks/useDashboard.ts
// Carga los datos del dashboard principal: racha de sobriedad, etapa de planta,
// hito siguiente y última nota. Combina datos de /streak y /tracking/statistics.

import { useState, useEffect } from "react";
import { getProgress } from "@/lib/api/dashboard";
import { getLogs } from "@/lib/api/tracking";
import type { UserProgress } from "@/types";

// ─── Hitos de sobriedad ───────────────────────────────────────────────────────

const MILESTONES = [
  { days: 7,   label: "7 días: Primera semana" },
  { days: 14,  label: "14 días: Dos semanas" },
  { days: 30,  label: "30 días: Brote de Plata" },
  { days: 60,  label: "60 días: Dos meses" },
  { days: 90,  label: "90 días: Planta de Jade" },
  { days: 180, label: "180 días: Árbol Dorado" },
  { days: 365, label: "365 días: Ciprés de Diamante" },
];

function getNextMilestone(days: number): { label: string; daysLeft: number } | null {
  const next = MILESTONES.find((m) => m.days > days);
  if (!next) return null;
  return { label: next.label, daysLeft: next.days - days };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [lastNote, setLastNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Cargar racha y estadísticas en paralelo
        const [prog, logsRes] = await Promise.allSettled([
          getProgress(),
          getLogs(1),
        ]);

        if (cancelled) return;

        if (prog.status === "fulfilled") {
          const p = prog.value;
          const days = p.sobrietyDays ?? 0;
          const nextM = getNextMilestone(days);
          setProgress({
            ...p,
            nextMilestone: nextM ?? undefined,
          });
        }

        // Última nota del log más reciente
        if (logsRes.status === "fulfilled") {
          const list = logsRes.value;
          if (Array.isArray(list) && list.length > 0) {
            const latest = list[0];
            if (latest?.notes) setLastNote(latest.notes);
          }
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Error al cargar datos");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { progress, lastNote, isLoading, error };
}
