"use client";

import React from "react";
import Link from "next/link";
import { useMonitoreo } from "@/hooks/useMonitoreo";

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
  triste: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#6366f1"/>
      <circle cx="15" cy="9.5" r="1" fill="#6366f1"/>
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
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

function plantStageFromDays(days: number): { name: string; stage: string } {
  if (days < 7)   return { name: "Semilla de Esperanza",    stage: "Estadio I"  };
  if (days < 30)  return { name: "Brote de Voluntad",       stage: "Estadio II" };
  if (days < 90)  return { name: "Planta de Fortaleza",     stage: "Estadio III"};
  if (days < 180) return { name: "Árbol de Resiliencia",    stage: "Estadio IV" };
  return           { name: "Ciprés de la Transformación",   stage: "Estadio V"  };
}

function formatRelativeDate(isoDate: string): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return `Hoy ${d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}`;
    if (diffDays === 1) return "Ayer";
    return `Hace ${diffDays} días`;
  } catch {
    return isoDate;
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MonitoreoPage() {
  const { isLoading, godchildFound, godchild, stats, recentLogs } = useMonitoreo();

  // ── Estado de carga ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-[10px] text-slate-400 tracking-[1px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Buscando ahijado...
          </p>
        </div>
      </div>
    );
  }

  // ── Estado vacío: sin ahijado conectado ──────────────────────────────────────
  if (!godchildFound) {
    return (
      <div className="min-h-full">
        <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
          {/* Header */}
          <p
            className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Panel de Acompañante —
          </p>
          <h1
            className="text-[44px] font-normal text-slate-800 leading-none mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Monitoreo
          </h1>
          <p
            className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Sin ahijado conectado aún
          </p>

          {/* Ilustración vacía */}
          <div
            className="border border-slate-200 bg-white rounded-sm p-10 mb-6 flex flex-col items-center text-center"
            style={{ boxShadow: "8px 8px 0px 0px rgba(13, 148, 136, 0.04)" }}
          >
            {/* Árbol dormido */}
            <svg width="80" height="100" viewBox="0 0 90 110" fill="none" className="mb-5 opacity-30">
              <rect x="40" y="80" width="10" height="30" rx="2" fill="#a16207"/>
              <polygon points="45,10 15,55 75,55" fill="#94a3b8"/>
              <polygon points="45,25 12,72 78,72" fill="#cbd5e1"/>
              <polygon points="45,40 18,85 72,85" fill="#e2e8f0"/>
            </svg>

            <p
              className="text-[20px] font-normal text-slate-700 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aún no tienes un ahijado conectado
            </p>
            <p
              className="text-[11px] text-slate-400 leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Cuando alguien en recuperación introduzca tu identificador de padrino en la sección de Configuración de su app, aparecerá aquí automáticamente.
            </p>

            <div className="border border-teal-100 bg-teal-50 rounded-sm p-5 w-full max-w-sm text-left mb-5">
              <p
                className="text-[8px] tracking-[1.5px] uppercase text-teal-600 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ¿Cómo conectarse?
              </p>
              <ol className="space-y-1.5">
                {[
                  "Tu ahijado abre su app y va a Configuración.",
                  "En la sección «Padrino de Apoyo» introduce tu correo o código.",
                  "La conexión se establece automáticamente.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="text-[9px] text-teal-400 font-bold mt-0.5 flex-shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {i + 1}.
                    </span>
                    <p
                      className="text-[11px] italic text-teal-700 leading-relaxed"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <Link
              href="/acompanante/cuenta"
              className="inline-flex items-center gap-2 text-[9px] tracking-[1.5px] uppercase text-teal-600 border border-teal-200 hover:bg-teal-50 transition-colors px-6 py-2.5 rounded"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Ver mi perfil →
            </Link>
          </div>

          {/* Protocolo siempre visible */}
          <div className="border border-red-100 bg-red-50 rounded-sm p-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p
                  className="text-[9px] tracking-[1.5px] uppercase text-red-400 mb-1.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Protocolo de Emergencia
                </p>
                <p
                  className="text-[13px] italic text-red-700 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Cuando tengas un ahijado conectado...
                </p>
                <p
                  className="text-[11px] text-red-500 leading-relaxed"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Si presiona el botón &apos;Raíz de Emergencia&apos;, recibirás una notificación inmediata. Por favor, contáctale lo antes posible o llama al servicio de emergencias si es necesario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Ahijado conectado: datos reales ──────────────────────────────────────────
  const sobrietyDays = stats?.sobrietyDays ?? godchild?.sobrietyDays ?? 0;
  const { name: plantName, stage: plantStage } = plantStageFromDays(sobrietyDays);
  const godchildName = godchild?.name ?? "Tu ahijado";

  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Panel de Acompañante —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Progreso de {godchildName}
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Oasis de Sobriedad — Monitoreo Activo
        </p>

        {/* Tarjeta de progreso principal */}
        <div
          className="border border-slate-200 bg-white rounded-sm p-8 mb-6"
          style={{ boxShadow: "8px 8px 0px 0px rgba(13, 148, 136, 0.06)" }}
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            {/* Árbol */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] animate-float">
              <svg width="90" height="110" viewBox="0 0 90 110" fill="none" className="animate-sway">
                <rect x="40" y="80" width="10" height="30" rx="2" fill="#a16207" opacity="0.7"/>
                <polygon points="45,10 15,55 75,55" fill="#0d9488" opacity="0.85"/>
                <polygon points="45,25 12,72 78,72" fill="#14b8a6" opacity="0.7"/>
                <polygon points="45,40 18,85 72,85" fill="#2dd4bf" opacity="0.5"/>
                <polygon points="45,8 46.5,12 51,12 47.5,15 49,19 45,16.5 41,19 42.5,15 39,12 43.5,12" fill="#f0fdf4"/>
              </svg>
              <div className="text-center">
                <p className="text-[8px] tracking-[1.5px] uppercase text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plantName}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plantStage}
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="text-[56px] font-normal text-slate-800 leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {sobrietyDays}
                </span>
                <div>
                  <p className="text-[9px] tracking-[1.5px] uppercase text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Días
                  </p>
                  <p className="text-[9px] tracking-[1.2px] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    En recuperación
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 mb-5">
                <div>
                  <p className="text-[24px] font-normal text-teal-600 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stats?.notesThisWeek ?? 0}
                  </p>
                  <p className="text-[9px] text-slate-400 tracking-[0.8px] uppercase mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Notas totales
                  </p>
                </div>
                <div className="w-px bg-slate-100" />
                <div>
                  <p className="text-[24px] font-normal text-teal-600 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stats?.consistency ?? 0}%
                  </p>
                  <p className="text-[9px] text-slate-400 tracking-[0.8px] uppercase mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Constancia
                  </p>
                </div>
              </div>

              {/* Indicador online */}
              {recentLogs.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <div className="absolute w-4 h-4 rounded-full bg-teal-300 animate-pulse-ring" />
                    <div className="w-2 h-2 rounded-full bg-teal-500 relative z-10" />
                  </div>
                  <p className="text-[10px] text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Última actividad: {formatRelativeDate(recentLogs[0].date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[9px] tracking-[2px] uppercase text-teal-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Actividad Reciente
            </p>
          </div>

          {recentLogs.length === 0 ? (
            <p className="text-[12px] italic text-slate-400 py-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tu ahijado aún no ha registrado actividad.
            </p>
          ) : (
            recentLogs.map((item, i) => (
              <div key={item.id} className={`flex items-start gap-4 py-4 ${i > 0 ? "border-t border-slate-50" : ""}`}>
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {MOOD_SVG[item.moodId] ?? MOOD_SVG.calmado}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] italic text-slate-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.moodLabel}
                    </p>
                    {item.isShared && (
                      <span className="text-[8px] tracking-[1px] uppercase text-teal-400 bg-teal-50 px-2 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Compartido
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.notes ? `"${item.notes.slice(0, 80)}${item.notes.length > 80 ? "..." : ""}"` : "Registro emocional sin nota adjunta."}
                  </p>
                </div>
                <p className="text-[9px] text-slate-300 whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatRelativeDate(item.date)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Protocolo de emergencia */}
        <div className="border border-red-100 bg-red-50 rounded-sm p-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[9px] tracking-[1.5px] uppercase text-red-400 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Protocolo de Emergencia
              </p>
              <p className="text-[13px] italic text-red-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Si {godchildName} presiona el botón &apos;Raíz de Emergencia&apos;...
              </p>
              <p className="text-[11px] text-red-500 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Recibirás una notificación inmediata con su ubicación aproximada. Por favor, contáctale lo antes posible o llama al servicio de emergencias si es necesario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
