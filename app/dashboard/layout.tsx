"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { usePathname } from "next/navigation";
import UserSidebar from "@/components/features/dashboard/UserSidebar";
import { useBackButton } from "@/hooks/useBackButton";
import { getRouteLabel } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/components/ui/NotificationBell";
import { getAvatarUrl } from "@/lib/avatar";

const playfairBold = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  variable: "--font-playfair", // Using the same variable name to complement the root
  display: "swap",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado del sidebar para móvil
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { handleBack, isRoot } = useBackButton();
  const pageLabel = getRouteLabel(pathname);
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")
    : "U";

  return (
    <div className={`flex h-fill bg-(--surface-main) ${playfairBold.variable}`}>
      {/* Overlay semitransparente en móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main: columna flex de altura completa — EL scroll ocurre solo en el div interior */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-0 bg-(--surface-main)">
        {/* Barra superior móvil — oculta en desktop. NO es sticky: el flex-col la mantiene arriba */}
        <div className="shrink-0 z-30 flex items-end gap-3 px-4 min-h-14 pb-3 bg-(--surface-card) border-b border-slate-100 dark:border-slate-800/60 md:hidden safe-top-bar">
          {/* En sub-páginas: botón Atrás. En raíz: botón hamburguesa */}
          {!isRoot ? (
            <button
              type="button"
              onClick={handleBack}
              className="rs-text-muted hover:rs-text-heading dark:hover:text-slate-200 transition-colors p-1 -ml-1"
              aria-label="Volver a la pantalla anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rs-text-muted hover:rs-text-heading dark:hover:text-slate-200 transition-colors p-1"
              aria-label="Abrir menú de navegación"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Título de la página actual */}
          <span className="flex-1 font-playfair text-[16px] font-normal rs-text-body">
            {pageLabel}
          </span>

          {/* Notificaciones + Avatar — lado derecho de la barra móvil */}
          <NotificationBell variant="blue" />
          <Link
            href="/dashboard/configuracion"
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 text-[11px] font-bold transition-opacity hover:opacity-80 overflow-hidden"
            aria-label="Mi perfil"
          >
            {user?.id
              ? <img src={getAvatarUrl(user.avatarUrl, user.id)} alt={initials} className="w-full h-full object-cover" />
              : initials}
          </Link>

          {/* En sub-páginas: botón para abrir el menú lateral igualmente */}
          {!isRoot && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Abrir menú de navegación"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Único contenedor de scroll — nativo optimizado para Android WebView */}
        <div className="flex-1 min-h-0 overflow-y-auto native-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}
