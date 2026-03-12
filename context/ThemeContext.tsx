"use client";
/**
 * context/ThemeContext.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gestiona el tema visual de la app (claro / oscuro).
 *
 * - Lee la preferencia guardada en localStorage ("reset_theme").
 * - Si no hay preferencia guardada, respeta prefers-color-scheme del sistema.
 * - Escribe el atributo `data-theme` en <html> para activar las variables CSS
 *   de modo oscuro definidas en globals.css.
 * - Guarda la elección del usuario en localStorage para persistirla.
 */
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("reset_theme");
      // Solo se respeta la preferencia del usuario guardada explícitamente.
      // Nunca se lee prefers-color-scheme: las páginas públicas siempre
      // arrancan en claro, el dark solo se activa si el usuario lo toggleó.
      const initial: Theme = saved === "dark" ? "dark" : "light";
      applyTheme(initial);
    } catch {
      // localStorage no disponible — usar modo claro por defecto
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyTheme(t: Theme) {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("reset_theme", next);
    } catch {
      // Ignorar errores de almacenamiento
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
