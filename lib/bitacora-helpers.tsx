// lib/bitacora-helpers.tsx
// Constantes visuales y utilidades puras de la sección Bitácora.
// Ningún componente de página debe contener esta lógica directamente.

import React from "react";
import { MOOD_OPTIONS } from "@/lib/constants";
import type { MoodId } from "@/types";

// ─── Iconos SVG ───────────────────────────────────────────────────────────────

export const MOOD_ICONS: Record<MoodId, React.ReactNode> = {
  feliz: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  calmado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 15h6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  motivado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12h6M12 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  esperanzado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 13.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 8.5l0.5 1M15 8.5l-0.5 1" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1" fill="currentColor"/>
    </svg>
  ),
  agradecido: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 13s1 2.5 3.5 2.5 3.5-2.5 3.5-2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9.5c0 0 0-1.5 1.5-1" strokeLinecap="round"/>
      <path d="M15 9.5c0 0 0-1.5-1.5-1" strokeLinecap="round"/>
    </svg>
  ),
  ansioso: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 15.5s1-1 3.5-1 3.5 1 3.5 1" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1" fill="none" stroke="currentColor"/>
      <circle cx="15" cy="9.5" r="1" fill="none" stroke="currentColor"/>
    </svg>
  ),
  confundido: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 15c0 0 1-0.5 3 0s3 0.5 3 0.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
      <path d="M14 7c0.5-0.8 1.5-0.8 2-0.2" strokeLinecap="round"/>
    </svg>
  ),
  agotado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 15h6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9.5c0.8-0.3 1.8-0.3 2 0.5" strokeLinecap="round"/>
      <path d="M14 10c0.2-0.8 1.2-0.8 2-0.5" strokeLinecap="round"/>
    </svg>
  ),
  triste: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  enojado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 16s1-1.5 3.5-1.5 3.5 1.5 3.5 1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8.5l2.5 1.5M16 8.5l-2.5 1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// ─── Paleta de colores por estado de ánimo ────────────────────────────────────

export const MOOD_COLORS: Record<MoodId, { text: string; bg: string; border: string }> = {
  feliz:       { text: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  calmado:     { text: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
  motivado:    { text: "#64748b", bg: "#f8fafc", border: "#e2e8f0" },
  esperanzado: { text: "#0d9488", bg: "#f0fdfa", border: "#99f6e4" },
  agradecido:  { text: "#db2777", bg: "#fdf2f8", border: "#f9a8d4" },
  ansioso:     { text: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  confundido:  { text: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  agotado:     { text: "#78716c", bg: "#fafaf9", border: "#e7e5e4" },
  triste:      { text: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
  enojado:     { text: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

// ─── Utilidades puras ─────────────────────────────────────────────────────────

/** Etiqueta legible para un nivel de ánimo (1–10). */
export function getMoodLabel(level: number): string {
  if (level <= 2) return "Muy desanimado";
  if (level <= 4) return "Desanimado";
  if (level <= 6) return "Neutral";
  if (level <= 8) return "Animado";
  return "Muy animado";
}

/** Etiqueta legible para un MoodId (feliz, calmado…). */
export function getMoodDisplayLabel(moodId: MoodId): string {
  return MOOD_OPTIONS.find((m) => m.id === moodId)?.label ?? moodId;
}

/** Color hex para un nivel de ánimo (1–10). */
export function getMoodColor(level: number): string {
  if (level <= 2) return "#dc2626";
  if (level <= 4) return "#d97706";
  if (level <= 6) return "#64748b";
  if (level <= 8) return "#0ea5e9";
  return "#16a34a";
}

/** Color hex para un nivel de craving (1–10). */
export function getCravingColor(level: number): string {
  if (level <= 3) return "#16a34a";
  if (level <= 6) return "#d97706";
  return "#dc2626";
}

/**
 * Genera el background CSS de un slider con relleno de izquierda a derecha.
 * @param level  Valor actual (1–10)
 * @param color  Color hex del relleno
 */
export function getSliderTrack(level: number, color: string): string {
  const pct = `${((level - 1) / 9) * 100}%`;
  return `linear-gradient(to right, ${color} 0%, ${color} ${pct}, #e2e8f0 ${pct}, #e2e8f0 100%)`;
}

/** Formatea una fecha ISO en partes legibles en español. */
export function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
  };
}
