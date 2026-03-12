"use client";

import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { ADDICTION_TYPES } from "@/lib/constants";
import type { AddictionTypeId } from "@/types";

/* ─── Fondo decorativo: engranes + formas geométricas ──────────────────── */
function Gear({ size = 200, teeth = 12, color = "currentColor" }: { size?: number; teeth?: number; color?: string }) {
  const R = size / 2;
  const r = R * 0.72;
  const rh = R * 0.22;
  const toothW = (2 * Math.PI * r) / teeth * 0.38;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = ((i * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a1 = ((i * 2 * Math.PI) / teeth) + toothW / r / 2;
    const a2 = (((i + 0.5) * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a3 = (((i + 0.5) * 2 * Math.PI) / teeth) + toothW / r / 2;
    const c = Math.cos, s = Math.sin;
    pts.push(`${R + r * c(a0)},${R + r * s(a0)}`);
    pts.push(`${R + R * c(a0)},${R + R * s(a0)}`);
    pts.push(`${R + R * c(a1)},${R + R * s(a1)}`);
    pts.push(`${R + r * c(a1)},${R + r * s(a1)}`);
    pts.push(`${R + r * c(a2)},${R + r * s(a2)}`);
    pts.push(`${R + r * c(a3)},${R + r * s(a3)}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <polygon points={pts.join(" ")} fill={color} />
      <circle cx={R} cy={R} r={rh} fill="white" />
      {[0, 60, 120].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={R + rh * Math.cos(rad)} y1={R + rh * Math.sin(rad)}
            x2={R + r * 0.6 * Math.cos(rad)} y2={R + r * 0.6 * Math.sin(rad)}
            stroke={color} strokeWidth={1.5} opacity={0.5}
          />
        );
      })}
    </svg>
  );
}

function Hexagon({ size = 60, color = "currentColor" }: { size?: number; color?: string }) {
  const s = size / 2;
  const h = s * Math.sqrt(3) / 2;
  const points = [
    [s, 0], [s + h, s / 2], [s + h, 3 * s / 2],
    [s, 2 * s], [s - h, 3 * s / 2], [s - h, s / 2],
  ].map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg width={size + s} height={size * 2} viewBox={`0 0 ${size + s} ${size * 2}`} fill="none" aria-hidden="true">
      <polygon points={points} stroke={color} strokeWidth={1.5} fill="none" />
    </svg>
  );
}

function Diamond({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  const h = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <polygon points={`${h},2 ${size - 2},${h} ${h},${size - 2} 2,${h}`} stroke={color} strokeWidth={1} fill="none" />
      <polygon points={`${h},${h * 0.6} ${h * 1.4},${h} ${h},${h * 1.4} ${h * 0.6},${h}`} stroke={color} strokeWidth={0.8} fill="none" opacity={0.5} />
    </svg>
  );
}

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
    role,
    selectedAddiction,
    otherDescription,
    addictionClassification,
    isLoading,
    error,
    setRole,
    setSelectedAddiction,
    setOtherDescription,
    setAddictionClassification,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleNextStep,
    handleSubmit,
  } = useRegister();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden safe-top-padding login-bg"
    >
      {/* ── Engrane grande — inferior derecha ────────────────────────────── */}
      <div
        className="absolute pointer-events-none select-none animate-spin-gear hidden sm:block"
        style={{ bottom: "-10%", right: "-5%", opacity: 0.07, color: "#1a365d" }}
        aria-hidden="true"
      >
        <Gear size={340} teeth={16} color="currentColor" />
      </div>

      {/* ── Engrane mediano — superior izquierda ─────────────────────────── */}
      <div
        className="absolute pointer-events-none select-none animate-spin-gear-reverse hidden sm:block"
        style={{ top: "-8%", left: "-4%", opacity: 0.055, color: "#0ea5e9" }}
        aria-hidden="true"
      >
        <Gear size={230} teeth={12} color="currentColor" />
      </div>

      {/* ── Formas geométricas flotantes ─────────────────────────────────── */}
      <div
        className="absolute pointer-events-none select-none animate-drift-1 hidden md:block"
        style={{ top: "16%", right: "8%", color: "rgba(14,165,233,0.25)" }}
        aria-hidden="true"
      >
        <Hexagon size={52} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-2 hidden md:block"
        style={{ bottom: "20%", left: "7%", color: "rgba(26,54,93,0.18)" }}
        aria-hidden="true"
      >
        <Diamond size={44} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-3 hidden lg:block"
        style={{ top: "56%", right: "13%", color: "rgba(13,148,136,0.22)" }}
        aria-hidden="true"
      >
        <Hexagon size={34} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-1 hidden lg:block"
        style={{ top: "28%", left: "11%", color: "rgba(14,165,233,0.18)", animationDelay: "-5s" }}
        aria-hidden="true"
      >
        <Diamond size={30} color="currentColor" />
      </div>

      {/* ─── Botón Volver — visible en móvil y desktop ─────────────────────────
          En Capacitor Android este flujo se activa también con el botón físico Back */}
      <Link
        href="/login"
        className="fixed top-4 left-4 z-20 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Volver al inicio de sesión"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className="text-[11px] tracking-[1.5px] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Iniciar sesión
        </span>
      </Link>
      {/* Layout: columna única en móvil, 2 columnas en desktop (lg+) */}
      <div className="w-full max-w-230 flex flex-col gap-6 mt-14 sm:mt-16">

        {/* ── Selector de perfil ──────────────────────────────────────────── */}
        <div
          className="card-surface rounded-2xl border p-5"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
        >
          <p
            className="text-[11px] tracking-[2px] uppercase text-muted mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ¿Cómo deseas registrarte?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Opción: usuario en recuperación */}
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all ${
                role === "user"
                  ? "border-sky-400 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_0_1px_#0ea5e9]"
                  : "select-btn-idle"
              }`}
            >
              <span className={role === "user" ? "text-sky-500" : "rs-text-caption"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20C4 17 7.582 15 12 15C16.418 15 20 17 20 20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p
                  className="text-[11px] font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: role === "user" ? "#0ea5e9" : 'var(--ui-text-muted)' }}
                >
                  En Recuperación
                </p>
                <p className="text-[11px] text-muted mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Busco apoyo y guía
                </p>
              </div>
            </button>

            {/* Opción: padrino / mentor */}
            <button
              type="button"
              onClick={() => setRole("companion")}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all ${
                role === "companion"
                  ? "border-teal-400 bg-teal-50 dark:bg-teal-950/50 shadow-[0_0_0_1px_#2dd4bf]"
                  : "select-btn-idle"
              }`}
            >
              <span className={role === "companion" ? "text-teal-500" : "rs-text-caption"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p
                  className="text-[11px] font-medium"
                  style={{ fontFamily: "'Playfair Display', serif", color: role === "companion" ? "#0d9488" : 'var(--ui-text-muted)' }}
                >
                  Padrino / Mentor
                </p>
                <p className="text-[11px] text-muted mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Quiero acompañar a otros
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ── Columnas principales ────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 items-stretch lg:flex-row lg:gap-8 lg:items-start">
        {/* Left branding + Step 1 */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Branding */}
          <div className="px-4">
            <p
              className="text-[11px] tracking-[2px] uppercase text-muted italic mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — Comienza tu Viaje —
            </p>
            {/* T\u00edtulo marca \u2014 tama\u00f1o responsivo */}
            <h1
              className="text-[38px] sm:text-[52px] font-normal leading-none mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ui-text-heading)' }}
            >
              ReSet
            </h1>
            <p
              className="text-[14px] leading-relaxed max-w-70"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ui-text-muted)' }}
            >
              Un espacio seguro para sanar, reconectar y florecer en libertad.
            </p>
          </div>

          {/* Step 1 Card — padding responsivo */}
          <div className="card-surface rounded-2xl border p-6 sm:p-8 relative overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            {/* Decorative icon top-right */}
            <div className="absolute right-4 top-4 opacity-10">
              <svg width="44" height="44" viewBox="0 0 36 44" fill="none">
                <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>

            <p
              className="text-[11px] tracking-[2px] uppercase text-muted mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Paso 1: Datos de Cuenta
            </p>

            {/* ── Datos de cuenta  ──────────────────────────── */}
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[1.5px] uppercase text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Como desees ser llamado..."
                  className="font-playfair input-line w-full border-0 border-b bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] tracking-[1.5px] uppercase text-muted"
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
                  className="font-playfair input-line w-full border-0 border-b bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[1.5px] uppercase text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="font-playfair input-line w-full border-0 border-b bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[1.5px] uppercase text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="font-playfair input-line w-full border-0 border-b bg-transparent py-2 min-h-11 pr-8 outline-none focus:border-sky-400 transition-colors text-[14px] italic"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-sky-500 transition-colors"
                    style={{ color: 'var(--ui-text-caption)' }}
                    aria-label={showConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"}
                  >
                    {showConfirmPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Indicador visual de coincidencia */}
                {form.confirmPassword.length > 0 && (
                  <p
                    className="text-[10px] tracking-wide"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: form.password === form.confirmPassword ? '#22c55e' : '#f87171',
                    }}
                    aria-live="polite"
                  >
                    {form.password === form.confirmPassword ? '✓ Las contraseñas coinciden' : '✗ No coinciden'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 Card — padding responsivo */}
        <div className="flex-1 card-surface rounded-2xl border p-6 sm:p-8"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>

          {role === "user" ? (
            /* ── Flujo usuario en recuperación ─────────────────────────── */
            <>
              <p
                className="text-[11px] tracking-[2px] uppercase text-sky-500 mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Paso 2: Elige tu Camino
              </p>
              <h2
                className="text-[24px] italic mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ui-text-heading)' }}
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
                          ? "border-sky-400 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_0_1px_#0ea5e9]"
                          : "select-btn-idle"
                      }`}
                    >
                      <span className={isSelected ? "text-sky-500" : "text-sky-400"}>
                        {ADDICTION_ICONS[type.id]}
                      </span>
                      <span
                        className="text-[11px] tracking-[1px] uppercase"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: isSelected ? "#0ea5e9" : 'var(--ui-text-caption)',
                        }}
                      >
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Campos extra cuando se selecciona "Otros" */}
              {selectedAddiction === "otros" && (
                <div className="mb-5 flex flex-col gap-4">
                  {/* Clasificación: conductual o sustancia */}
                  <div>
                    <label
                      className="text-[11px] tracking-[1.5px] uppercase text-muted block mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Tipo de adicción
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAddictionClassification("conductual")}
                        className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border transition-all ${
                          addictionClassification === "conductual"
                            ? "border-sky-400 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_0_1px_#0ea5e9]"
                            : "select-btn-idle"
                        }`}
                      >
                        <span className={addictionClassification === "conductual" ? "text-sky-500" : "rs-text-caption"}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <div>
                          <p
                            className="text-[11px] font-medium"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: addictionClassification === "conductual" ? "#0ea5e9" : 'var(--ui-text-muted)',
                            }}
                          >
                            Conductual
                          </p>
                          <p className="text-[11px] rs-text-caption mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            Compras, juegos, etc.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAddictionClassification("sustancia")}
                        className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border transition-all ${
                          addictionClassification === "sustancia"
                            ? "border-sky-400 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_0_1px_#0ea5e9]"
                            : "select-btn-idle"
                        }`}
                      >
                        <span className={addictionClassification === "sustancia" ? "text-sky-500" : "rs-text-caption"}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <div>
                          <p
                            className="text-[11px] font-medium"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: addictionClassification === "sustancia" ? "#0ea5e9" : 'var(--ui-text-muted)',
                            }}
                          >
                            De Sustancia
                          </p>
                          <p className="text-[11px] rs-text-caption mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            Tabaco, cafeína, etc.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Descripción libre */}
                  <div>
                    <label
                      className="text-[11px] tracking-[1.5px] uppercase text-muted block mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Especifica tu área de renovación
                    </label>
                    <input
                      type="text"
                      value={otherDescription}
                      onChange={(e) => setOtherDescription(e.target.value)}
                      placeholder="Ej: Tabaquismo, Compras, etc."
                      className="font-playfair w-full border-0 border-b border-(--ui-border) bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[12px] italic input-line"
                    />
                  </div>
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
                className="w-full h-13 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl flex items-center justify-center gap-3 mb-4 transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Crear Cuenta
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p
                className="text-[11px] text-muted text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Al registrarte, aceptas nuestros{" "}
                <Link href="/terms" className="text-sky-500 uppercase tracking-[0.5px] hover:underline">
                  Términos de Sanación
                </Link>
              </p>
            </>
          ) : (
            /* ── Flujo padrino / mentor ─────────────────────────────────── */
            <>
              <p
                className="text-[11px] tracking-[2px] uppercase text-teal-500 mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Paso 2: Tu Rol
              </p>
              <h2
                className="text-[24px] italic mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ui-text-heading)' }}
              >
                Bienvenido, Padrino
              </h2>
              <p
                className="text-[13px] italic mb-6 leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ui-text-muted)' }}
              >
                Tu experiencia y compromiso serán un faro de esperanza para quienes caminan hacia la recuperación.
              </p>

              {/* Responsabilidades */}
              <div className="flex flex-col gap-3 mb-6">
                {[
                  {
                    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                    text: "Acompaña a usuarios en su proceso de sanación",
                  },
                  {
                    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
                    text: "Comparte mensajes de motivación y experiencia",
                  },
                  {
                    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                    text: "Revisa el progreso de tus padrinados de forma segura",
                  },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-teal-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p
                      className="text-[11px] rs-text-muted leading-relaxed"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

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
                className="w-full h-13 disabled:opacity-60 text-white rounded-xl flex items-center justify-center gap-3 mb-4 transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 15px rgba(13,148,136,0.25)",
                }}
              >
                Crear Cuenta como Padrino
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p
                className="text-[11px] text-muted text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Al registrarte, aceptas nuestros{" "}
                <Link href="/terms" className="text-teal-500 uppercase tracking-[0.5px] hover:underline">
                  Términos de Sanación
                </Link>
              </p>
            </>
          )}
        </div>
        </div>
      </div>

      {/* Footer — en flujo normal, no fijo */}
      <div className="w-full flex items-center justify-between pt-6 pb-2">
        <p
          className="text-[11px] tracking-[1px] uppercase text-slate-400 italic"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Oasis de Sobriedad — Sistema de Registro
        </p>
        <Link
          href="/login"
          className="text-[11px] tracking-[1px] uppercase text-sky-500 hover:text-sky-600 transition-colors italic"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ¿Ya tienes cuenta?
        </Link>
      </div>
    </div>
  );
}
