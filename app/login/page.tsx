"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

/* ─── SVG: Engrane ──────────────────────────────────────────────────────────
   Componente inline — no depende de librerías externas.
──────────────────────────────────────────────────────────────────────────── */
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

/* ─── SVG: Hexágono decorativo ─────────────────────────────────────────── */
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

/* ─── SVG: Diamante decorativo ─────────────────────────────────────────── */
function Diamond({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  const h = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <polygon points={`${h},2 ${size - 2},${h} ${h},${size - 2} 2,${h}`} stroke={color} strokeWidth={1} fill="none" />
      <polygon points={`${h},${h * 0.6} ${h * 1.4},${h} ${h},${h * 1.4} ${h * 0.6},${h}`} stroke={color} strokeWidth={0.8} fill="none" opacity={0.5} />
    </svg>
  );
}

/* ─── Toggle eye icons ──────────────────────────────────────────────────── */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const { form, showPassword, isLoading, error, setShowPassword, handleChange, handleSubmit } = useLogin();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg"
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

      {/* ── Contenedor principal ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up">

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
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" aria-hidden="true">
              <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" fill="#e0f2fe" />
              <path d="M18 4C18 4 7 12 7 22C7 30.284 11.925 37.08 18 38.75C24.075 37.08 29 30.284 29 22C29 12 18 4 18 4Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
              <path d="M18 12 L18 28 M12 20 L18 14 L24 20" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1
            className="text-4xl tracking-widest text-center leading-tight font-playfair"
            style={{ color: 'var(--ui-text-heading)' }}
          >
            RESET
          </h1>
          <p
            className="text-[11px] tracking-[3px] uppercase font-jetbrains text-center mt-1 text-sky-500"
          >
            Tu Oasis · Recuperación &amp; Paz
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

            {/* Encabezado */}
            <div className="text-center mb-7">
              <h2 className="text-xl italic font-playfair mb-2" style={{ color: 'var(--ui-text-heading)' }}>
                Bienvenido de nuevo
              </h2>
              <div
                className="mx-auto"
                style={{
                  height: 1,
                  width: 52,
                  background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)",
                }}
              />
            </div>

            {/* Formulario */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
                  Correo Electrónico
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ui-text-caption)' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="futuristic-input w-full h-13 rounded-xl pl-12 pr-4 font-jetbrains" style={{ fontSize: 13 }}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
                    Contraseña
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] tracking-wide uppercase font-jetbrains text-sky-500 hover:text-sky-400 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ui-text-caption)' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="futuristic-input w-full h-13 rounded-xl pl-12 pr-12 font-jetbrains" style={{ fontSize: 13 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-sky-500 transition-colors" style={{ color: 'var(--ui-text-caption)' }}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[11px] text-center font-jetbrains" style={{ color: "#f87171" }} role="alert">
                  {error}
                </p>
              )}

              {/* Botón de envío */}
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
                    Verificando...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>


          </div>

          {/* Enlace de registro */}
          <div className="px-6 py-5 sm:px-9 flex items-center justify-center gap-1 login-card-footer">
            <span className="text-sm italic font-playfair" style={{ color: 'var(--ui-text-body)' }}>
              ¿No tienes cuenta?{" "}
            </span>
            <Link
              href="/register"
              className="text-sm italic font-bold font-playfair text-sky-500 hover:text-sky-600 transition-colors"
            >
              Regístrate
            </Link>
          </div>
        </div>

        {/* Footer mínimo */}
        <p className="text-[11px] tracking-[1px] uppercase font-jetbrains text-center mt-6 italic" style={{ color: 'var(--ui-text-caption)' }}>
          cada paso, un día a la paz.
        </p>
      </div>
    </div>
  );
}

