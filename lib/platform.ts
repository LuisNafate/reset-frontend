/**
 * lib/platform.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Utilidades de detección de plataforma para convivencia web / Capacitor.
 *
 * Regla de uso: importar solo desde "use client" (client components / hooks).
 * En SSR/SSG siempre devuelve 'web' ya que `window` no existe.
 */

/** Devuelve true si la app corre dentro del WebView nativo de Capacitor. */
export function isNativePlatform(): boolean {
  if (typeof window === "undefined") return false;
  return (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor?.isNativePlatform?.() === true;
}

/** Devuelve 'android' | 'ios' | 'web'. */
export function getPlatform(): "android" | "ios" | "web" {
  if (typeof window === "undefined") return "web";
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } }).Capacitor;
  if (!cap?.isNativePlatform?.()) return "web";
  const p = cap.getPlatform?.() ?? "web";
  if (p === "android" || p === "ios") return p;
  return "web";
}
