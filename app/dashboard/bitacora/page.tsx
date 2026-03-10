"use client";

import React from "react";
import { useBitacora } from "@/hooks/useBitacora";
import { MOOD_ICONS, MOOD_COLORS, formatDate, getMoodDisplayLabel } from "@/lib/bitacora-helpers";
import { MOOD_OPTIONS } from "@/lib/constants";
import BitacoraEntryModal from "@/components/features/dashboard/BitacoraEntryModal";
import type { JournalEntry, MoodId } from "@/types";

export default function BitacoraPage() {
  const {
    entries,
    isLoadingEntries,
    title,
    moodLevel,
    setMoodLevel,
    cravingLevel,
    setCravingLevel,
    cravingColor,
    cravingTrack,
    notes,
    consumed,
    isSubmitting,
    error,
    saved,
    setTitle,
    setNotes,
    setConsumed,
    handleSave,
    handleDelete,
  } = useBitacora();

  // ── Entrada seleccionada para ver detalle ─────────────────────────────
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null);

  // Mapeo mood ID → moodLevel numérico (igual al de useBitacora)
  const MOOD_TO_LEVEL: Record<string, number> = {
    feliz: 9, motivado: 8, agradecido: 8, esperanzado: 7, calmado: 7,
    confundido: 5, ansioso: 4, agotado: 3, triste: 3, enojado: 2,
  };
  // Estado de ánimo seleccionado en el picker (se deriva del moodLevel actual)
  // Se usa para resaltar el ícono correspondiente
  const activeMoodId: string | null = Object.entries(MOOD_TO_LEVEL)
    .sort((a, b) => Math.abs(a[1] - moodLevel) - Math.abs(b[1] - moodLevel))[0]?.[0] ?? null;

  const entry = selectedEntry;

  return (
    <>
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-8 sm:py-14">

        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <p
            className="text-[11px] tracking-[1.8px] uppercase rs-text-muted mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Registro Personal
          </p>
          <h1
            className="text-[42px] font-normal rs-text-heading leading-none mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bitácora Diaria
          </h1>
          <p
            className="text-[12px] italic rs-text-caption"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cada entrada queda guardada y ordenada en el tiempo.
          </p>
        </div>

        {/* ─── Formulario nueva entrada ────────────────────────────────────── */}
        <div
          className="bg-[var(--surface-card)] border border-[var(--ui-border)] rounded-sm overflow-hidden mb-10"
          style={{ boxShadow: "0px 4px 20px -8px rgba(0,0,0,0.18)" }}
        >
          {/* Cabecera del form */}
          <div className="px-6 pt-6 pb-4 border-b border-[var(--ui-border)]">
            <p
              className="text-[11px] tracking-[1.8px] uppercase rs-text-muted"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Nueva Entrada
            </p>
          </div>

          <div className="p-6">
            {/* ── Selector visual: Estado de Ánimo ── */}
            <div className="mb-5">
              <p
                className="text-[11px] tracking-[1px] uppercase rs-text-muted mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Estado de Ánimo
              </p>
              <div className="grid grid-cols-5 gap-2">
                {MOOD_OPTIONS.map(({ id, label }) => {
                  const colors = MOOD_COLORS[id as MoodId];
                  const isActive = activeMoodId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMoodLevel(MOOD_TO_LEVEL[id] ?? 5)}
                      className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg border transition-all"
                      style={{
                        borderColor: isActive ? colors.border : "var(--ui-border-subtle)",
                        background: isActive ? colors.bg : "var(--surface-card-inner)",
                        color: isActive ? colors.text : "var(--ui-text-muted)",
                      }}
                      aria-pressed={isActive}
                      title={label}
                    >
                      <span style={{ color: isActive ? colors.text : "var(--ui-text-muted)", display: "flex" }}>
                        {MOOD_ICONS[id as MoodId]}
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-[0.5px] leading-tight text-center"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Slider: Nivel de Craving ── */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-[11px] tracking-[1px] uppercase rs-text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Nivel de Craving
                </p>
                <span
                  className="text-[13px] tabular-nums"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: cravingColor }}
                >
                  {cravingLevel}<span className="text-[11px] rs-text-caption">/10</span>
                </span>
              </div>
              <input
                type="range"
                min={1} max={10} step={1}
                value={cravingLevel}
                onChange={(e) => setCravingLevel(Number(e.target.value))}
                className="w-full h-1.5 rounded-full cursor-pointer appearance-none"
                style={{ background: cravingTrack, accentColor: cravingColor }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sin deseo</span>
                <span className="text-[10px] rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Muy intenso</span>
              </div>
            </div>

            {/* Título */}
            <p
              className="text-[11px] tracking-[1px] uppercase rs-text-muted mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Título
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dale un título a esta entrada..."
              className="w-full bg-[var(--surface-input)] border border-[var(--ui-border)] rounded-lg px-4 py-2.5 rs-text-body placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic" }}
            />

            {/* Notas */}
            <p
              className="text-[11px] tracking-[1px] uppercase rs-text-muted mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Notas del Día
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe aquí lo que tu alma necesite expresar..."
              rows={4}
              className="w-full bg-transparent border border-[var(--ui-border)] rounded-lg p-4 rs-text-body placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-slate-300 dark:focus:border-slate-700 focus:ring-1 focus:ring-slate-200 resize-none transition-all mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, lineHeight: "1.8", fontStyle: "italic" }}
            />

            {/* Toggle consumo */}
            <div className="flex items-center gap-3 py-3 border-t border-b border-[var(--ui-border)] mb-5">
              <div className="flex-1">
                <p
                  className="text-[11px] tracking-[1px] uppercase rs-text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ¿Consumiste hoy?
                </p>
                <p
                  className="text-[11px] italic rs-text-caption mt-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ser honesto ayuda a mantener tu racha actualizada.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consumed}
                onClick={() => setConsumed(!consumed)}
                className="relative rounded-full transition-colors duration-200 shrink-0"
                style={{ width: 40, height: 22, backgroundColor: consumed ? "#f87171" : "#e2e8f0" }}
              >
                <span
                  className="absolute rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{ width: 16, height: 16, top: 3, left: 3, transform: consumed ? "translateX(18px)" : "translateX(0)" }}
                />
              </button>
              <span
                className="text-[11px] uppercase w-5 text-right"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: consumed ? "#f87171" : "#94a3b8" }}
              >
                {consumed ? "Sí" : "No"}
              </span>
            </div>

            {/* Feedback */}
            {error && (
              <p className="mb-3 text-[11px] text-red-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {error}
              </p>
            )}
            {saved && (
              <p className="mb-3 text-[11px] text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Entrada guardada correctamente ✓
              </p>
            )}

            {/* Botón guardar */}
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center gap-3 justify-center w-full h-12 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}
            >
              {isSubmitting ? (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {isSubmitting ? "Guardando..." : "Guardar en mi Bitácora"}
            </button>
          </div>
        </div>

        {/* ─── Lista de entradas ───────────────────────────────────────────── */}
        <div>
          {/* Cabecera de sección */}
          <div className="flex items-center justify-between mb-5">
            <p
              className="text-[11px] tracking-[1.8px] uppercase rs-text-muted"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mis Registros
            </p>
            {!isLoadingEntries && (
              <span
                className="text-[11px] tracking-[1px] uppercase rs-text-caption"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {entries.length} {entries.length === 1 ? "entrada" : "entradas"}
              </span>
            )}
          </div>

          {/* Estado de carga */}
          {isLoadingEntries && (
            <div className="flex items-center justify-center py-14">
              <svg className="animate-spin text-slate-300" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Sin entradas */}
          {!isLoadingEntries && entries.length === 0 && (
            <div className="text-center py-14 border border-dashed border-slate-300 rounded-sm">
              <p
                className="text-[13px] italic rs-text-caption"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aún no hay entradas. ¡Escribe tu primera nota!
              </p>
            </div>
          )}

          {/* Tarjetas de entradas */}
          <div className="flex flex-col gap-3">
            {entries.map((entry) => {
              const { date, time } = formatDate(entry.createdAt);
              const colors = MOOD_COLORS[entry.mood as MoodId];
              const entryMoodLabel = getMoodDisplayLabel(entry.mood as MoodId);
              return (
                <div
                  key={entry.id}
                  className="bg-[var(--surface-card)] border border-[var(--ui-border)] rounded-sm p-5 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
                  onClick={() => setSelectedEntry(entry)}
                >
                  {/* Header de tarjeta */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      {/* Mood badge */}
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0"
                        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                      >
                        <span style={{ color: colors.text, display: "flex", transform: "scale(0.7)", transformOrigin: "center" }}>
                          {MOOD_ICONS[entry.mood as MoodId]}
                        </span>
                        <span
                          className="text-[10px] uppercase tracking-[0.5px]"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.text }}
                        >
                          {entryMoodLabel}
                        </span>
                      </div>

                      {/* Consumed badge */}
                      {entry.consumed && (
                        <span
                          className="text-[10px] uppercase tracking-[0.5px] px-2 py-0.5 rounded-full shrink-0"
                          style={{ fontFamily: "'JetBrains Mono', monospace", backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444" }}
                        >
                          Consumo
                        </span>
                      )}
                    </div>

                    {/* Fecha + eliminar */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p
                          className="text-[11px] uppercase rs-text-muted leading-tight"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {date}
                        </p>
                        <p
                          className="text-[11px] rs-text-caption leading-tight"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {time}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                        className="rs-text-caption hover:text-red-400 transition-colors"
                        aria-label="Eliminar entrada"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Título */}
                  <h3
                    className="text-[17px] italic rs-text-body leading-snug mb-1.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {entry.title || "Sin título"}
                  </h3>

                  {/* Extracto de notas */}
                  <p
                    className="text-[13px] rs-text-muted leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {entry.notes}
                  </p>

                  {/* Leer más */}
                  <p
                    className="mt-2 text-[11px] uppercase tracking-[1px] rs-text-caption"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Toca para leer completo →
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>

    {/* ─── Modal detalle de entrada ───────────────────────────────────────── */}
    {entry && (
      <BitacoraEntryModal
        entry={entry}
        onClose={() => setSelectedEntry(null)}
        onDelete={(id) => { handleDelete(id); setSelectedEntry(null); }}
      />
    )}
  </>
  );
}
