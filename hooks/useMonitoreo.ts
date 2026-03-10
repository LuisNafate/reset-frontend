"use client";

import { useState, useEffect } from "react";
import { getGodchildProfile } from "@/lib/api/sponsorship";
import type { GodchildProfileResponse } from "@/lib/api/sponsorship";

// ─── Tipos exportados ──────────────────────────────────────────────────

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
  error: string | null;
}

// ─── Helpers de mapeo ────────────────────────────────────────────────

function mapProfile(data: GodchildProfileResponse): {
  godchild: GodchildInfo;
  stats: GodchildStats;
  recentLogs: RecentLogEntry[];
} {
  const { godchild, statistics, recentLogs } = data;

  // Usar el último log disponible como proxy de "última actividad"
  const lastActiveAt =
    recentLogs.length > 0 ? recentLogs[0].logDate : null;

  return {
    godchild: {
      id: godchild.id,
      name: godchild.name,
      sobrietyDays: statistics.dayCounter,
    },
    stats: {
      sobrietyDays: statistics.dayCounter,
      notesThisWeek: recentLogs.length, // proxy: logs en el periodo devuelto
      consistency: 0, // La API no devuelve un % de consistencia directamente
      lastActiveAt,
    },
    recentLogs: recentLogs.map((log, idx) => ({
      id: `${log.logDate}-${idx}`,
      moodId: String(log.emotionalState.level),
      moodLabel: log.emotionalState.label,
      notes: log.notes ?? '',
      date: log.logDate,
      isShared: false, // La API no expone shareability por log
    })),
  };
}

// ─── Hook ────────────────────────────────────────────────────────────

export function useMonitoreo(): MonitoreoResult {
  const [isLoading, setIsLoading] = useState(true);
  const [godchildFound, setGodchildFound] = useState(false);
  const [godchild, setGodchild] = useState<GodchildInfo | null>(null);
  const [stats, setStats] = useState<GodchildStats | null>(null);
  const [recentLogs, setRecentLogs] = useState<RecentLogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getGodchildProfile()
      .then((data) => {
        if (cancelled) return;
        const mapped = mapProfile(data);
        setGodchild(mapped.godchild);
        setStats(mapped.stats);
        setRecentLogs(mapped.recentLogs);
        setGodchildFound(true);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        // 404 = no hay ahijado activo, no es un error de UI
        if (err.message.includes('404') || err.message.toLowerCase().includes('not found')) {
          setGodchildFound(false);
        } else {
          setError(err.message ?? 'Error al cargar los datos del ahijado');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { isLoading, godchildFound, godchild, stats, recentLogs, error };
}

