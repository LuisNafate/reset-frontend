/**
 * navigation.ts
 * ─────────────────────────────────────────────────────────────────
 * Jerarquía de rutas de la app y utilidades de navegación.
 *
 * INTEGRACIÓN CON CAPACITOR (App plugin):
 * ────────────────────────────────────────
 * Cuando integres la app nativa, conecta el evento backButton así:
 *
 *   import { App } from '@capacitor/app';
 *   import { isRootRoute, getParentRoute } from '@/lib/navigation';
 *
 *   App.addListener('backButton', ({ canGoBack }) => {
 *     const pathname = window.location.pathname;
 *     if (isRootRoute(pathname)) {
 *       App.exitApp();   // Solo en la pantalla raíz → cierra la app
 *     } else {
 *       const parent = getParentRoute(pathname);
 *       if (parent) router.push(parent);
 *       else if (canGoBack) window.history.back();
 *       else App.exitApp();
 *     }
 *   });
 * ─────────────────────────────────────────────────────────────────
 */

/** Rutas raíz — el botón físico de Android cierra la app aquí. */
export const ROOT_ROUTES = ["/login", "/register", "/dashboard", "/acompanante"] as const;

/**
 * Mapa de rutas a su padre directo.
 * Usado para generar el botón "Atrás" y para el manejador de Capacitor.
 */
export const PARENT_ROUTES: Record<string, string> = {
  "/dashboard/bitacora":       "/dashboard",
  "/dashboard/foro":           "/dashboard",
  "/dashboard/configuracion":  "/dashboard",
  "/dashboard/tecnicas":       "/dashboard",
  "/acompanante/historial":    "/acompanante",
  "/acompanante/mensajes":     "/acompanante",
  "/acompanante/cuenta":       "/acompanante",
  "/acompanante/tecnicas":     "/acompanante",
};

/** Títulos legibles por ruta, para la barra superior móvil. */
export const ROUTE_LABELS: Record<string, string> = {
  "/login":                    "Inicio de Sesión",
  "/register":                 "Crear cuenta",
  "/dashboard":                "ReSet",
  "/dashboard/bitacora":       "Bitácora",
  "/dashboard/foro":           "Foro",
  "/dashboard/configuracion":  "Configuración",
  "/dashboard/tecnicas":       "Técnicas",
  "/acompanante":              "Monitoreo",
  "/acompanante/historial":    "Historial",
  "/acompanante/mensajes":     "Mensajes",
  "/acompanante/cuenta":       "Mi Cuenta",
  "/acompanante/tecnicas":     "Técnicas",
};

/** Devuelve true si la ruta es raíz (no debe navegar hacia atrás). */
export function isRootRoute(pathname: string): boolean {
  return (ROOT_ROUTES as readonly string[]).includes(pathname);
}

/** Obtiene la ruta padre de una sub-ruta, o null si es raíz. */
export function getParentRoute(pathname: string): string | null {
  if (PARENT_ROUTES[pathname]) return PARENT_ROUTES[pathname];
  // Fallback genérico: sube un nivel
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 1) return "/" + parts.slice(0, -1).join("/");
  return null;
}

/** Obtiene el título legible de una ruta. */
export function getRouteLabel(pathname: string): string {
  return ROUTE_LABELS[pathname] ?? "ReSet";
}
