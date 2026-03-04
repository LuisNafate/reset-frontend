"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { triggerAlert } from "@/lib/api/emergency";

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
];

interface UserSidebarProps {
  /** Controla si el sidebar está abierto en móvil */
  isOpen?: boolean;
  /** Callback para cerrar el sidebar en móvil */
  onClose?: () => void;
}

export default function UserSidebar({ isOpen = false, onClose }: UserSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={
        `fixed left-0 top-0 h-full w-[288px] flex flex-col border-r border-slate-100 bg-white z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`
      }
      style={{ boxShadow: "1px 0 0 0 #f1f5f9" }}
    >
      {/* Logo — con botón de cierre visible solo en móvil */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-start justify-between">
        <div>
          <p
            className="text-[9px] tracking-[1.8px] uppercase text-slate-400 mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Registro No. 01
          </p>
          <h1
            className="text-[22px] font-normal text-slate-800 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reset de Alex
          </h1>
        </div>
        {/* Botón cerrar sidebar — solo visible en móvil */}
        <button
          type="button"
          onClick={onClose}
          className="md:hidden text-slate-400 hover:text-slate-600 transition-colors mt-1 p-1"
          aria-label="Cerrar menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
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
                  ? "text-sky-500 bg-slate-50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-400 rounded-r-full" />
              )}
              <span className={active ? "text-sky-500" : "text-slate-400 group-hover:text-slate-500"}>
                {item.icon}
              </span>
              <span
                className="text-[10px] tracking-[2px] uppercase font-normal"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Emergency Footer */}
      <div className="p-4 border-t border-red-50">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors group"
          type="button"
          onClick={async () => {
            try {
              await triggerAlert("Usuario presionó Raíz de Emergencia");
              alert("Alerta enviada a tus contactos de emergencia");
            } catch {
              alert("Error al enviar alerta. Llama al 911.");
            }
          }}
        >
          <span className="text-red-500 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="text-left">
            <p
              className="text-[10px] tracking-[1.5px] uppercase text-red-500 font-normal"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Raíz de Emergencia
            </p>
            <p
              className="text-[9px] text-red-400"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Auxilio Inmediato
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
}
