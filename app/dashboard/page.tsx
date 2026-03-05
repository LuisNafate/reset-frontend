"use client";

import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import { useSession } from "@/hooks/useSession";

// Técnica del día — rota según el día de la semana
const TIPS_DIARIOS = [
  { nombre: "Respiración 4-7-8", hint: "Inhala 4 seg, retén 7, exhala 8. Repite 3 veces para calmar el sistema nervioso." },
  { nombre: "Regla de los 15 Minutos", hint: "Cuando sientas un craving, espera solo 15 minutos. El impulso suele pasar solo." },
  { nombre: "Grounding 5-4-3-2-1", hint: "Nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas." },
  { nombre: "Diario de Gratitud", hint: "Anota 3 cosas pequeñas que agradeces hoy. Cambia el foco del cerebro hacia lo positivo." },
  { nombre: "Hábito Ancla", hint: "Ata un nuevo hábito a uno que ya tienes. Después del café → escribe una línea en tu bitácora." },
  { nombre: "HALT – Revisa tu Estado", hint: "¿Estás Hambriento, Ansioso, Solo o Cansado? Identifica el origen antes de reaccionar." },
  { nombre: "Carta a tu Yo Futuro", hint: "Escribe 3 líneas desde tu yo de dentro de un año. ¿Qué te diría ese tú al que de hoy?" },
];

