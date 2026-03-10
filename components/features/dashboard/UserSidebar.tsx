"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { triggerAlert } from "@/lib/api/emergency";
import { useSession } from "@/hooks/useSession";
import ThemeToggle from "@/components/ui/ThemeToggle";
import NotificationBell from "@/components/ui/NotificationBell";

const navItems = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/bitacora",
    label: "Bitácora",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/foro",
    label: "Foro",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/configuracion",
    label: "Configuración",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/tecnicas",
    label: "Técnicas",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

interface UserSidebarProps {
  /** Controla si el sidebar está abierto en móvil */
  isOpen?: boolean;
  /** Callback para cerrar el sidebar en móvil */
  onClose?: () => void;
}

export default function UserSidebar({ isOpen = false, onClose }: UserSidebarProps) {
  const pathname = usePathname();
  const { user, logout, showLogoutConfirm, setShowLogoutConfirm, abbreviateName } = useSession();

  // Feedback inline para emergencia — reemplaza alert() nativo
  const [emergencyState, setEmergencyState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  async function handleEmergency() {
    setShowEmergencyConfirm(false);
    setEmergencyState("sending");
    try {
      await triggerAlert({ resolutionNotes: "Usuario presionó Raíz de Emergencia" });
      setEmergencyState("sent");
      setTimeout(() => setEmergencyState("idle"), 5000);
    } catch {
      setEmergencyState("error");
      setTimeout(() => setEmergencyState("idle"), 5000);
    }
  }

  const displayName = abbreviateName(user?.name ?? "");

  return (
    <aside
      className={
        `fixed left-0 top-0 h-full w-[288px] flex flex-col border-r border-slate-100 dark:border-slate-800/60 bg-white dark:bg-[#0f1d2d] z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`
      }
      style={{ boxShadow: "1px 0 0 0 #f1f5f9" }}
    >
      {/* Logo — nombre real del usuario con tooltip para nombre completo */}
      <div className="px-8 sidebar-safe-top pb-6 border-b border-slate-100 dark:border-slate-800/60 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] tracking-[1.8px] uppercase mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--ui-text-muted)' }}
          >
            Registro No. 01
          </p>
          <h1
            className="text-[22px] font-normal text-slate-800 dark:text-slate-100 leading-tight truncate"
            style={{ fontFamily: "'Playfair Display', serif" }}
            title={user?.name ?? ""}
          >
            {user?.name ? `ReSet de ${displayName}` : "Mi ReSet"}
          </h1>
        </div>
        {/* Acciones del header: notificaciones + cerrar (móvil) */}
        <div className="flex items-center gap-0.5 mt-1 shrink-0">
          {/* Bell solo visible en desktop — en móvil aparece en la barra superior del layout */}
          <span className="hidden md:flex">
            <NotificationBell variant="blue" />
          </span>
          {/* Botón cerrar sidebar — solo visible en móvil */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1"
            aria-label="Cerrar menú"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative group ${
                active
                  ? "text-sky-500 bg-slate-50 dark:bg-sky-900/20"
                  : "text-slate-600 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-400 rounded-r-full" />
              )}
              <span className={active ? "text-sky-500" : "text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white"}>
                {item.icon}
              </span>
              <span
                className="text-[12px] tracking-[1.5px] uppercase font-normal"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Theme Toggle ──────────────────────────────────────────────── */}
      <div className="px-4 pb-1">
        <ThemeToggle />
      </div>

      {/* ── Cerrar Sesión ─────────────────────────────────────────────── */}
      <div className="px-4 pb-2">
        {!showLogoutConfirm ? (
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <span className="text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span
              className="text-[11px] tracking-[1.5px] uppercase font-normal"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Cerrar Sesión
            </span>
          </button>
        ) : (
          // Confirmación inline — evita cierres accidentales
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
            <p
              className="text-[11px] tracking-[1px] uppercase text-slate-600 dark:text-slate-300 mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ¿Cerrar sesión?
            </p>
            <p
              className="text-[11px] italic text-slate-400 mb-3 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tendrás que volver a iniciar sesión con tu correo y contraseña.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={logout}
                className="flex-1 h-8.5 bg-slate-700 hover:bg-slate-800 text-white rounded-md transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}
              >
                Sí, salir
              </button>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 h-8.5 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Emergency Footer ─────────────────────────────────────────────── */}
      <div className="p-4 border-t border-red-50 dark:border-red-900/20">
        {emergencyState === "sent" && (
          <div className="mb-2 px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40">
            <p className="text-[11px] tracking-[1px] uppercase text-teal-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ✓ Alerta enviada a tus contactos
            </p>
          </div>
        )}
        {emergencyState === "error" && (
          <div className="mb-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40">
            <p className="text-[11px] tracking-[1px] uppercase text-red-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Error al enviar. Llama al 911.
            </p>
          </div>
        )}

        {!showEmergencyConfirm ? (
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group disabled:opacity-60"
            type="button"
            disabled={emergencyState === "sending"}
            onClick={() => setShowEmergencyConfirm(true)}
          >
            <span className="text-red-500 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="text-left">
              <p
                className="text-[12px] tracking-[1.2px] uppercase text-red-500 font-normal"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {emergencyState === "sending" ? "Enviando alerta…" : "Raíz de Emergencia"}
              </p>
              <p className="text-[11px] text-red-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Auxilio Inmediato
              </p>
            </div>
          </button>
        ) : (
          // Confirmación de emergencia — acción crítica requiere doble confirmación
          <div className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 p-4">
            <p
              className="text-[11px] tracking-[1px] uppercase text-red-600 mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ¿Enviar alerta ahora?
            </p>
            <p
              className="text-[11px] italic text-red-400 mb-3 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Se notificará a todos tus contactos de emergencia registrados.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEmergency}
                className="flex-1 h-8.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}
              >
                Sí, enviar
              </button>
              <button
                type="button"
                onClick={() => setShowEmergencyConfirm(false)}
                className="flex-1 h-8.5 border border-red-200 text-red-400 hover:bg-red-100 rounded-md transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
