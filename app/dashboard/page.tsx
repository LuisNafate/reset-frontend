"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import { useSession } from "@/hooks/useSession";
import { useAuth } from "@/context/AuthContext";
import PlantStage, { getPlantLabel } from "@/components/ui/PlantStage";
import { getAvatarUrl } from "@/lib/avatar";
import { getMyNotes, type EncouragementNote } from "@/lib/api/encouragement";

// Técnica del día — rota según el día de la semana
const TIPS_DIARIOS = [
  { nombre: "Respiración 4-7-8", hint: "Inhala 4 seg, retén 7, exhala 8. Repite 3 veces para calmar el sistema nervioso." },
  { nombre: "Regla de los 15 Minutos", hint: "Cuando sientas un craving (ansia o deseo intenso de consumir), espera solo 15 minutos. El impulso suele pasar solo." },
  { nombre: "Grounding 5-4-3-2-1", hint: "Nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas." },
  { nombre: "Diario de Gratitud", hint: "Anota 3 cosas pequeñas que agradeces hoy. Cambia el foco del cerebro hacia lo positivo." },
  { nombre: "Hábito Ancla", hint: "Ata un nuevo hábito a uno que ya tienes. Después del café → escribe una línea en tu bitácora." },
  { nombre: "HALT – Revisa tu Estado", hint: "¿Estás Hambriento, Ansioso, Solo o Cansado? Identifica el origen antes de reaccionar." },
  { nombre: "Carta a tu Yo Futuro", hint: "Escribe 3 líneas desde tu yo de dentro de un año. ¿Qué te diría ese tú al que de hoy?" },
];

