"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const APK_URL = "https://reset-storage.sfo3.digitaloceanspaces.com/reset.apk";

const STEPS = [
  {
    number: "01",
    title: "Descarga el archivo de instalación",
    description:
      'Toca el botón "Descargar ReSet para Android" de esta página. Tu navegador descargará el archivo reset.apk (unos pocos MB).',
    highlight: "reset.apk",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 16v-4m0 0V8m0 4H8m4 0h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Abre el archivo descargado",
    description:
      'Busca la notificación del archivo descargado en tu barra de estado o en la carpeta de Descargas. Toca reset.apk para abrirlo.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M3 7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Permite instalar desde fuentes desconocidas",
    description:
      'Android te pedirá permiso para instalar apps externas a la Play Store. Toca "Configuración" y activa la opción "Permitir" para tu navegador o gestor de archivos.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Toca Instalar y listo",
    description:
      'Vuelve al archivo APK y toca "Instalar". En unos segundos ReSet estará en tu pantalla de inicio, listo para usar como cualquier otra app.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "¿Es seguro instalar un APK fuera de la Play Store?",
    a: "Sí. El APK de ReSet está firmado y alojado en nuestros servidores oficiales. Solo descárgalo desde este enlace o desde reset-app.tech para garantizar que es el archivo original.",
  },
  {
    q: "¿Por qué Android me pide permiso para instalar apps externas?",
    a: "Es una medida de seguridad del sistema operativo. Solo necesitas conceder el permiso una vez para el navegador que usaste para descargar el APK.",
  },
  {
    q: "¿Está disponible para iPhone?",
    a: "Próximamente. La versión para iOS está en desarrollo. Por ahora puedes usar ReSet desde el navegador en reset-app.tech.",
  },
  {
    q: "¿Cómo recibo actualizaciones?",
    a: "Cuando haya una nueva versión te notificaremos dentro de la app. Solo descarga el APK actualizado desde esta página o desde reset-app.tech e instálalo encima del anterior.",
  },
];

