"use client";

import Link from "next/link";

const SECCIONES = [
  {
    titulo: "Bienvenida al Espacio",
    contenido:
      "La comunidad ReSet es un espacio de acompañamiento entre personas que atraviesan procesos reales de recuperación. Aquí compartimos avances, dudas y momentos difíciles desde la empatía, sin juicios y con foco en el cuidado mutuo.",
  },
  {
    titulo: "Normas de Respeto",
    contenido:
      "Mantén siempre un trato respetuoso. No se permiten ataques personales, burlas, humillaciones ni presión hacia otros usuarios. Evita compartir datos personales de terceros sin su consentimiento y cuida el lenguaje en todo momento.",
  },
  {
    titulo: "Qué Publicar",
    contenido:
      "Puedes publicar experiencias personales, hitos de sobriedad, estrategias que te funcionaron, reflexiones del día y solicitudes de apoyo emocional. Busca que tus publicaciones aporten acompañamiento y claridad a la conversación.",
  },
  {
    titulo: "Qué Evitar",
    contenido:
      "No está permitido promover consumo, compartir instrucciones de riesgo, difundir spam o publicidad, ni publicar contenido agresivo o discriminatorio. Tampoco uses el foro para diagnósticos médicos o recomendaciones profesionales sin respaldo.",
  },
  {
    titulo: "Anonimato y Privacidad",
    contenido:
      "ReSet permite publicar de forma anónima para proteger tu identidad. Evita incluir información que te identifique a ti o a otras personas (teléfonos, direcciones, correos, redes sociales). Si detectas una vulneración de privacidad, repórtala de inmediato.",
  },
  {
    titulo: "Sistema de Denuncias",
    contenido:
      "Si una publicación incumple estas pautas, usa la opción de denuncia desde el contenido. El equipo de moderación revisa cada caso y puede ocultar contenido, emitir advertencias o restringir cuentas según la gravedad.",
  },
  {
    titulo: "Contacto con el Equipo",
    contenido:
      "Para situaciones delicadas o reportes urgentes, escríbenos desde la sección de contacto dentro de la app. Si estás en una emergencia inmediata, prioriza comunicarte con tus contactos de confianza o servicios locales de ayuda.",
  },
];

export default function ComunidadManualPage() {
  return (
    <div className="min-h-full" style={{ background: "var(--surface-main)" }}>
      {/* Header fijo */}
      <header
        className="sticky top-0 z-20 flex items-center gap-4 px-5 py-4 border-b"
        style={{
          background: "var(--surface-card)",
          borderColor: "var(--ui-border-subtle)",
        }}
      >
        <Link
          href="/dashboard/foro"
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "var(--ui-text-muted)" }}
          aria-label="Volver al Foro"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <p
            className="text-[11px] tracking-[2px] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ui-text-caption)" }}
          >
            Comunidad ReSet
          </p>
          <p
            className="text-[15px] italic"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--ui-text-heading)", lineHeight: 1.2 }}
          >
            Manual de Comunidad
          </p>
        </div>
      </header>

      {/* Contenido */}
      <div className="px-5 py-8 max-w-2xl mx-auto space-y-8">

        {/* Intro */}
        <p
          className="text-[15px] leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--ui-text-muted)" }}
        >
          Este espacio está diseñado para el acompañamiento mutuo, el respeto y el crecimiento compartido. Por favor lee estas pautas antes de participar.
        </p>

        {/* Secciones */}
        {SECCIONES.map((sec, i) => (
          <section key={i}>
            <p
              className="text-[11px] tracking-[2px] uppercase mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ui-text-caption)" }}
            >
              {String(i + 1).padStart(2, "0")} — {sec.titulo}
            </p>
            <div
              className="p-5 border rounded-sm"
              style={{ background: "var(--surface-card)", borderColor: "var(--ui-border-subtle)" }}
            >
              <p
                className="text-[14px] leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--ui-text-body)" }}
              >
                {sec.contenido}
              </p>
            </div>
          </section>
        ))}

        {/* CTA volver */}
        <div className="pt-4 pb-10">
          <Link
            href="/dashboard/foro"
            className="inline-flex items-center gap-2 h-10 px-6 border rounded-sm text-[11px] tracking-[1.5px] uppercase transition-colors hover:opacity-80"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "var(--surface-card)",
              borderColor: "var(--ui-border)",
              color: "var(--ui-text-muted)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver al Foro
          </Link>
        </div>
      </div>
    </div>
  );
}
