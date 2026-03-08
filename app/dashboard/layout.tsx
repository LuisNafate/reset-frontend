"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import UserSidebar from "@/components/features/dashboard/UserSidebar";
import { useBackButton } from "@/hooks/useBackButton";
import { getRouteLabel } from "@/lib/navigation";

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

  return (
    <div className="flex h-dvh bg-[var(--surface-main)] overflow-hidden">
      {/* Overlay semitransparente en móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main: sin margen en móvil, con margen en md+ */}
      <main className="flex-1 md:ml-72 overflow-auto bg-[var(--surface-main)] flex flex-col">
        {/* Barra superior móvil — oculta en desktop */}
        <div className="sticky top-0 z-10 flex items-end gap-3 px-4 min-h-14 pb-3 bg-[var(--surface-card)] border-b border-slate-100 dark:border-slate-800/60 md:hidden shrink-0 safe-top-bar">
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
          <span
            className="flex-1 text-[16px] font-normal rs-text-body"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pageLabel}
          </span>

          {/* Icono notificaciones — visible siempre en la barra móvil */}
          <button
            type="button"
            className="relative rs-text-caption hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
            aria-label="Notificaciones"
            tabIndex={-1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

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

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