export default function DownloadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full login-bg safe-top-padding">

      {/* ── Barra superior ──────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-8 py-3 border-b"
        style={{ background: "var(--surface-card)", borderColor: "var(--ui-border-subtle)" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 transition-colors hover:text-sky-500"
          style={{ color: "var(--ui-text-caption)" }}
          aria-label="Volver"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-jetbrains text-[11px] tracking-[1.5px] uppercase">Volver</span>
        </button>
        <div className="flex-1" />
        <Link href="/login" className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-sky-500 hover:text-sky-400 transition-colors">
          Ya tengo cuenta →
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 pb-24">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="font-jetbrains text-[11px] tracking-[3px] uppercase text-sky-500 mb-3">
            Instalación gratuita
          </p>
          <h1
            className="font-playfair text-[38px] sm:text-[52px] italic leading-tight mb-4"
            style={{ color: "var(--ui-text-heading)" }}
          >
            Lleva ReSet contigo
          </h1>
          <p
            className="font-jetbrains text-[13px] leading-relaxed max-w-md mx-auto"
            style={{ color: "var(--ui-text-muted)" }}
          >
            Descarga el APK e instálalo en tu Android en menos de dos minutos. Sin Play Store.
          </p>

          {/* Badges de compatibilidad */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-jetbrains text-[11px] tracking-[1px] uppercase"
              style={{ borderColor: "var(--ui-border)", color: "var(--ui-text-muted)", background: "var(--surface-card)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L4 20M18 18l2 2M7 4l10 0M7 4C7 4 4 8 4 13h16c0-5-3-9-3-9M4 13h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Android
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-jetbrains text-[11px] tracking-[1px] uppercase"
              style={{ borderColor: "var(--ui-border)", color: "var(--ui-text-muted)", background: "var(--surface-card)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="15" rx="2" strokeLinecap="round" />
                <path d="M8 21h8M12 18v3" strokeLinecap="round" />
              </svg>
              Web
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-jetbrains text-[11px] tracking-[1px] uppercase opacity-50"
              style={{ borderColor: "var(--ui-border)", color: "var(--ui-text-muted)", background: "var(--surface-card)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 15h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              iOS — Próximamente
            </span>
          </div>

          {/* Botón de descarga principal */}
          <div className="mt-8">
            <a
              href={APK_URL}
              download="reset.apk"
              className="landing-btn-primary font-jetbrains text-[11px] uppercase tracking-[1.5px] px-8 py-4 rounded-sm inline-flex items-center justify-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 16v-8m0 8l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Descargar ReSet para Android
            </a>
            <p className="font-jetbrains text-[10px] tracking-[1px] mt-3" style={{ color: "var(--ui-text-caption)" }}>
              reset.apk · Android 8.0+
            </p>
          </div>
        </div>

        {/* ── Pasos ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-16">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex gap-5 p-5 sm:p-6 rounded-2xl border relative"
              style={{
                background: "var(--surface-card)",
                borderColor: "var(--ui-border-subtle)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              {/* Línea conectora */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-9.5 sm:left-10.5 top-full h-4 w-px"
                  style={{ background: "var(--ui-border-subtle)" }}
                />
              )}

              {/* Número + ícono */}
              <div className="shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--surface-card-inner)", color: "#0ea5e9" }}
                >
                  {step.icon}
                </div>
                <span
                  className="font-jetbrains text-[10px] tracking-[1px]"
                  style={{ color: "var(--ui-text-caption)" }}
                >
                  {step.number}
                </span>
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-1.5 pt-1">
                <h3
                  className="font-playfair italic text-[18px] leading-tight"
                  style={{ color: "var(--ui-text-heading)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-jetbrains text-[12px] leading-relaxed"
                  style={{ color: "var(--ui-text-muted)" }}
                >
                  {step.description}
                </p>
                {step.highlight && (
                  <p
                    className="font-jetbrains text-[13px] tracking-[1px] mt-1"
                    style={{ color: "#0ea5e9" }}
                  >
                    → {step.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA central ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-8 text-center mb-16"
          style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            borderColor: "#bae6fd",
          }}
        >
          <p className="font-jetbrains text-[11px] tracking-[3px] uppercase text-sky-500 mb-2">
            ¿Ya la instalaste?
          </p>
          <h2
            className="font-playfair italic text-[26px] mb-3 leading-tight"
            style={{ color: "#0c4a6e" }}
          >
            Comienza tu recuperación
          </h2>
          <p className="font-jetbrains text-[12px] leading-relaxed mb-3" style={{ color: "#075985" }}>
            Crea tu cuenta gratuita o inicia sesión para acceder a todas las herramientas de ReSet.
          </p>
          <a
            href={APK_URL}
            download="reset.apk"
            className="inline-flex items-center gap-2 font-jetbrains text-[10px] tracking-[1.5px] uppercase text-sky-600 hover:text-sky-500 transition-colors mb-4"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Descargar APK de Android
          </a>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <Link
              href="/register"
              className="landing-btn-primary font-jetbrains text-[11px] uppercase tracking-[1.5px] px-8 py-3.5 rounded-sm inline-flex items-center justify-center gap-2"
            >
              Crear cuenta gratuita
            </Link>
            <Link
              href="/login"
              className="font-jetbrains text-[11px] uppercase tracking-[1.5px] px-8 py-3.5 rounded-sm inline-flex items-center justify-center border transition-colors"
              style={{ borderColor: "#7dd3fc", color: "#0369a1", background: "white" }}
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <div>
          <h2
            className="font-playfair italic text-[24px] mb-8 text-center"
            style={{ color: "var(--ui-text-heading)" }}
          >
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border p-5"
                style={{ background: "var(--surface-card)", borderColor: "var(--ui-border-subtle)" }}
              >
                <p
                  className="font-jetbrains text-[12px] tracking-[0.5px] mb-2"
                  style={{ color: "var(--ui-text-heading)" }}
                >
                  {faq.q}
                </p>
                <p
                  className="font-jetbrains text-[12px] leading-relaxed"
                  style={{ color: "var(--ui-text-muted)" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