export default function InicioPage() {
  const { progress, lastNote, isLoading } = useDashboard();
  const { user, abbreviateName, todayLabel } = useSession();
  const tip = TIPS_DIARIOS[new Date().getDay() % TIPS_DIARIOS.length];

  const sobrietyDays = progress?.sobrietyDays ?? 0;
  const plantStage   = progress?.plantStage ?? "Semilla";
  const nextMilestone = progress?.nextMilestone;
  const firstName = user?.name ? abbreviateName(user.name, 14).split(" ")[0] : null;
  return (
    <div className="min-h-full relative bg-[#f8fafc] overflow-x-hidden">
      {/* Ambient blur circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute bg-[rgba(59,130,246,0.05)] blur-[32px] rounded-full w-64 h-64 -bottom-10 -right-10" />
        <div className="absolute bg-[rgba(59,130,246,0.05)] blur-[32px] rounded-full w-48 h-48 -left-10 top-1/4" />
      </div>

      {/* Header — fecha real + saludo con nombre */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[rgba(255,255,255,0.4)] border-b border-[rgba(132,139,148,0.4)] h-16 sm:h-20 px-4 sm:px-8 md:px-12 flex items-center justify-between">
        <p
          className="text-[11px] uppercase text-[rgba(26,54,93,0.6)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}
        >
          {todayLabel()}
        </p>
        <div className="flex items-center gap-2">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="rgba(26,54,93,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 20C2 17.2386 5.58172 15 10 15C14.4183 15 18 17.2386 18 20V22H2V20Z" stroke="rgba(26,54,93,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p
            className="text-[12px] font-bold uppercase text-[rgba(26,54,93,0.6)]"
            style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.3px" }}
          >
            {firstName ? `Hola, ${firstName}` : "Mi ReSet"}
          </p>
        </div>
      </header>

      {/* ── Content ── — padding responsivo */}
      <div className="px-4 sm:px-8 md:px-16 py-8 md:py-16 max-w-4xl mx-auto">

        {/* =============================================
            MAIN HERO CARD
        ============================================= */}
        <div className="relative mb-8 pt-[22px]">

          {/* Tape — top, centered on the left (plant) panel */}
          <div className="absolute left-[30%] -translate-x-1/2 top-0 z-20 pointer-events-none">
            <div
              className="w-[104px] h-[43px] bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-2deg)" }}
            />
          </div>

          {/* Card */}
          <div
            className="bg-[#f8fafc] border border-[#cbd5e1] relative"
            style={{ boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)" }}
          >
            {/* Inner border */}
            <div className="absolute inset-[12px] border border-[#e2e8f0] pointer-events-none z-0" />

            {/* Grid del hero card: 1 columna en móvil, 2 en sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ minHeight: 520 }}>

              {/* ── Left: Plant ── */}
              <div className="relative flex flex-col items-center justify-center py-10 sm:py-14">
                {/* Background circle */}
                <div
                  className="absolute rounded-full bg-[#f8f8f8] border border-[rgba(59,130,246,0.1)] animate-breathe"
                  style={{ width: 288, height: 288 }}
                />

                {/* Seed SVG */}
                <div className="relative z-10 animate-float">
                  <svg width="110" height="140" viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="22" y1="123" x2="88" y2="123" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="55" y1="122" x2="55" y2="68" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                    <ellipse cx="55" cy="55" rx="14" ry="19" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5"/>
                    <path d="M55 36C55 36 64 45 64 55C64 65 55 74 55 74C55 74 46 65 46 55C46 45 55 36 55 36Z" fill="#cbd5e1"/>
                    <path d="M55 37C55 37 49 29 42 27C42 27 48 35 55 37Z" fill="#94a3b8" opacity="0.7"/>
                  </svg>
                </div>

                {/* Stage label — etapa real según la racha */}
                <div
                  className="relative z-10 mt-10 bg-white border border-[rgba(59,130,246,0.2)] h-10 px-8 flex items-center"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                >
                  <span
                    className="text-[10px] font-bold italic uppercase text-[#3b82f6]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px" }}
                  >
                    {isLoading ? "···" : plantStage}
                  </span>
                </div>
              </div>

              {/* Stats \u2014 borde superior en m\u00f3vil, borde izquierdo en sm+ */}
              <div
                className="flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-12 border-t-2 border-[rgba(59,130,246,0.1)] sm:border-t-0 sm:border-l-2"
              >
                <p
                  className="uppercase text-[#1a365d] mb-8"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "4.8px" }}
                >
                  Mi Progreso
                </p>

                {/* Counter — días de racha reales */}
                <div className="flex items-end gap-4 mb-10">
                  <span
                    className="font-bold italic leading-none text-[#1a365d] text-[72px] sm:text-[100px] md:text-[128px]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {isLoading ? "—" : sobrietyDays}
                  </span>
                  <div className="pb-5">
                    {/* "días" / "cumplidos" \u2014 tama\u00f1os responsivos */}
                    <p
                      className="italic text-[rgba(26,54,93,0.8)] leading-none text-[22px] sm:text-[30px]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      días
                    </p>
                    <p
                      className="italic text-[rgba(26,54,93,0.5)] text-[14px] sm:text-[18px]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      cumplidos
                    </p>
                  </div>
                </div>

                {/* CTA Button — altura responsiva */}
                <Link
                  href="/dashboard/bitacora"
                  className="flex items-center gap-3 justify-center h-[52px] sm:h-[68px] w-full bg-[#3b82f6] hover:bg-blue-400 text-white transition-colors mb-8"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
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
                  className="italic leading-[1.625] text-[rgba(26,54,93,0.6)]"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, maxWidth: 352 }}
                >
                  &ldquo;Cada día que cuidas tu jardín, las flores de tu voluntad crecen con más fuerza.&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* Tape — bottom-right corner of main card */}
          <div className="absolute right-[22%] -bottom-4 z-20 pointer-events-none">
            <div
              className="w-[78px] h-[35px] bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(1deg)" }}
            />
          </div>
        </div>

        {/* =============================================
            BOTTOM INFO CARDS — 1 columna en móvil, 3 en sm+
        ============================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* ── Última Nota ── */}
          <div className="relative pt-[15px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-[70px] h-[29px] bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-5deg)" }}
              />
            </div>
            <div
              className="bg-[#f8fafc] border border-[#cbd5e1] relative"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
                minHeight: 128,
              }}
            >
              <div className="absolute inset-[12px] border border-[#e2e8f0] pointer-events-none" />
              <div className="relative z-10 p-6 pt-7">
                <p
                  className="uppercase text-[rgba(60,107,174,0.6)] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.9px" }}
                >
                  Última Nota
                </p>
                <p
                  className="italic text-[rgba(26,54,93,0.8)] leading-6"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 16 }}
                >
                  {isLoading
                    ? "···"
                    : (lastNote || "Aún no tienes notas. ¡Escribe tu primera entrada en la Bitácora!")}
                </p>
              </div>
            </div>
          </div>

          {/* ── Comunidad ── */}
          <Link href="/dashboard/foro" className="block relative pt-[15px] group">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-[70px] h-[29px] bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(5deg)" }}
              />
            </div>
            <div
              className="bg-[#f8fafc] border border-[#cbd5e1] group-hover:border-[#93c5fd] relative flex items-center transition-colors"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
                minHeight: 128,
              }}
            >
              <div className="absolute inset-[12px] border border-[#e2e8f0] pointer-events-none" />
              <div className="relative z-10 p-6 pt-7">
                <p
                  className="uppercase text-[rgba(60,107,174,0.6)] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.9px" }}
                >
                  Comunidad
                </p>
                <div className="flex items-center gap-2">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8.5H17M8 12H13M3.75 7.241C3.75 5.64 4.873 4.246 6.457 4.013C8.756 3.675 11.108 3.5 13.5 3.5C15.892 3.5 18.244 3.675 20.543 4.013C22.127 4.246 23.25 5.639 23.25 7.241V13.259C23.25 14.861 22.127 16.254 20.543 16.487C19.456 16.647 18.358 16.77 17.25 16.856V21.5L13.066 17.317A1.14 1.14 0 0012.287 16.985C10.3 16.832 8.347 16.552 6.457 16.487C4.873 16.254 3.75 14.861 3.75 13.259V7.241Z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p
                    className="font-bold text-[#1a365d]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}
                  >
                    Ver el Foro →
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* ── Próximo Hito ── */}
          <div className="relative pt-[15px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 pointer-events-none">
              <div
                className="w-[70px] h-[29px] bg-[rgba(186,230,253,0.4)]"
                style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-3deg)" }}
              />
            </div>
            <div
              className="bg-[#f8fafc] border border-[#cbd5e1] relative flex items-center"
              style={{
                boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)",
                backdropFilter: "blur(2px)",
                minHeight: 128,
              }}
            >
              <div className="absolute inset-[12px] border border-[#e2e8f0] pointer-events-none" />
              <div className="relative z-10 p-6 pt-7">
                <p
                  className="uppercase text-[rgba(60,107,174,0.6)] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.9px" }}
                >
                  Próximo Hito
                </p>
                <div className="flex items-center gap-2">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 3C12.5 3 6.5 7.5 6.5 13C6.5 16.866 9.186 20 12.5 20C15.814 20 18.5 16.866 18.5 13C18.5 7.5 12.5 3 12.5 3Z" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.5 20V22.5" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.5 20H15.5" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.5 13C9.5 13 10.5 15 12.5 15C14.5 15 15.5 13 15.5 13" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p
                    className="font-bold text-[#1a365d]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}
                  >
                    {isLoading
                      ? "···"
                      : nextMilestone
                        ? `${nextMilestone.label} (−${nextMilestone.daysLeft}d)`
                        : "¡Ciprés de Diamante alcanzado!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Técnica del día ── */}
        <div className="mt-6 relative pt-[15px]">
          {/* Tape */}
          <div className="absolute left-[10%] top-0 z-20 pointer-events-none">
            <div
              className="w-[70px] h-[29px] bg-[rgba(186,230,253,0.4)]"
              style={{ backdropFilter: "blur(0.5px)", transform: "rotate(-1deg)" }}
            />
          </div>
          <div
            className="bg-[#f8fafc] border border-[#cbd5e1] relative"
            style={{ boxShadow: "8px 8px 0px 0px rgba(26,54,93,0.05)" }}
          >
            <div className="absolute inset-[12px] border border-[#e2e8f0] pointer-events-none" />
            <div className="relative z-10 p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Ícono */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#eff6ff] border border-[rgba(59,130,246,0.15)] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[8px] tracking-[1.5px] uppercase text-[rgba(60,107,174,0.6)] mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Técnica del día
                </p>
                <p
                  className="text-[17px] font-normal text-[#1a365d] leading-tight mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {tip.nombre}
                </p>
                <p
                  className="text-[12px] italic text-[rgba(26,54,93,0.55)] leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {tip.hint}
                </p>
              </div>
              {/* Enlace */}
              <Link
                href="/dashboard/tecnicas"
                className="flex-shrink-0 h-9 px-5 bg-white border border-[rgba(59,130,246,0.3)] hover:bg-[#eff6ff] text-[#3b82f6] flex items-center transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase" }}
              >
                Ver todas →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
