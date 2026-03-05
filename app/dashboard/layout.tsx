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
    <div className="flex h-[100dvh] bg-white overflow-hidden">
      {/* Overlay semitransparente en móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main: sin margen en móvil, con margen en md+ */}
      <main className="flex-1 md:ml-[288px] overflow-auto bg-[#f8fafc] flex flex-col">
        {/* Barra superior móvil — oculta en desktop */}
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 h-14 bg-white border-b border-slate-100 md:hidden flex-shrink-0 safe-top-bar">
          {/* En sub-páginas: botón Atrás. En raíz: botón hamburguesa */}
          {!isRoot ? (
            <button
              type="button"
              onClick={handleBack}
              className="text-slate-500 hover:text-slate-700 transition-colors p-1 -ml-1"
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
              className="text-slate-500 hover:text-slate-700 transition-colors p-1"
              aria-label="Abrir menú de navegación"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Título de la página actual */}
          <span
            className="flex-1 text-[16px] font-normal text-slate-700"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pageLabel}
          </span>

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
