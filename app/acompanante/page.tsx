"use client";

import React from "react";
import Link from "next/link";
import { useMonitoreo } from "@/hooks/useMonitoreo";
import { MOOD_SVG } from "@/components/ui/MoodIcons";

// Técnica del día para acompañante — rota por día de semana
const TIPS_PADRINO = [
  { nombre: "Escucha Activa", hint: "Escucha sin interrumpir ni ofrecer soluciones de inmediato. Estar presente ya es mucho." },
  { nombre: "Preguntas Abiertas", hint: "¿Cómo estás llevando esta semana? crea más conversación que ¿Estás bien? Prueba con ¿Qué?." },
  { nombre: "Identificar Límites", hint: "¿Qué sí puedes ofrecer y qué no? Définelo con claridad para acompañar de forma sostenible." },
  { nombre: "Apoyo vs Habilitación", hint: "Pregunta: ¿esta acción ayuda a crecer a la persona o la protege de sus propias consecuencias?" },
  { nombre: "Check-in Personal", hint: "¿Cómo te sientes tú hoy? ¿Tienes energía suficiente para acompañar? Tu bienestar importa igual." },
  { nombre: "Comunicación No Violenta", hint: "Observación + sentimiento + necesidad + petición. Las peticiones conectan; las exigencias separan." },
  { nombre: "Protocolo de Crisis", hint: "Mantén la calma. Sin sermones. Pregunta directa: ¿Estás seguro ahora mismo? Tu calma es su primer apoyo." },
];

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
  const { isLoading, godchildFound, godchild, stats, recentLogs, error } = useMonitoreo();
  const tipP = TIPS_PADRINO[new Date().getDay() % TIPS_PADRINO.length];

  // ── Estado de carga ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-[11px] rs-text-caption tracking-[1px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Buscando ahijado...
          </p>
        </div>
      </div>
    );
  }

  // ── Error de red / servidor ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center max-w-xs px-4">
          <p className="text-[11px] uppercase tracking-[1px] text-red-400 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }} role="alert">
            {error}
          </p>
          <p className="text-[12px] rs-text-caption italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Verifica tu conexión e intenta de nuevo.
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
            className="text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Panel de Acompañante —
          </p>
          <h1
            className="text-[44px] font-normal rs-text-heading leading-none mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Monitoreo
          </h1>
          <p
            className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Sin ahijado conectado aún
          </p>

          {/* Ilustración vacía */}
          <div
            className="border border-[var(--ui-border)] bg-[var(--surface-card)] rounded-sm p-10 mb-6 flex flex-col items-center text-center"
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
              className="text-[20px] font-normal rs-text-body mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aún no tienes un ahijado conectado
            </p>
            <p
              className="text-[11px] rs-text-caption leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Cuando alguien en recuperación introduzca tu identificador de padrino en la sección de Configuración de su app, aparecerá aquí automáticamente.
            </p>

            <div className="border border-teal-100 dark:border-teal-800/30 bg-teal-50 dark:bg-teal-900/20 rounded-sm p-5 w-full max-w-sm text-left mb-5">
              <p
                className="text-[11px] tracking-[1.5px] uppercase text-teal-600 dark:text-teal-400 mb-2"
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
                      className="text-[11px] text-teal-400 font-bold mt-0.5 flex-shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {i + 1}.
                    </span>
                    <p
                      className="text-[11px] italic text-teal-700 dark:text-teal-300 leading-relaxed"
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
              className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-teal-600 border border-teal-200 hover:bg-teal-50 transition-colors px-6 py-2.5 rounded"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Ver mi perfil →
            </Link>
          </div>

          {/* Protocolo siempre visible */}
          <div className="border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-sm p-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p
                  className="text-[11px] tracking-[1.5px] uppercase text-red-400 mb-1.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Protocolo de Emergencia
                </p>
                <p
                  className="text-[13px] italic text-red-700 dark:text-red-400 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Cuando tengas un ahijado conectado...
                </p>
                <p
                  className="text-[11px] text-red-500 dark:text-red-400/80 leading-relaxed"
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
          className="text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Panel de Acompañante —
        </p>
        <h1
          className="text-[44px] font-normal rs-text-heading leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Progreso de {godchildName}
        </h1>
        <p
          className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ReSet — Monitoreo Activo
        </p>

        {/* Tarjeta de progreso principal */}
        <div
          className="border border-[var(--ui-border)] bg-[var(--surface-card)] rounded-sm p-8 mb-6"
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
                <p className="text-[11px] tracking-[1.5px] uppercase text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plantName}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plantStage}
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="text-[56px] font-normal rs-text-heading leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {sobrietyDays}
                </span>
                <div>
                  <p className="text-[11px] tracking-[1.5px] uppercase text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Días
                  </p>
                  <p className="text-[11px] tracking-[1.2px] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    En recuperación
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 mb-5">
                <div>
                  <p className="text-[24px] font-normal text-teal-600 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stats?.notesThisWeek ?? 0}
                  </p>
                  <p className="text-[11px] rs-text-caption tracking-[0.8px] uppercase mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Notas totales
                  </p>
                </div>
                <div className="w-px bg-slate-100 dark:bg-slate-700/40" />
                <div>
                  <p className="text-[24px] font-normal text-teal-600 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stats?.consistency ?? 0}%
                  </p>
                  <p className="text-[11px] rs-text-caption tracking-[0.8px] uppercase mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
                  <p className="text-[11px] rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Última actividad: {formatRelativeDate(recentLogs[0].date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="border border-[var(--ui-border)] bg-[var(--surface-card)] rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[11px] tracking-[2px] uppercase text-teal-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Actividad Reciente
            </p>
          </div>

          {recentLogs.length === 0 ? (
            <p className="text-[12px] italic rs-text-caption py-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tu ahijado aún no ha registrado actividad.
            </p>
          ) : (
            recentLogs.map((item, i) => (
              <div key={item.id} className={`flex items-start gap-4 py-4 ${i > 0 ? "border-t border-slate-50 dark:border-slate-700/20" : ""}`}>
                <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {MOOD_SVG[item.moodId] ?? MOOD_SVG.calmado}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] italic rs-text-body" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.moodLabel}
                    </p>
                    {item.isShared && (
                      <span className="text-[11px] tracking-[1px] uppercase text-teal-400 bg-teal-50 px-2 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Compartido
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] rs-text-caption leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.notes ? `"${item.notes.slice(0, 80)}${item.notes.length > 80 ? "..." : ""}"` : "Registro emocional sin nota adjunta."}
                  </p>
                </div>
                <p className="text-[11px] rs-text-caption whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatRelativeDate(item.date)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Técnica del día para acompañante */}
        <div className="border border-teal-100 dark:border-teal-800/30 bg-[var(--surface-card)] rounded-sm p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] tracking-[1.5px] uppercase text-teal-500 mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Técnica del día
            </p>
            <p className="text-[16px] font-normal rs-text-heading leading-tight mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tipP.nombre}
            </p>
            <p className="text-[11px] italic rs-text-caption leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tipP.hint}
            </p>
          </div>
          <Link
            href="/acompanante/tecnicas"
            className="flex-shrink-0 h-9 px-4 border border-teal-200 hover:bg-teal-50 text-teal-600 flex items-center transition-colors rounded-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}
          >
            Ver todas →
          </Link>
        </div>

        {/* Protocolo de emergencia */}
        <div className="border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-sm p-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] tracking-[1.5px] uppercase text-red-400 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Protocolo de Emergencia
              </p>
              <p className="text-[13px] italic text-red-700 dark:text-red-400 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Si {godchildName} presiona el botón &apos;Raíz de Emergencia&apos;...
              </p>
              <p className="text-[11px] text-red-500 dark:text-red-400/80 leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Recibirás una notificación inmediata con su ubicación aproximada. Por favor, contáctale lo antes posible o llama al servicio de emergencias si es necesario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
