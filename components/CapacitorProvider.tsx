"use client";

/**
 * components/CapacitorProvider.tsx
 * ────────────────────────────────────────────────────────────────────────────
 * Componente raíz que conecta los eventos del sistema nativo con la app React.
 *
 * Solo actúa cuando `isNativePlatform()` devuelve true — sin coste en web.
 *
 * RESPONSABILIDADES:
 *  1. Botón físico "Atrás" de Android (App plugin de Capacitor)
 *     - En rutas raíz (/login, /register, /dashboard, /acompanante): cierra la app
 *       con App.exitApp() — así no se sale accidentalmente a la home del móvil.
 *     - En sub-rutas: navega a la ruta padre usando la jerarquía definida en
 *       lib/navigation.ts (mismo mapa que usa el botón atrás en la topbar).
 *
 *  2. Pantalla de restauración de sesión (isRestoring)
 *     - Mientras AuthContext está restaurando la sesión desde storage muestra
 *       una pantalla de espera para evitar el flash de "no autenticado".
 *     - Solo dura unos milisegundos en la práctica.
 *
 * POR IMPLEMENTAR (cuando el backend lo soporte):
 *  - App.addListener('appStateChange', ...) para refrescar el token JWT
 *    cuando la app vuelve del fondo (resume).
 *  - Push notifications con @capacitor/push-notifications.
 */

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isNativePlatform } from "@/lib/platform";
import { isRootRoute, getParentRoute } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";

interface CapacitorProviderProps {
  children: ReactNode;
}

export default function CapacitorProvider({ children }: CapacitorProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isRestoring } = useAuth();

  // ── Botón físico de Android ─────────────────────────────────────────────
  useEffect(() => {
    // No hacer nada en web — evita importar Capacitor innecesariamente
    if (!isNativePlatform()) return;

    let removeListener: (() => void) | null = null;

    async function setup() {
      const { App } = await import("@capacitor/app");

      const handle = await App.addListener("backButton", () => {
        if (isRootRoute(pathname)) {
          // Estamos en la pantalla raíz → cerrar la app limpiamente
          App.exitApp();
        } else {
          const parent = getParentRoute(pathname);
          if (parent) {
            router.push(parent);
          } else {
            // Fallback: sube un nivel en el historial del navegador
            router.back();
          }
        }
      });

      removeListener = () => handle.remove();
    }

    setup();

    // Limpiar listener al desmontar o al cambiar de ruta
    return () => {
      removeListener?.();
    };
    // pathname en deps: hacemos re-setup del listener en cada cambio de ruta
    // para que la lógica isRoot/getParentRoute sea siempre la correcta.
  }, [pathname, router]);

  // ── Pantalla de espera durante restauración de sesión ────────────────────
  if (isRestoring) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          zIndex: 9999,
        }}
        aria-label="Cargando sesión..."
      >
        {/* Spinner minimalista — mismo estilo que el resto de la app */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid #e2e8f0",
            borderTopColor: "#3b82f6",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
