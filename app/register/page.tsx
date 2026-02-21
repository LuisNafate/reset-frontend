"use client";

import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { ADDICTION_TYPES } from "@/lib/constants";
import type { AddictionTypeId } from "@/types";

// SVG icons are purely visual — they stay in the component
const ADDICTION_ICONS: Record<AddictionTypeId, React.ReactNode> = {
  alcohol: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M9 3H15L14 8H10L9 3Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 8C10 8 8 10 8 13C8 16.866 10.686 20 12 20C13.314 20 16 16.866 16 13C16 10 14 8 14 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 13H16" strokeLinecap="round"/>
    </svg>
  ),
  drogas: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="4" y="8" width="16" height="8" rx="4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round"/>
    </svg>
  ),
  apuestas: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="16" cy="16" r="1.2" fill="currentColor"/>
      <circle cx="16" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="8" cy="16" r="1.2" fill="currentColor"/>
    </svg>
  ),
  videojuegos: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 12H10M8 10V14" strokeLinecap="round"/>
      <circle cx="15" cy="11" r="1" fill="currentColor"/>
      <circle cx="17" cy="13" r="1" fill="currentColor"/>
      <path d="M3 8C3 6.895 3.895 6 5 6H19C20.105 6 21 6.895 21 8V16C21 17.105 20.105 18 19 18H5C3.895 18 3 17.105 3 16V8Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  celular: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="7" y="2" width="10" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  sexo: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 13.5C8.5 13.5 9.5 15.5 12 15.5C14.5 15.5 15.5 13.5 15.5 13.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.5" cy="10.5" r="1" fill="currentColor"/>
      <circle cx="14.5" cy="10.5" r="1" fill="currentColor"/>
    </svg>
  ),
  otros: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12M12 16H12.01" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function RegisterPage() {
  const {
    form,
    selectedAddiction,
    otherDescription,
    isLoading,
    error,
    setSelectedAddiction,
    setOtherDescription,
    handleChange,
    handleNextStep,
    handleSubmit,
  } = useRegister();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: "#eef2f7" }}
    >
      <div className="w-full max-w-[920px] flex gap-8 items-start">
        {/* Left branding + Step 1 */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Branding */}
          <div className="px-4">
            <p
              className="text-[9px] tracking-[2px] uppercase text-slate-400 italic mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — Comienza tu Viaje —
            </p>
            <h1
              className="text-[52px] font-normal text-slate-700 leading-none mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ReSet
            </h1>
            <p
              className="text-[14px] text-slate-500 leading-relaxed max-w-[280px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Un espacio seguro para sanar, reconectar y florecer en libertad.
            </p>
          </div>

          {/* Step 1 Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 relative overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            {/* Decorative icon top-right */}
            <div className="absolute right-4 top-4 opacity-10">
              <svg width="44" height="44" viewBox="0 0 36 44" fill="none">
                <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>

            <p
              className="text-[9px] tracking-[2px] uppercase text-slate-400 mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Paso 1: Datos de Cuenta
            </p>

            <div className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Como desees ser llamado..."
                  className="w-full border-0 border-b border-slate-200 bg-transparent py-2 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Correo Electrónico
                  </label>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                    <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border-0 border-b border-slate-200 bg-transparent py-2 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border-0 border-b border-slate-200 bg-transparent py-2 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 Card */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-8"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <p
            className="text-[9px] tracking-[2px] uppercase text-sky-500 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Paso 2: Elige tu Camino
          </p>
          <h2
            className="text-[24px] italic text-slate-700 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¿En qué área buscas renovarte?
          </h2>

          {/* Grid with ADDICTION_TYPES */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {ADDICTION_TYPES.map((type) => {
              const isSelected = selectedAddiction === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedAddiction(type.id as AddictionTypeId)}
                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl border transition-all ${
                    isSelected
                      ? "border-sky-400 bg-sky-50 shadow-[0_0_0_1px_#0ea5e9]"
                      : "border-slate-100 bg-white hover:border-sky-200 hover:bg-slate-50"
                  }`}
                >
                  <span className={isSelected ? "text-sky-500" : "text-sky-400"}>
                    {ADDICTION_ICONS[type.id]}
                  </span>
                  <span
                    className="text-[9px] tracking-[1px] uppercase"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isSelected ? "#0ea5e9" : "#94a3b8",
                    }}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Other description field */}
          {selectedAddiction === "otros" && (
            <div className="mb-5">
              <label
                className="text-[9px] tracking-[1.5px] uppercase text-slate-400 block mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Especifica tu área de renovación
              </label>
              <input
                type="text"
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
                placeholder="Ej: Tabaquismo, Compras, etc."
                className="w-full border-0 border-b border-slate-200 bg-transparent py-2 text-slate-500 placeholder-slate-400 outline-none focus:border-sky-400 transition-colors text-[12px] italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-[11px] text-red-400 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-[52px] bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl flex items-center justify-center gap-3 mb-4 transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Crear Cuenta
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <p
            className="text-[9px] text-slate-400 text-center"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Al registrarte, aceptas nuestros{" "}
            <a href="#" className="text-sky-500 uppercase tracking-[0.5px] hover:underline">
              Términos de Sanación
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 flex items-center justify-between px-10">
        <p
          className="text-[9px] tracking-[1px] uppercase text-slate-400 italic"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Oasis de Sobriedad — Sistema de Registro
        </p>
        <Link
          href="/login"
          className="text-[9px] tracking-[1px] uppercase text-sky-500 hover:text-sky-600 transition-colors italic"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ¿Ya tienes cuenta?
        </Link>
      </div>
    </div>
  );
}
