"use client";

import Link from "next/link";

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
            Términos y Condiciones de Uso
          </h1>
          <div
            className="mx-auto mt-4"
            style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)" }}
          />
          <p className="mt-5 text-[13px] font-jetbrains leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>
            Bienvenido a <strong>ReSet</strong>, una aplicación web y móvil orientada al monitoreo emocional y
            reforzamiento social para personas en proceso de recuperación de adicciones en México.
            Al registrarte y utilizar nuestra plataforma (disponible en{" "}
            <a href="https://reset-app.tech" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
              https://reset-app.tech
            </a>
            ), aceptas los siguientes Términos y Condiciones. Te invitamos a leerlos cuidadosamente.
          </p>
        </div>

        <div className="flex flex-col gap-8 font-jetbrains text-[13px] leading-relaxed" style={{ color: "var(--ui-text-body)" }}>

          {/* Sección 1 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              1. Naturaleza y Propósito de la Plataforma
            </h2>
            <p style={{ color: "var(--ui-text-muted)" }}>
              ReSet es una herramienta digital de acompañamiento diseñada para adultos (mayores de 18 años)
              que se encuentran en etapa de abstinencia activa o recuperación avanzada. La plataforma te
              permite llevar una bitácora diaria de tu estado emocional, gestionar un sistema de rachas de
              sobriedad, y mantener un enlace directo con una red de apoyo y un foro comunitario.
            </p>
            <div
              className="mt-3 rounded-xl px-4 py-3 border border-amber-300/40"
              style={{ background: "rgba(251,191,36,0.06)" }}
            >
              <p className="text-[12px]" style={{ color: "var(--ui-text-muted)" }}>
                <strong className="text-amber-400">Importante:</strong>{" "}
                ReSet es una herramienta de apoyo y automonitoreo; en ningún momento sustituye el
                diagnóstico, tratamiento médico, psicológico o psiquiátrico profesional.
              </p>
            </div>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              2. Uso de Datos para Investigación Científica
            </h2>
            <p style={{ color: "var(--ui-text-muted)" }} className="mb-3">
              Además de proporcionarte una red de apoyo, ReSet es un proyecto desarrollado por un equipo de
              ingeniería de software integrado por:
            </p>
            <ul className="list-none flex flex-col gap-1 mb-3 pl-2">
              {["Gilberto Málaga Fernández", "Luis Alberto Náfate Hernández", "Jeshua Isaac Luna Zúñiga"].map((name) => (
                <li key={name} className="flex items-center gap-2" style={{ color: "var(--ui-text-muted)" }}>
                  <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                  {name}
                </li>
              ))}
            </ul>
            <p style={{ color: "var(--ui-text-muted)" }} className="mb-3">
              El proyecto tiene un propósito de investigación académica avalado bajo las normativas de salud.
              Al utilizar la plataforma, aceptas que los datos estadísticos generados por tu interacción sirvan
              para comprobar la siguiente hipótesis de investigación:
            </p>
            <blockquote
              className="border-l-2 border-sky-400 pl-4 italic text-[12px] py-2"
              style={{ color: "var(--ui-text-caption)" }}
            >
              "La integración de un canal de enlace social dentro de la plataforma Reset actúa como un
              facilitador para la apertura emocional del usuario. Se postula que la existencia de este recurso
              técnico incrementa la frecuencia de los registros de vulnerabilidad, al reducir la percepción de
              aislamiento durante el proceso de recuperación, independientemente de la naturaleza (química o
              conductual) de la adicción."
            </blockquote>

            {/* Sub-sección 2.1 */}
            <div className="mt-5">
              <h3 className="text-[11px] tracking-[1.5px] uppercase text-sky-400 mb-3">
                2.1. Garantía Absoluta de Privacidad en la Investigación
              </h3>
              <p style={{ color: "var(--ui-text-muted)" }} className="mb-3">
                Entendemos que la información sobre tu recuperación es profundamente personal. Por ello, el
                análisis para esta investigación se clasifica como de "riesgo mínimo" y se rige bajo un
                estricto protocolo de anonimización y disociación de datos. Esto significa que:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-sky-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p style={{ color: "var(--ui-text-muted)" }}>
                    <strong style={{ color: "var(--ui-text-body)" }}>No se usarán datos identificativos:</strong>{" "}
                    Tu correo electrónico, contraseñas, nombre real, identificadores de dispositivo y los datos
                    personales de tus contactos de emergencia nunca formarán parte del conjunto de datos de la
                    investigación.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-sky-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p style={{ color: "var(--ui-text-muted)" }}>
                    <strong style={{ color: "var(--ui-text-body)" }}>Análisis ciego:</strong>{" "}
                    Solo se analizarán tendencias numéricas y categóricas (como la frecuencia de uso del foro,
                    promedios de craving en escala del 1 al 10 y el estado de ánimo), completamente
                    desvinculadas de tu identidad para imposibilitar la re-identificación en cualquier
                    publicación científica o académica.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              3. Privacidad y Datos Personales Sensibles
            </h2>
            <p style={{ color: "var(--ui-text-muted)" }} className="mb-3">
              Dado que la plataforma recaba información sobre tu tipo de adicción, estados de ánimo y nivel de
              craving (ansiedad por consumo), esta información es catalogada y protegida como{" "}
              <strong style={{ color: "var(--ui-text-body)" }}>datos personales sensibles</strong> ante la{" "}
              <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em>.
            </p>
            <p style={{ color: "var(--ui-text-muted)" }} className="mb-3">
              Toda la comunicación en la plataforma viaja cifrada y tus contraseñas son almacenadas mediante
              algoritmos de encriptación seguros (hash bcrypt).
            </p>
            <p style={{ color: "var(--ui-text-muted)" }}>
              Tienes en todo momento el derecho de ejercer tus{" "}
              <strong style={{ color: "var(--ui-text-body)" }}>Derechos ARCO</strong> (Acceso, Rectificación,
              Cancelación y Oposición) sobre tu información.
            </p>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              4. Red de Apoyo y Foro Comunitario
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-sky-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p style={{ color: "var(--ui-text-muted)" }}>
                  <strong style={{ color: "var(--ui-text-body)" }}>Emergencias:</strong>{" "}
                  El botón de emergencia enviará alertas a los contactos (entre 1 y 5 personas) que tú mismo
                  decidas registrar voluntariamente. Eres responsable de contar con el permiso de estas personas
                  para darlos de alta en tu red.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-sky-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p style={{ color: "var(--ui-text-muted)" }}>
                  <strong style={{ color: "var(--ui-text-body)" }}>Foro:</strong>{" "}
                  El foro comunitario es un espacio de respeto. Tienes el derecho de realizar publicaciones de
                  forma totalmente anónima para proteger tu identidad. El equipo de administración se reserva
                  el derecho de moderar o eliminar contenido que promueva el consumo, lenguaje de odio o
                  vulnere la seguridad de otros usuarios.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              5. Cuentas y Seguridad
            </h2>
            <p style={{ color: "var(--ui-text-muted)" }} className="mb-2">
              Eres responsable de mantener la confidencialidad de tus credenciales de acceso (correo y
              contraseña).
            </p>
            <p style={{ color: "var(--ui-text-muted)" }}>
              ReSet no se hace responsable por el acceso no autorizado a tu bitácora derivado del descuido de
              tu sesión en dispositivos compartidos.
            </p>
          </section>

          {/* Sección 6 */}
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3">
              6. Jurisdicción y Ley Aplicable
            </h2>
            <p style={{ color: "var(--ui-text-muted)" }}>
              Para la interpretación y cumplimiento de los presentes Términos y Condiciones, las partes se
              someten a la jurisdicción de las leyes y tribunales competentes en{" "}
              <strong style={{ color: "var(--ui-text-body)" }}>Tuxtla Gutiérrez, Chiapas, México</strong>,
              renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios
              presentes o futuros.
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