export default function InicioPage() {
  const { progress, lastNote, isLoading, error } = useDashboard();
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")
    : "U";
  const { abbreviateName, todayLabel } = useSession();
  const tip = TIPS_DIARIOS[new Date().getDay() % TIPS_DIARIOS.length];

  const sobrietyDays = progress?.sobrietyDays ?? 0;
  const nextMilestone = progress?.nextMilestone;
  const nextMilestoneTargetDays = nextMilestone ? sobrietyDays + nextMilestone.daysLeft : sobrietyDays;
  const nextMilestoneProgressPercent = nextMilestone
    ? Math.max(0, Math.min(100, Math.round((sobrietyDays / Math.max(nextMilestoneTargetDays, 1)) * 100)))
    : 100;
  const firstName = user?.name ? abbreviateName(user.name, 14).split(" ")[0] : null;

  // ── Notas de aliento del padrino ──
  const [encouragementNotes, setEncouragementNotes] = useState<EncouragementNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  useEffect(() => {
    getMyNotes()
      .then(setEncouragementNotes)
      .catch((err) => {
        console.warn("No se pudieron cargar las notas de aliento", err);
      })
      .finally(() => setNotesLoading(false));
  }, []);
  return (
    <div className="min-h-full relative bg-(--surface-main) overflow-x-hidden">
      {/* Ambient blur circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute bg-[rgba(59,130,246,0.05)] blur-[32px] rounded-full w-64 h-64 -bottom-10 -right-10" />
        <div className="absolute bg-[rgba(59,130,246,0.05)] blur-[32px] rounded-full w-48 h-48 -left-10 top-1/4" />
      </div>

      {/* Header — fecha real + saludo con nombre */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(15,29,45,0.85)] border-b border-[rgba(132,139,148,0.4)] dark:border-[rgba(30,48,72,0.8)] h-16 sm:h-20 px-4 sm:px-8 md:px-12 flex items-center justify-between">
        <p
          className="font-jetbrains text-[11px] uppercase rs-text-muted tracking-[0.05em]"
        >
          {todayLabel()}
        </p>
        <div className="flex items-center gap-2.5">
          <p
            className="font-jetbrains text-[12px] font-bold uppercase rs-text-muted tracking-[-0.3px]"
          >
            {firstName ? `Hola, ${firstName}` : "Mi ReSet"}
          </p>
          <Link
            href="/dashboard/configuracion"
            className="w-8 h-8 rounded-full hidden md:flex items-center justify-center shrink-0 bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 text-[11px] font-bold transition-opacity hover:opacity-80 overflow-hidden"
            aria-label="Mi perfil"
          >
            {user?.id
              ? <img src={getAvatarUrl(user.avatarUrl, user.id)} alt={initials} className="w-full h-full object-cover" />
              : initials}
          </Link>
        </div>
      </header>

      {/* ── Content ── — padding responsivo */}
      <div className="px-4 sm:px-8 md:px-16 py-8 md:py-16 max-w-4xl mx-auto">

        {/* ── Banner de error al cargar progreso ── */}
        {!isLoading && error && (
          <div
            className="flex items-center gap-3 px-5 py-3 mb-6 border border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 rounded-sm"
            role="alert"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p
              className="font-jetbrains text-[11px] uppercase tracking-[1px] text-red-500"
            >
              {error}
            </p>
          </div>
        )}

        {/* =============================================
            MAIN HERO CARD
        ============================================= */}
        <div className="relative mb-8 pt-5.5">

          {/* Tape — top, centered on the left (plant) panel */}
          <div className="absolute left-[30%] -translate-x-1/2 top-0 z-20 pointer-events-none">
            <div
              className="w-26 h-10.75 bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-2deg)" }}
            />
          </div>

          {/* Card */}
          <div
            className="bg-(--surface-card) border border-(--ui-border) relative"
            style={{ boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)" }}
          >
            {/* Inner border */}
            <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none z-0" />

            {/* Grid del hero card: 1 columna en móvil, 2 en sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:min-h-130">

              {/* ── Left: Plant ── */}
              <div className="relative flex flex-col items-center justify-center py-8 sm:py-14 px-4 sm:px-0 overflow-hidden">
                {/* Background circle */}
                <div
                  className="absolute rounded-full bg-[#f0f4f8] dark:bg-[#0d1f35] border border-[rgba(59,130,246,0.1)] dark:border-[rgba(96,165,250,0.07)] animate-breathe w-56 h-56 sm:w-72 sm:h-72"
                />

                {/* Plant — etapa dinámica según días de sobriedad */}
                <div className="relative z-10 animate-float max-w-full">
                  <PlantStage days={sobrietyDays} />
                </div>

                {/* Stage label — etapa real según la racha */}
                <div
                  className="relative z-10 mt-14 sm:mt-16 w-full max-w-60 sm:max-w-none bg-(--surface-card) border border-[rgba(59,130,246,0.2)] dark:border-[rgba(59,130,246,0.15)] min-h-10 px-4 sm:px-8 flex items-center justify-center text-center"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                >
                  <span
                    className="font-jetbrains text-[10px] sm:text-[11px] font-bold italic uppercase text-[#3b82f6] dark:text-sky-400 tracking-[1px]"
                  >
                    {isLoading ? "···" : getPlantLabel(sobrietyDays)}
                  </span>
                </div>
              </div>

              {/* Stats \u2014 borde superior en m\u00f3vil, borde izquierdo en sm+ */}
              <div
                className="flex flex-col justify-center items-center sm:items-start px-8 py-10 sm:px-12 sm:py-12 border-t-2 border-[rgba(59,130,246,0.1)] dark:border-[rgba(96,165,250,0.12)] sm:border-t-0 sm:border-l-2"
              >
                <p
                  className="font-jetbrains uppercase text-[11px] text-[#1a365d] dark:text-sky-400 mb-8 tracking-[4px] text-center sm:text-left"
                >
                  Mi Progreso
                </p>

                {/* Counter — días de racha reales */}
                <div className="flex items-end gap-4 mb-10 justify-center sm:justify-start">
                  <span
                    className="font-playfair font-bold italic leading-none text-[#1a365d] dark:text-slate-100 text-[64px] sm:text-[100px] md:text-[128px]"
                  >
                    {isLoading ? "—" : sobrietyDays}
                  </span>
                  <div className="pb-4 sm:pb-5">
                    {/* "días" / "cumplidos" \u2014 tama\u00f1os responsivos */}
                    <p
                      className="font-playfair italic text-[rgba(26,54,93,0.8)] dark:text-slate-200 leading-none text-[22px] sm:text-[30px]"
                    >
                      días
                    </p>
                    <p
                      className="font-playfair italic text-[rgba(26,54,93,0.5)] dark:text-slate-400 text-[14px] sm:text-[18px]"
                    >
                      cumplidos
                    </p>
                  </div>
                </div>

                {/* CTA Button — altura responsiva */}
                <Link
                  href="/dashboard/bitacora"
                  className="font-jetbrains flex items-center gap-3 justify-center h-13 sm:h-15 w-full bg-[#3b82f6] hover:bg-blue-500 text-white transition-colors mb-8 rounded-sm text-[13px] uppercase tracking-[1.2px]"
                  style={{
                    boxShadow: "0px 4px 12px -2px rgba(59,130,246,0.3)",
                  }}
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="4" width="16" height="17" rx="1.5" stroke="white" strokeWidth="1.5"/>
                    <path d="M1 9H17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 1V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13 1V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="4.5" y="12.5" width="3" height="3" rx="0.5" fill="white"/>
                    <rect x="10.5" y="12.5" width="3" height="3" rx="0.5" fill="white"/>
                  </svg>
                  Completar Encuesta Diaria
                </Link>

                {/* Quote */}
                <p
                  className="font-playfair italic leading-relaxed text-[rgba(26,54,93,0.6)] dark:text-slate-400 text-[16px] max-w-88"
                >
                  &ldquo;Cada día que cuidas tu jardín, las flores de tu voluntad crecen con más fuerza.&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* Tape — bottom-right corner of main card */}
          <div className="absolute right-[22%] -bottom-4 z-20 pointer-events-none">
            <div
              className="w-19.5 h-8.75 bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(1deg)" }}
            />
          </div>
        </div>

        {/* =============================================
            BOTTOM INFO CARDS — 1 columna en móvil, 3 en sm+
        ============================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">

          {/* ── Última Nota ── */}
          <div className="relative pt-3.75 h-full">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-17.5 h-7.25 bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-5deg)" }}
              />
            </div>
            <div
              className="bg-(--surface-card) border border-(--ui-border) relative h-full min-h-41 sm:min-h-55"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none" />
              <div className="relative z-10 p-6 pt-7 h-full flex flex-col">
                <p
                  className="font-jetbrains uppercase text-[11px] text-[rgba(60,107,174,0.6)] dark:text-sky-400 mb-4 tracking-[0.9px]"
                >
                  Última Nota
                </p>
                <p
                  className="font-playfair italic text-[rgba(26,54,93,0.8)] dark:text-slate-300 leading-6 text-[16px]"
                >
                  {isLoading
                    ? "···"
                    : (lastNote || "Aún no tienes notas. ¡Escribe tu primera entrada en la Bitácora!")}
                </p>
              </div>
            </div>
          </div>

          {/* ── Comunidad ── */}
          <Link href="/dashboard/foro" className="block relative pt-3.75 group h-full">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-17.5 h-7.25 bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(5deg)" }}
              />
            </div>
            <div
              className="bg-(--surface-card) border border-(--ui-border) group-hover:border-[#93c5fd] dark:group-hover:border-[#1d4ed8] relative flex items-center transition-colors h-full min-h-41 sm:min-h-55"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none" />
              <div className="relative z-10 p-6 pt-7 h-full flex flex-col justify-center">
                <p
                  className="font-jetbrains uppercase text-[11px] text-[rgba(60,107,174,0.6)] dark:text-sky-400 mb-4 tracking-[0.9px]"
                >
                  Comunidad
                </p>
                <div className="flex items-center gap-2">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8.5H17M8 12H13M3.75 7.241C3.75 5.64 4.873 4.246 6.457 4.013C8.756 3.675 11.108 3.5 13.5 3.5C15.892 3.5 18.244 3.675 20.543 4.013C22.127 4.246 23.25 5.639 23.25 7.241V13.259C23.25 14.861 22.127 16.254 20.543 16.487C19.456 16.647 18.358 16.77 17.25 16.856V21.5L13.066 17.317A1.14 1.14 0 0012.287 16.985C10.3 16.832 8.347 16.552 6.457 16.487C4.873 16.254 3.75 14.861 3.75 13.259V7.241Z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p
                    className="font-jetbrains font-bold text-[16px] text-[#1a365d] dark:text-slate-100"
                  >
                    Ver el Foro →
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* ── Próximo Hito ── */}
          <div className="relative pt-3.75 h-full">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-17.5 h-7.25 bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-3deg)" }}
              />
            </div>
            <div
              className="bg-(--surface-card) border border-(--ui-border) relative flex items-center h-full min-h-41 sm:min-h-55"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none" />
              <div className="relative z-10 p-5 sm:p-6 pt-6 sm:pt-7 w-full h-full flex flex-col justify-between">
                <p
                  className="font-jetbrains uppercase text-[11px] text-[rgba(60,107,174,0.6)] dark:text-sky-400 mb-4 tracking-[0.9px]"
                >
                  Próximo Hito
                </p>
                <div className="flex items-start gap-3 mb-3 sm:mb-4 min-w-0">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-sky-50 dark:bg-sky-900/25 border border-sky-100 dark:border-sky-800/40 flex items-center justify-center text-[#1a365d] dark:text-sky-300">
                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 3C12.5 3 6.5 7.5 6.5 13C6.5 16.866 9.186 20 12.5 20C15.814 20 18.5 16.866 18.5 13C18.5 7.5 12.5 3 12.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 20V22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9.5 20H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9.5 13C9.5 13 10.5 15 12.5 15C14.5 15 15.5 13 15.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-jetbrains font-bold text-[14px] sm:text-[15px] rs-text-heading leading-snug wrap-break-word">
                      {isLoading
                        ? "···"
                        : nextMilestone
                          ? nextMilestone.label
                          : "¡Ciprés de Diamante alcanzado!"}
                    </p>
                    <p className="font-jetbrains text-[11px] uppercase tracking-[1px] rs-text-caption mt-1">
                      {isLoading
                        ? "Calculando..."
                        : nextMilestone
                          ? `Faltan ${nextMilestone.daysLeft} días`
                          : "Hito máximo completado"}
                    </p>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-sky-100/80 dark:bg-sky-950/40 overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-sky-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${isLoading ? 0 : nextMilestoneProgressPercent}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between font-jetbrains text-[10px] uppercase tracking-[0.9px] rs-text-caption">
                  <span>{isLoading ? "--" : `${sobrietyDays}d`}</span>
                  <span>{isLoading ? "--" : `${nextMilestoneTargetDays}d`}</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* ── Técnica del día ── */}
        <div className="mt-6 relative pt-3.75">
          {/* Tape */}
          <div className="absolute left-[10%] top-0 z-20 pointer-events-none">
            <div
              className="w-17.5 h-7.25 bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-1deg)" }}
            />
          </div>
          <div
            className="bg-(--surface-card) border border-(--ui-border) relative"
            style={{ boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)" }}
          >
            <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none" />
            <div className="relative z-10 p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Ícono */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#eff6ff] border border-[rgba(59,130,246,0.15)] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-[rgba(60,107,174,0.6)] dark:text-sky-400 mb-1"
                >
                  Técnica del día
                </p>
                <p
                  className="font-playfair text-[17px] font-normal text-[#1a365d] dark:text-slate-100 leading-tight mb-1.5"
                >
                  {tip.nombre}
                </p>
                <p
                  className="font-playfair text-[13px] text-[rgba(26,54,93,0.55)] dark:text-slate-400 leading-relaxed"
                >
                  {tip.hint}
                </p>
              </div>
              {/* Enlace */}
              <Link
                href="/dashboard/tecnicas"
                className="font-jetbrains shrink-0 h-9 px-5 bg-(--surface-card) border border-[rgba(59,130,246,0.3)] dark:border-sky-900/40 hover:bg-[#eff6ff] dark:hover:bg-sky-900/20 text-[#3b82f6] dark:text-sky-400 flex items-center transition-colors text-[11px] tracking-[1.5px] uppercase"
              >
                Ver todas →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Mensaje de tu Padrino — nota más reciente del padrino ── */}
        <div className="mt-6 relative pt-3.75">
          {/* Tape */}
          <div className="absolute left-[35%] top-0 z-20 pointer-events-none">
            <div
              className="w-17.5 h-7.25 bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-2deg)" }}
            />
          </div>
          <div
            className="bg-(--surface-card) border border-(--ui-border) relative"
            style={{ boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)" }}
          >
            <div className="absolute inset-3 border border-(--ui-border-subtle) pointer-events-none" />
            <div className="relative z-10 p-6 flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="shrink-0 mt-0.5" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 6l10 8 10-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p
                  className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-[rgba(60,107,174,0.6)] dark:text-sky-400"
                >
                  Mensaje de tu Padrino
                </p>
              </div>
              {notesLoading ? (
                <p
                  className="font-playfair text-[15px] italic text-[rgba(26,54,93,0.4)] dark:text-slate-500"
                >
                  ···
                </p>
              ) : encouragementNotes.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <p
                    className="font-playfair text-[16px] italic text-[rgba(26,54,93,0.85)] dark:text-slate-200 leading-relaxed"
                  >
                    {encouragementNotes[0].content}
                  </p>
                  <p
                    className="font-jetbrains text-[11px] text-[rgba(26,54,93,0.4)] dark:text-slate-500"
                  >
                    {encouragementNotes[0].senderName} &mdash; {new Date(encouragementNotes[0].createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              ) : (
                <p
                  className="font-playfair text-[15px] italic text-[rgba(26,54,93,0.5)] dark:text-slate-500"
                >
                  Tu padrino aún no ha enviado un mensaje de aliento.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
