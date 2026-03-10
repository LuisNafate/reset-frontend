"use client";
/**
 * components/ui/ThemeToggle.tsx
 * Toggle accesible para cambiar entre modo claro y oscuro.
 * Se usa en los sidebars de usuario y acompañante.
 */
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800/50 transition-colors group"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <span className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">
        {isDark ? (
          // Sol — cambiar a claro
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="4.5" strokeLinecap="round" />
            <path
              d="M12 2.25V4.5M12 19.5V21.75M4.161 4.161L5.75 5.75M18.25 18.25l1.589 1.589M2.25 12H4.5M19.5 12h2.25M4.161 19.839L5.75 18.25M18.25 5.75l1.589-1.589"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Luna — cambiar a oscuro
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className="text-[11px] tracking-[1.5px] uppercase font-normal"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {isDark ? "Modo Claro" : "Modo Oscuro"}
      </span>
    </button>
  );
}
