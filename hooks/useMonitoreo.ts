"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api/client";

// ─── Tipos exportados ─────────────────────────────────────────────────────────

export interface GodchildInfo {
  id: string;
  name: string;
  sobrietyDays: number;
}

export interface GodchildStats {
  sobrietyDays: number;
  notesThisWeek: number;
  consistency: number;         // 0–100
  lastActiveAt: string | null;
}

export interface RecentLogEntry {
  id: string;
  moodId: string;
  moodLabel: string;
  notes: string;
  date: string;
  isShared: boolean;
}

export interface MonitoreoResult {
  isLoading: boolean;
  godchildFound: boolean;
  godchild: GodchildInfo | null;
  stats: GodchildStats | null;
  recentLogs: RecentLogEntry[];
}

// ─── Normalización de estado emocional ────────────────────────────────────────

const NUM_TO_MOOD: Record<number, { id: string; label: string }> = {
  1: { id: "triste",   label: "Triste"   },
  2: { id: "ansioso",  label: "Ansioso"  },
  3: { id: "calmado",  label: "Calmado"  },
  4: { id: "calmado",  label: "Calmado"  },
  5: { id: "alegre",   label: "Alegre"   },
  6: { id: "motivado", label: "Motivado" },
  7: { id: "alegre",   label: "Alegre"   },
};

function normalizeMood(val: unknown): { id: string; label: string } {
  if (typeof val === "number") {
    return NUM_TO_MOOD[val] ?? { id: "calmado", label: "Calmado" };
  }
  if (typeof val === "string") {
    const lower = val.toLowerCase();
    const known: Record<string, string> = {
      triste: "Triste", ansioso: "Ansioso", calmado: "Calmado",
      alegre: "Alegre", motivado: "Motivado", feliz: "Alegre",
    };
    if (lower in known) return { id: lower === "feliz" ? "alegre" : lower, label: known[lower] };
  }
  return { id: "calmado", label: "Calmado" };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMonitoreo(): MonitoreoResult {
  const [state, setState] = useState<MonitoreoResult>({
    isLoading: true,
    godchildFound: false,
    godchild: null,
    stats: null,
    recentLogs: [],
  });

  useEffect(() => {
    async function load() {
      try {
        // Intenta obtener la lista de ahijados (actualmente 404 en el backend)
        const res: any = await apiRequest("/sponsorships/my-godchildren");
        const list: any[] = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        if (list.length === 0) {
          setState((s) => ({ ...s, isLoading: false, godchildFound: false }));
          return;
        }

        const gc = list[0];
        const godchild: GodchildInfo = {
          id:           gc.id ?? gc._id ?? "",
          name:         gc.name ?? gc.displayName ?? "Tu ahijado",
          sobrietyDays: gc.sobrietyDays ?? 0,
        };

        // Intenta cargar estadísticas y logs del ahijado
        let stats: GodchildStats | null = null;
        let recentLogs: RecentLogEntry[] = [];

        try {
          const sRes: any = await apiRequest("/tracking/statistics");
          const sd = sRes?.data ?? sRes ?? {};
          const total = Math.max(sd.totalLogs ?? 1, 1);
          const relapses = sd.relapseCount ?? 0;
          stats = {
            sobrietyDays:  sd.soberDays ?? sd.sobrietyDays ?? godchild.sobrietyDays,
            notesThisWeek: sd.totalLogs ?? 0,
            consistency:   Math.round(((total - relapses) / total) * 100),
            lastActiveAt:  sd.lastActiveAt ?? null,
          };
        } catch { /* fallo en stats es no-fatal */ }

        try {
          const lRes: any = await apiRequest("/tracking/logs?limit=5");
          const rawLogs: any[] = Array.isArray(lRes?.data)
            ? lRes.data
            : Array.isArray(lRes)
            ? lRes
            : [];
          recentLogs = rawLogs.map((log: any) => {
            const mood = normalizeMood(log.emotional_state ?? log.emotionalState);
            return {
              id:        log.id ?? log._id ?? String(Math.random()),
              moodId:    mood.id,
              moodLabel: mood.label,
              notes:     log.notes ?? log.note ?? "",
              date:      log.logDate ?? log.log_date ?? log.createdAt ?? "",
              isShared:  log.isShared ?? false,
            };
          });
        } catch { /* fallo en logs es no-fatal */ }

        setState({ isLoading: false, godchildFound: true, godchild, stats, recentLogs });
      } catch {
        // 404 en /sponsorships/my-godchildren → sin ahijado aún
        setState((s) => ({ ...s, isLoading: false, godchildFound: false }));
      }
    }

    load();
  }, []);

  return state;
}
