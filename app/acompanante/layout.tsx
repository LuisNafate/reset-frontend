"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CompanionSidebar from "@/components/features/dashboard/CompanionSidebar";
import { useBackButton } from "@/hooks/useBackButton";
import { getRouteLabel } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/components/ui/NotificationBell";

export default function AcompananteLayout({
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
    : "P";

  return (
    <div className="flex h-dvh bg-(--surface-main) overflow-hidden">
      {/* Overlay semitransparente en móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <CompanionSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main: sin margen en móvil, con margen en md+ */}
      <main className="flex-1 md:ml-72 overflow-auto bg-(--surface-main) flex flex-col">
        {/* Barra superior móvil — oculta en desktop */}
        <div className="sticky top-0 z-10 flex items-end gap-3 px-4 min-h-14 pb-3 bg-(--surface-card) border-b border-teal-50 dark:border-teal-900/20 md:hidden shrink-0 safe-top-bar">
          {/* En sub-páginas: botón Atrás. En raíz: botón hamburguesa */}
          {!isRoot ? (
            <button
              type="button"
              onClick={handleBack}
              className="text-slate-500 hover:rs-text-body transition-colors p-1 -ml-1"
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
              className="text-slate-500 hover:rs-text-body transition-colors p-1"
              aria-label="Abrir menú de navegación"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Título de la página actual */}
          <span
            className="flex-1 text-[16px] font-normal rs-text-body"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pageLabel}
          </span>

          {/* Notificaciones + Avatar — lado derecho de la barra móvil */}
          <NotificationBell variant="teal" />
          <Link
            href="/acompanante/cuenta"
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 text-[11px] font-bold transition-opacity hover:opacity-80 overflow-hidden"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            aria-label="Mi perfil"
          >
            {user?.avatarUrl
              ? <img src={user.avatarUrl} alt={initials} className="w-full h-full object-cover" />
              : initials}
          </Link>

          {/* En sub-páginas: botón menú lateral igualmente accesible */}
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

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
