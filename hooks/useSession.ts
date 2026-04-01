"use client";
// hooks/useSession.ts
// Centraliza la lógica de sesión: logout con confirmación, nombre abreviado.
// Usado por UserSidebar y CompanionSidebar para evitar duplicación.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useSession() {
  const { user, clearAuth } = useAuth();
  const router = useRouter();

  // Estado de confirmación de logout — evita salidas accidentales
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  /**
   * Cierra la sesión de forma segura:
   * 1. Limpia el token JWT de memoria.
   * 2. Limpia el estado de usuario del contexto.
   * 3. Redirige al login con navegación completa (NO router.push).
   *
   * IMPORTANTE: Se usa window.location.href en lugar de router.push porque
   * router.push hace una navegación client-side (RSC flight request) que
   * todavía envía la cookie vieja en el request HTTP. El middleware de Next.js
   * la lee y redirige de vuelta al dashboard, causando un loop infinito.
   * Con window.location.href se fuerza una recarga completa del navegador
   * donde la cookie ya fue eliminada por setToken(null).
   */
  function logout() {
    clearAuth();
    window.location.href = "/login";
  }

  /**
   * Abrevia un nombre largo para mostrarlo en espacios reducidos.
   * Ej: "Francisco Javier García López" → "Francisco J."
   * Con tooltip o title del elemento padre se puede ver el nombre completo.
   */
  function abbreviateName(name: string, maxChars = 20): string {
    if (!name) return "Usuario";
    if (name.length <= maxChars) return name;
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return name.slice(0, maxChars - 1) + "…";
    const [first, ...rest] = parts;
    const initials = rest.map((p) => p[0]?.toUpperCase() + ".").join(" ");
    const candidate = `${first} ${initials}`;
    return candidate.length <= maxChars ? candidate : first.slice(0, maxChars - 1) + "…";
  }

  /**
   * Formatea la fecha actual en español.
   * Ej: "Miércoles, 4 de marzo de 2026"
   */
  function todayLabel(): string {
    return new Date().toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return {
    user,
    logout,
    showLogoutConfirm,
    setShowLogoutConfirm,
    abbreviateName,
    todayLabel,
  };
}
