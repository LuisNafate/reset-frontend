"use client";

import Link from "next/link";

/**
 * TODO (equipo): Reemplazar las secciones marcadas con el contenido legal real.
 * Coordinar con el equipo legal / fundadores antes de publicar en producción.
 */

const LAST_UPDATED = "2026-03-10";

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full relative safe-top-padding login-bg">

      {/* ── Botón Volver ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex items-center gap-4 px-4 py-3 border-b" style={{ background: "var(--surface-card)", borderColor: "var(--ui-border-subtle)" }}>
        <Link
          href="/register"
          className="flex items-center gap-2 hover:text-sky-500 transition-colors"
          style={{ color: "var(--ui-text-caption)" }}
          aria-label="Volver al registro"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] tracking-[1.5px] uppercase font-jetbrains">Volver</span>
        </Link>
        <div className="flex-1" />
        <span className="text-[10px] tracking-[1px] uppercase font-jetbrains" style={{ color: "var(--ui-text-caption)" }}>
          Última actualización: {LAST_UPDATED}
        </span>
      </div>

      {/* ── Contenido ────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">

        {/* Encabezado */}
        <div className="mb-10 text-center">
          <p className="text-[11px] tracking-[3px] uppercase font-jetbrains text-sky-500 mb-2">
            Plataforma ReSet
          </p>
          <h1 className="text-3xl font-playfair italic" style={{ color: "var(--ui-text-heading)" }}>
            Términos de Sanación
          </h1>
          <div
            className="mx-auto mt-4"
            style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)" }}
          />
        </div>

        <div className="flex flex-col gap-8 font-jetbrains text-[13px] leading-relaxed" style={{ color: "var(--ui-text-body)" }}>

          {/* Sección 1 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              1. Aceptación de los términos
            </h2>
            {/* TODO: Redactar con el equipo legal. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Contenido pendiente de redacción por el equipo. Describir que al registrarse el usuario acepta estos términos.]
            </p>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              2. Descripción del servicio
            </h2>
            {/* TODO: Redactar con el equipo. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Describir qué es ReSet, su propósito de acompañamiento en procesos de recuperación de adicciones, y que NO sustituye tratamiento médico profesional.]
            </p>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              3. Privacidad y datos personales
            </h2>
            {/* TODO: Redactar con el equipo legal / DPO. Incluir referencia a la política de privacidad. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Explicar qué datos se recopilan (nombre, correo, tipo de adicción), cómo se almacenan, con quién se comparten (sponsor/padrinado) y derechos del usuario (acceso, rectificación, eliminación).]
            </p>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              4. Uso aceptable
            </h2>
            {/* TODO: Redactar con el equipo. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Definir conductas prohibidas: acoso, suplantación de identidad, uso de la plataforma para actividades ilegales, etc.]
            </p>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              5. Limitación de responsabilidad
            </h2>
            {/* TODO: Redactar con el equipo legal. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Aclarar que ReSet es una herramienta de apoyo y no reemplaza atención médica, psicológica ni tratamientos de rehabilitación.]
            </p>
          </section>

          {/* Sección 6 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              6. Modificaciones
            </h2>
            {/* TODO: Redactar con el equipo. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Indicar cómo se notificarán cambios a los términos y el plazo para aceptarlos o darse de baja.]
            </p>
          </section>

          {/* Sección 7 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-2">
              7. Contacto
            </h2>
            {/* TODO: Agregar correo / canal de contacto oficial. */}
            <p style={{ color: "var(--ui-text-muted)" }}>
              [TODO — Correo de contacto para dudas legales: legal@reset-app.com (pendiente confirmar con el equipo).]
            </p>
          </section>

        </div>

        {/* CTA de regreso */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/register"
            className="futuristic-btn px-8 h-11 text-white rounded-xl flex items-center gap-3 font-jetbrains"
            style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Volver al registro
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
