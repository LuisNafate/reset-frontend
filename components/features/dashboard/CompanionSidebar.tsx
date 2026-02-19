"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/acompanante",
    label: "Monitoreo",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/acompanante/historial",
    label: "Historial",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/acompanante/mensajes",
    label: "Mensajes",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/acompanante/cuenta",
    label: "Mi Cuenta",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function CompanionSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/acompanante") return pathname === "/acompanante";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[288px] flex flex-col border-r border-slate-100 bg-white z-20"
      style={{ boxShadow: "1px 0 0 0 #f1f5f9" }}
    >
      {/* Logo */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100">
        <p
          className="text-[9px] tracking-[1.8px] uppercase text-teal-500 mb-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Vista de Acompañante
        </p>
        <h1
          className="text-[22px] font-normal text-slate-800 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Oasis de Alex
        </h1>
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
                  ? "text-teal-600 bg-teal-50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-teal-400 rounded-r-full" />
              )}
              <span className={active ? "text-teal-600" : "text-slate-400 group-hover:text-slate-500"}>
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

      {/* Companion Identity Footer */}
      <div className="p-4 border-t border-teal-50">
        <div className="px-4 py-3 rounded-lg bg-teal-50">
          <p
            className="text-[9px] tracking-[1.5px] uppercase text-teal-500 mb-0.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tu Rol
          </p>
          <p
            className="text-[11px] text-teal-700 font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Par de Apoyo Principal
          </p>
        </div>
      </div>
    </aside>
  );
}
