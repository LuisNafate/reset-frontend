"use client";

import React from "react";
import { useBitacora } from "@/hooks/useBitacora";
import { MOOD_COLORS, formatDate, getMoodDisplayLabel } from "@/lib/bitacora-helpers";
import BitacoraEntryModal from "@/components/features/dashboard/BitacoraEntryModal";
import type { JournalEntry, MoodId } from "@/types";
import type { TrackingLogFilters } from "@/lib/api/tracking";

type FilterMode = "recent" | "month" | "day" | "range";

const MONTH_LABELS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function buildFilterSummary(
  mode: FilterMode,
  year: number,
  month: number,
  day: number,
  from: string,
  to: string
): string {
  if (mode === "recent") return "Últimos 5 registros";
  if (mode === "month") return `${MONTH_LABELS[month - 1]} ${year}`;
  if (mode === "day") return `${day} de ${MONTH_LABELS[month - 1]} de ${year}`;
  if (from && to) return `${from} → ${to}`;
  return "Rango personalizado";
}

export default function BitacoraPage() {
  const [filterMode, setFilterMode] = React.useState<FilterMode>("recent");
  const [filterYear, setFilterYear] = React.useState(() => new Date().getFullYear());
  const [filterMonth, setFilterMonth] = React.useState(() => new Date().getMonth() + 1);
  const [filterDay, setFilterDay] = React.useState(() => new Date().getDate());
  const [rangeFrom, setRangeFrom] = React.useState(() => toDateInputValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
  const [rangeTo, setRangeTo] = React.useState(() => toDateInputValue(new Date()));

  const normalizedRange =
    rangeFrom && rangeTo && rangeFrom > rangeTo
      ? { from: rangeTo, to: rangeFrom }
      : { from: rangeFrom, to: rangeTo };

  const activeFilters: TrackingLogFilters =
    filterMode === "month"
      ? { year: filterYear, month: filterMonth }
      : filterMode === "day"
        ? { year: filterYear, month: filterMonth, day: filterDay }
        : filterMode === "range"
          ? normalizedRange
          : {};

  const daysInSelectedMonth = getDaysInMonth(filterYear, filterMonth);

  React.useEffect(() => {
    if (filterDay > daysInSelectedMonth) {
      setFilterDay(daysInSelectedMonth);
    }
  }, [daysInSelectedMonth, filterDay]);

  const {
    entries,
    isLoadingEntries,
    title,
    moodLevel,
    setMoodLevel,
    moodColor,
    moodTrack,
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
  } = useBitacora(activeFilters);

  const filterSummary = buildFilterSummary(
    filterMode,
    filterYear,
    filterMonth,
    filterDay,
    normalizedRange.from,
    normalizedRange.to
  );

  const yearOptions = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = Math.max(2015, currentYear - 8);
    const years: number[] = [];

    for (let year = currentYear + 1; year >= startYear; year -= 1) {
      years.push(year);
    }

    return years;
  }, []);

  // ── Entrada seleccionada para ver detalle ─────────────────────────────
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null);

  const entry = selectedEntry;
  const hasActiveFilter = filterMode !== "recent";
  const visibleEntries = filterMode === "recent" ? entries.slice(0, 5) : entries;

  return (
    <>
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-8 sm:py-14">

        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <p
            className="font-jetbrains text-[11px] tracking-[1.8px] uppercase rs-text-muted mb-1"
          >
            Registro Personal
          </p>
          <h1
            className="font-playfair text-[clamp(28px,7vw,42px)] font-normal rs-text-heading leading-none mb-2"
          >
            Bitácora Diaria
          </h1>
          <p
            className="font-jetbrains text-[13px] rs-text-caption"
          >
            Cada entrada queda guardada y ordenada en el tiempo.
          </p>
        </div>

        {/* ─── Formulario nueva entrada ────────────────────────────────────── */}
        <div
          className="bg-(--surface-card) border border-(--ui-border) rounded-sm overflow-hidden mb-10"
          style={{ boxShadow: "0px 4px 20px -8px rgba(0,0,0,0.18)" }}
        >
          {/* Cabecera del form */}
          <div className="px-6 pt-6 pb-4 border-b border-(--ui-border)">
            <p
              className="font-jetbrains text-[11px] tracking-[1.8px] uppercase rs-text-muted"
            >
              Nueva Entrada
            </p>
          </div>

          <div className="p-6">
            {/* ── Slider: Estado de Ánimo ── */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p
                  className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-muted"
                >
                  Estado de Ánimo
                </p>
                <span
                  className="font-jetbrains text-[13px] tabular-nums"
                  style={{ color: moodColor }}
                >
                  {moodLevel}<span className="text-[11px] rs-text-caption">/10</span>
                </span>
              </div>
              <input
                type="range"
                min={1} max={10} step={1}
                value={moodLevel}
                onChange={(e) => setMoodLevel(Number(e.target.value))}
                className="w-full h-1.5 rounded-full cursor-pointer appearance-none"
                style={{ background: moodTrack, accentColor: moodColor }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-jetbrains text-[11px] rs-text-caption">Muy bajo</span>
                <span className="font-jetbrains text-[11px] rs-text-caption">Muy alto</span>
              </div>
            </div>

            {/* ── Slider: Nivel de Craving ── */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p
                  className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-muted"
                >
                  Nivel de Craving <span className="lowercase text-[10px] opacity-70">(ansia o deseo intenso de consumir)</span>
                </p>
                <span
                  className="font-jetbrains text-[13px] tabular-nums"
                  style={{ color: cravingColor }}
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
                <span className="font-jetbrains text-[11px] rs-text-caption">Sin deseo</span>
                <span className="font-jetbrains text-[11px] rs-text-caption">Muy intenso</span>
              </div>
            </div>

            {/* Título */}
            <p
              className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-muted mb-2"
            >
              Título
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dale un título a esta entrada..."
              className="font-jetbrains w-full bg-(--surface-input) border border-(--ui-border) rounded-lg px-4 py-2.5 text-[14px] rs-text-body placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all mb-4"
            />

            {/* Notas */}
            <p
              className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-muted mb-2"
            >
              Notas del Día
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe aquí lo que tu alma necesite expresar..."
              rows={4}
              className="font-jetbrains w-full bg-transparent border border-(--ui-border) rounded-lg p-4 text-[14px] leading-[1.8] rs-text-body placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-slate-300 dark:focus:border-slate-700 focus:ring-1 focus:ring-slate-200 resize-none transition-all mb-4"
            />

            {/* Toggle consumo */}
            <div className="flex items-center gap-3 py-3 border-t border-b border-(--ui-border) mb-5">
              <div className="flex-1">
                <p
                  className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-muted"
                >
                  ¿Consumiste hoy?
                </p>
                <p
                  className="font-jetbrains text-[12px] rs-text-caption mt-0.5"
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
                className="font-jetbrains text-[11px] uppercase w-5 text-right"
                style={{ color: consumed ? "#f87171" : "#94a3b8" }}
              >
                {consumed ? "Sí" : "No"}
              </span>
            </div>

            {/* Feedback */}
            {error && (
              <p className="font-jetbrains mb-3 text-[12px] text-red-400">
                {error}
              </p>
            )}
            {saved && (
              <p className="font-jetbrains mb-3 text-[12px] text-teal-500">
                Entrada guardada correctamente ✓
              </p>
            )}

            {/* Botón guardar */}
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="font-jetbrains flex items-center gap-3 justify-center w-full h-12 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors text-[11px] tracking-[2px] uppercase"
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <p
                className="font-jetbrains text-[11px] tracking-[1.8px] uppercase rs-text-muted"
              >
                Mis Registros
              </p>
              <p className="font-jetbrains text-[11px] rs-text-caption mt-1">
                {filterSummary}
              </p>
            </div>
            {!isLoadingEntries && (
              <span
                className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption"
              >
                {visibleEntries.length} {visibleEntries.length === 1 ? "entrada" : "entradas"}
              </span>
            )}
          </div>

          {/* ─── Filtros de historial ─────────────────────────────────────── */}
          <div
            className="bg-(--surface-card) border border-(--ui-border) rounded-sm overflow-hidden mb-6"
            style={{ boxShadow: "0px 4px 20px -8px rgba(0,0,0,0.16)" }}
          >
            <div className="px-6 pt-6 pb-4 border-b border-(--ui-border) flex items-center justify-between gap-3">
              <div>
                <p className="font-jetbrains text-[11px] tracking-[1.8px] uppercase rs-text-muted">
                  Consulta del Historial
                </p>
                <p className="font-jetbrains text-[12px] rs-text-caption mt-1">
                  {filterSummary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFilterMode("recent")}
                className="font-jetbrains text-[10px] uppercase tracking-[1.6px] px-3 py-2 rounded-sm border border-(--ui-border) rs-text-caption hover:border-slate-300 hover:text-slate-700 transition-colors"
              >
                Ver recientes
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                {([
                  ["recent", "Recientes"],
                  ["month", "Mes"],
                  ["day", "Día"],
                  ["range", "Rango"],
                ] as const).map(([mode, label]) => {
                  const isActive = filterMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFilterMode(mode)}
                      className="font-jetbrains text-[10px] uppercase tracking-[1.6px] px-3.5 py-2 rounded-full border transition-colors"
                      style={{
                        borderColor: isActive ? "var(--ui-border)" : "var(--ui-border-subtle)",
                        backgroundColor: isActive ? "rgba(59,130,246,0.08)" : "transparent",
                        color: isActive ? "#1d4ed8" : "var(--ui-text-caption)",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {filterMode === "recent" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-sm border border-dashed border-(--ui-border) px-4 py-3">
                    <p className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted mb-1">
                      Vista rápida
                    </p>
                    <p className="font-jetbrains text-[12px] rs-text-caption">
                      Se muestran tus últimos 5 registros.
                    </p>
                  </div>
                  <div className="rounded-sm border border-dashed border-(--ui-border) px-4 py-3">
                    <p className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted mb-1">
                      Consejo
                    </p>
                    <p className="font-jetbrains text-[12px] rs-text-caption">
                      Usa mes o día para navegar rápido por el calendario.
                    </p>
                  </div>
                </div>
              )}

              {filterMode === "month" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Año
                    </span>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(Number(e.target.value))}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Mes
                    </span>
                    <select
                      value={filterMonth}
                      onChange={(e) => setFilterMonth(Number(e.target.value))}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    >
                      {MONTH_LABELS.map((label, index) => (
                        <option key={label} value={index + 1}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {filterMode === "day" && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Año
                    </span>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(Number(e.target.value))}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Mes
                    </span>
                    <select
                      value={filterMonth}
                      onChange={(e) => setFilterMonth(Number(e.target.value))}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    >
                      {MONTH_LABELS.map((label, index) => (
                        <option key={label} value={index + 1}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Día
                    </span>
                    <select
                      value={filterDay}
                      onChange={(e) => setFilterDay(Number(e.target.value))}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    >
                      {Array.from({ length: daysInSelectedMonth }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {filterMode === "range" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Desde
                    </span>
                    <input
                      type="date"
                      value={rangeFrom}
                      onChange={(e) => setRangeFrom(e.target.value)}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[1.4px] rs-text-muted">
                      Hasta
                    </span>
                    <input
                      type="date"
                      value={rangeTo}
                      onChange={(e) => setRangeTo(e.target.value)}
                      className="font-jetbrains h-11 rounded-lg border border-(--ui-border) bg-(--surface-input) px-4 text-[13px] outline-none focus:border-sky-300"
                    />
                  </label>
                </div>
              )}
            </div>
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
                className="font-jetbrains text-[13px] rs-text-caption"
              >
                {hasActiveFilter
                  ? "No hay entradas para este filtro. Prueba otra fecha o vuelve a recientes."
                  : "Aún no hay entradas. ¡Escribe tu primera nota!"}
              </p>
            </div>
          )}

          {/* Tarjetas de entradas */}
          <div className="flex flex-col gap-3">
            {visibleEntries.map((entry) => {
              const { date, time } = formatDate(entry.createdAt);
              const colors = MOOD_COLORS[entry.mood as MoodId];
              const entryMoodLabel = getMoodDisplayLabel(entry.mood as MoodId);
              return (
                <div
                  key={entry.id}
                  className="bg-(--surface-card) border border-(--ui-border) rounded-sm p-5 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
                  onClick={() => setSelectedEntry(entry)}
                >
                  {/* Header de tarjeta */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      {/* Mood badge */}
                      <div
                        className="flex items-center px-2.5 py-1 rounded-full shrink-0"
                        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                      >
                        <span
                          className="font-jetbrains text-[11px] uppercase tracking-[0.5px]"
                          style={{ color: colors.text }}
                        >
                          {entryMoodLabel}
                        </span>
                      </div>

                      {/* Consumed badge */}
                      {entry.consumed && (
                        <span
                          className="font-jetbrains text-[11px] uppercase tracking-[0.5px] px-2 py-0.5 rounded-full shrink-0"
                          style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444" }}
                        >
                          Consumo
                        </span>
                      )}
                    </div>

                    {/* Fecha + eliminar */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p
                          className="font-jetbrains text-[11px] uppercase rs-text-muted leading-tight"
                        >
                          {date}
                        </p>
                        <p
                          className="font-jetbrains text-[11px] rs-text-caption leading-tight"
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
                    className="font-jetbrains text-[17px] rs-text-body leading-snug mb-1.5"
                  >
                    {entry.title || "Sin título"}
                  </h3>

                  {/* Extracto de notas */}
                  <p
                    className="font-playfair text-[13px] rs-text-muted leading-relaxed line-clamp-2"
                  >
                    {entry.notes}
                  </p>

                  {/* Leer más */}
                  <p
                    className="font-jetbrains mt-2 text-[11px] uppercase tracking-[1px] rs-text-caption"
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
