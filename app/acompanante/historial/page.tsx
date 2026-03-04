"use client";

import React from "react";
import Link from "next/link";
import { useMonitoreo } from "@/hooks/useMonitoreo";
import type { RecentLogEntry } from "@/hooks/useMonitoreo";

// ─── SVGs de estado emocional ─────────────────────────────────────────────────

const MOOD_SVG: Record<string, React.ReactNode> = {
  calmado: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M9 15h6" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#0d9488"/>
      <circle cx="15" cy="9.5" r="1" fill="#0d9488"/>
    </svg>
  ),
  ansioso: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 15.5s1-1 3.5-1 3.5 1 3.5 1" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#f59e0b"/>
      <circle cx="15" cy="9.5" r="1" fill="#f59e0b"/>
    </svg>
  ),
  alegre: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#0ea5e9"/>
      <circle cx="15" cy="9.5" r="1" fill="#0ea5e9"/>
    </svg>
  ),
  motivado: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1.5" fill="#14b8a6"/>
      <circle cx="15" cy="9.5" r="1.5" fill="#14b8a6"/>
    </svg>
  ),
  triste: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#6366f1"/>
      <circle cx="15" cy="9.5" r="1" fill="#6366f1"/>
    </svg>
  ),
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

const MOOD_SCORE: Record<string, number> = {
  triste: 1, ansioso: 2, calmado: 3, motivado: 4, alegre: 5,
};

function moodToY(moodId: string, chartH = 70): number {
  const score = MOOD_SCORE[moodId] ?? 3;
  // score 1 → y=chartH (bajo), score 5 → y=5 (alto)
  return chartH - ((score - 1) / 4) * (chartH - 5);
}

function buildChartPath(logs: RecentLogEntry[]): { path: string; areaPath: string; points: [number, number][] } {
  if (logs.length === 0) return { path: "", areaPath: "", points: [] };
  const chartW = 400;
  const chartH = 75;
  const step = logs.length > 1 ? chartW / (logs.length - 1) : chartW / 2;

  // Los logs vienen del más reciente al más antiguo; invertimos para el eje temporal
  const ordered = [...logs].reverse();
  const points: [number, number][] = ordered.map((log, i) => [
    logs.length === 1 ? chartW / 2 : i * step,
    moodToY(log.moodId, chartH),
  ]);

  if (points.length === 1) {
    const [x, y] = points[0];
    return {
      path: `M${x-5},${y} L${x+5},${y}`,
      areaPath: `M${x-5},${y} L${x+5},${y} L${x+5},${chartH+5} L${x-5},${chartH+5} Z`,
      points,
    };
  }

  // Curva cúbica suavizada
  let path = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [cx2, cy2] = points[i];
    const cpx = (px + cx2) / 2;
    path += ` C${cpx},${py} ${cpx},${cy2} ${cx2},${cy2}`;
  }
  const areaPath = `${path} L${points[points.length - 1][0]},${chartH + 5} L${points[0][0]},${chartH + 5} Z`;

  return { path, areaPath, points };
}

function formatRelativeDate(isoDate: string): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return `Hoy, ${d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}`;
    if (diffDays === 1) return "Ayer";
    return `Hace ${diffDays} días`;
  } catch { return isoDate; }
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HistorialPage() {
  const { isLoading, godchildFound, godchild, recentLogs } = useMonitoreo();

  // ── Cargando ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-[10px] text-slate-400 tracking-[1px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Cargando historial...
          </p>
        </div>
      </div>
    );
  }

  // ── Sin ahijado conectado ─────────────────────────────────────────────────────
  if (!godchildFound) {
    return (
      <div className="min-h-full">
        <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
          <p
            className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Registros Emocionales —
          </p>
          <h1
            className="text-[44px] font-normal text-slate-800 leading-none mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bitácora de Progreso
          </h1>
          <p
            className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Sin ahijado conectado aún
          </p>

          <div
            className="border border-slate-200 bg-white rounded-sm p-10 flex flex-col items-center text-center"
            style={{ boxShadow: "8px 8px 0px 0px rgba(13, 148, 136, 0.04)" }}
          >
            {/* Gráfico vacío placeholder */}
            <svg width="280" height="70" viewBox="0 0 400 80" className="mb-6 opacity-20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="emptyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,40 C80,38 160,42 240,38 C320,34 360,36 400,40 L400,80 L0,80 Z" fill="url(#emptyGrad)"/>
              <path d="M0,40 C80,38 160,42 240,38 C320,34 360,36 400,40" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4"/>
            </svg>

            <p
              className="text-[20px] font-normal text-slate-700 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No hay historial disponible
            </p>
            <p
              className="text-[11px] text-slate-400 leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              El historial emocional de tu ahijado aparecerá aquí una vez que se establezca la conexión y empiece a registrar su progreso.
            </p>

            <Link
              href="/acompanante"
              className="inline-flex items-center gap-2 text-[9px] tracking-[1.5px] uppercase text-teal-600 border border-teal-200 hover:bg-teal-50 transition-colors px-6 py-2.5 rounded"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ← Volver al panel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Ahijado encontrado: datos reales ─────────────────────────────────────────
  const godchildName = godchild?.name ?? "Tu ahijado";
  const { path, areaPath, points } = buildChartPath(recentLogs);

  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Registros Emocionales —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bitácora de Progreso
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Historial emocional de {godchildName} — Últimas entradas
        </p>

        {/* Gráfico de tendencia */}
        {recentLogs.length > 1 && (
          <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
            <p
              className="text-[9px] tracking-[2px] uppercase text-teal-600 mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Tendencia Emocional
            </p>
            <div className="relative h-[80px]">
              <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#trendGrad)"/>
                <path d={path} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/>
                {points.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3.5" fill="#0d9488"/>
                ))}
              </svg>
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
                <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Muy bien</p>
                <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Regular</p>
                <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Difícil</p>
              </div>
            </div>
          </div>
        )}

        {/* Lista de entradas */}
        <div className="border border-slate-200 bg-white rounded-sm p-8">
          <p
            className="text-[9px] tracking-[2px] uppercase text-teal-600 mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Entradas Recientes
          </p>

          {recentLogs.length === 0 ? (
            <p className="text-[12px] italic text-slate-400 py-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {godchildName} aún no ha registrado entradas en su bitácora.
            </p>
          ) : (
            recentLogs.map((entry, i) => (
              <div key={entry.id} className={`py-5 ${i > 0 ? "border-t border-slate-50" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {MOOD_SVG[entry.moodId] ?? MOOD_SVG.calmado}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p
                        className="text-[15px] italic text-slate-700"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {entry.moodLabel}
                      </p>
                      {entry.isShared ? (
                        <span
                          className="text-[7px] tracking-[1px] uppercase text-teal-400 bg-teal-50 px-2 py-0.5 rounded-full"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Compartido
                        </span>
                      ) : (
                        <span
                          className="text-[7px] tracking-[1px] uppercase text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Privado
                        </span>
                      )}
                      <p
                        className="text-[9px] text-slate-300 ml-auto"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {formatRelativeDate(entry.date)}
                      </p>
                    </div>
                    {entry.notes ? (
                      <p
                        className="text-[12px] italic text-slate-400 leading-relaxed"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        &ldquo;{entry.notes.slice(0, 150)}{entry.notes.length > 150 ? "..." : ""}&rdquo;
                      </p>
                    ) : (
                      <p
                        className="text-[11px] text-slate-300 leading-relaxed"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Registro emocional sin nota adjunta.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
