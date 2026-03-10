"use client";

import Link from "next/link";

const SECCIONES = [
  {
    titulo: "Bienvenida al Espacio",
    contenido:
      // TODO — redactar texto de bienvenida e intención del foro
      "[TODO — Descripción de qué es la comunidad ReSet, su propósito y espíritu de acompañamiento mutuo.]",
  },
  {
    titulo: "Normas de Respeto",
    contenido:
      // TODO — listar normas de convivencia concretas
      "[TODO — Listado de normas: no juicios, lenguaje respetuoso, no compartir información personal sin consentimiento, etc.]",
  },
  {
    titulo: "Qué Publicar",
    contenido:
      // TODO — describir tipos de contenido aceptables
      "[TODO — Ejemplos de publicaciones bienvenidas: experiencias personales, hitos de sobriedad, pedidos de apoyo, reflexiones.]",
  },
  {
    titulo: "Qué Evitar",
    contenido:
      // TODO — detallar conductas no permitidas
      "[TODO — Conductas no permitidas: promoción de consumo, lenguaje agresivo, spam, publicidad, información médica sin respaldo.]",
  },
  {
    titulo: "Anonimato y Privacidad",
    contenido:
      // TODO — política de anonimato y protección de identidad
      "[TODO — Cómo funciona el modo anónimo, qué datos se muestran, cómo reportar violaciones de privacidad.]",
  },
  {
    titulo: "Sistema de Denuncias",
    contenido:
      // TODO — explicar el proceso de denuncia de publicaciones
      "[TODO — Cómo funciona el botón de denuncia, qué sucede tras una denuncia, tiempos de revisión.]",
  },
  {
    titulo: "Contacto con el Equipo",
    contenido:
      // TODO — información de contacto para soporte de comunidad
      "[TODO — Canal de contacto para reportar problemas graves o solicitar ayuda inmediata.]",
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
            className="text-[10px] tracking-[2px] uppercase"
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
          className="text-[15px] italic leading-relaxed"
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
