"use client";

import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { email, isLoading, error, sent, handleChange, handleSubmit } = useForgotPassword();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg">

      {/* ── Botón Volver ─────────────────────────────────────────────── */}
      <Link
        href="/login"
        className="fixed top-4 left-4 z-20 flex items-center gap-2 hover:text-sky-500 transition-colors"
        style={{ color: "var(--ui-text-caption)" }}
        aria-label="Volver al inicio de sesión"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[11px] tracking-[1.5px] uppercase font-jetbrains">
          Iniciar sesión
        </span>
      </Link>

      {/* ── Contenedor principal ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md px-4 py-8 animate-fade-in-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "#ffffff",
              border: "1px solid #bae6fd",
              boxShadow: "0 4px 14px rgba(14,165,233,0.12)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" aria-hidden="true">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="text-3xl tracking-widest text-center font-playfair"
            style={{ color: "var(--ui-text-heading)" }}
          >
            RESET
          </h1>
          <p className="text-[11px] tracking-[3px] uppercase font-jetbrains text-center mt-1 text-sky-500">
            Recuperación de Cuenta
          </p>
        </div>

        {/* ── Tarjeta ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden login-card">
          {/* Línea decorativa superior */}
          <div
            aria-hidden="true"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent 0%, #7dd3fc 35%, #0ea5e9 50%, #7dd3fc 65%, transparent 100%)",
            }}
          />

          <div className="px-6 pt-8 pb-6 sm:px-9 sm:pt-9">

            {sent ? (
              /* ── Estado: correo enviado ────────────────────────────── */
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" aria-hidden="true">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-lg italic font-playfair" style={{ color: "var(--ui-text-heading)" }}>
                  Revisa tu correo
                </h2>
                <p className="text-[12px] leading-relaxed font-jetbrains" style={{ color: "var(--ui-text-muted)" }}>
                  Si existe una cuenta con{" "}
                  <span className="text-sky-500">{email}</span>, recibirás un enlace para restablecer tu contraseña en los próximos minutos.
                </p>
                <Link
                  href="/login"
                  className="mt-2 text-[11px] tracking-[1.5px] uppercase font-jetbrains text-sky-500 hover:text-sky-400 transition-colors"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            ) : (
              /* ── Formulario ────────────────────────────────────────── */
              <>
                <div className="text-center mb-7">
                  <h2 className="text-xl italic font-playfair mb-2" style={{ color: "var(--ui-text-heading)" }}>
                    ¿Olvidaste tu contraseña?
                  </h2>
                  <p className="text-[12px] font-jetbrains leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>
                    Ingresa tu correo y te enviaremos un enlace para restablecerla.
                  </p>
                  <div
                    className="mx-auto mt-3"
                    style={{
                      height: 1,
                      width: 52,
                      background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)",
                    }}
                  />
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] tracking-[1.2px] uppercase font-jetbrains"
                      style={{ color: "var(--ui-text-muted)" }}
                    >
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "var(--ui-text-caption)" }}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        className="futuristic-input w-full h-13 rounded-xl pl-12 pr-4 font-jetbrains"
                        style={{ fontSize: 13 }}
                        autoComplete="email"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-[11px] text-center font-jetbrains" style={{ color: "#f87171" }} role="alert">
                      {error}
                    </p>
                  )}

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="futuristic-btn w-full h-13 text-white rounded-xl flex items-center justify-center gap-3 mt-1 font-jetbrains"
                    style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar enlace de recuperación
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-5 sm:px-9 flex items-center justify-center gap-1 login-card-footer">
            <span className="text-sm italic font-playfair" style={{ color: "var(--ui-text-body)" }}>
              ¿Recordaste tu contraseña?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm italic font-bold font-playfair text-sky-500 hover:text-sky-600 transition-colors"
            >
              Inicia sesión
            </Link>
          </div>
        </div>

        {/* Footer mínimo */}
        <p className="text-[11px] tracking-[1px] uppercase font-jetbrains text-center mt-6 italic" style={{ color: "var(--ui-text-caption)" }}>
          cada paso, un día a la paz.
        </p>
      </div>
    </div>
  );
}
