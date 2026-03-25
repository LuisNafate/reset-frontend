"use client";

import Link from "next/link";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/* ─── SVG: Eye Icons ──────────────────────────────────────────────────────── */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const { 
    form, 
    showPassword, 
    isLoading, 
    error, 
    setShowPassword, 
    handleChange, 
    handleSubmit 
  } = useAdminLogin();

  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg">
      {/* Decorative patterns matching main app */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <Link
        href="/login"
        className="fixed top-4 left-4 z-20 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[11px] tracking-[1.5px] uppercase font-jetbrains">Volver</span>
      </Link>

      <div className="relative z-10 w-full max-w-md px-4 py-8 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white border border-sky-100 shadow-md">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-4xl tracking-widest text-center leading-tight font-playfair text-slate-900">RESET</h1>
          <p className="text-[11px] tracking-[3px] uppercase font-jetbrains text-center mt-1 text-sky-500">Módulo Administrativo</p>
        </div>

        <div className="rounded-2xl overflow-hidden login-card shadow-xl border border-white/50 bg-white/80 backdrop-blur-sm">
          <div
            className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
          />

          <div className="px-6 pt-10 pb-8 sm:px-9">
            <div className="text-center mb-8">
              <h2 className="text-xl italic font-playfair mb-2 text-slate-800">Panel de Control</h2>
              <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains text-slate-500">
                  Identificador Admin
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@reset-app.tech"
                    className="futuristic-input w-full h-12 rounded-xl pl-12 pr-4 font-jetbrains text-[13px] border border-slate-200 outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains text-slate-500">
                  Clave Master
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="futuristic-input w-full h-12 rounded-xl pl-12 pr-12 font-jetbrains text-[13px] border border-slate-200 outline-none focus:border-sky-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-[11px] text-center font-jetbrains text-rose-500 animate-shake">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-200 text-white rounded-xl flex items-center justify-center gap-3 mt-2 font-jetbrains text-[11px] tracking-[2.5px] uppercase transition-all shadow-md active:scale-95"
              >
                {isLoading ? "Autenticando..." : "Acceder al Sistema"}
              </button>
            </form>
          </div>

          <div className="px-6 py-5 sm:px-9 flex flex-col items-center border-t border-slate-50 bg-slate-50/50">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-jetbrains">
              Acceso restringido a personal autorizado
            </span>
          </div>
        </div>

        <p className="text-[11px] tracking-[1px] uppercase font-jetbrains text-center mt-8 text-slate-400">
          cada paso, un día a la paz.
        </p>
      </div>
    </div>
  );
}
