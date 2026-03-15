"use client";

import { useState } from "react";
import Toggle from "@/components/ui/Toggle";
import { useMiCuenta } from "@/hooks/useMiCuenta";
import { useSession } from "@/hooks/useSession";
import { useAuth } from "@/context/AuthContext";

export default function MiCuentaPage() {
  const { user } = useAuth();
  const {
    profile,
    supportedUsers,
    activeSponsorshipId,
    isLoading,
    isSaving,
    error,
    saved,
    sponsorshipActionError,
    handleChange,
    handleSave,
  } = useMiCuenta();
  const { logout } = useSession();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="rs-text-caption text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Perfil de Acompañante —
        </p>
        <h1
          className="text-[44px] font-normal rs-text-heading leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mi Cuenta y Alertas
        </h1>
        <p
          className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Gestiona tu perfil y preferencias de notificación
        </p>

        {/* Profile form */}
        <div className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[11px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mi Perfil
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-6">
            {([
              { label: "Nombre Completo", field: "name", value: profile.name, type: "text" },
              { label: "Correo Electrónico", field: "email", value: profile.email, type: "email" },
            ] as const).map(({ label, field, value, type }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label
                  className="text-[11px] tracking-[1.5px] uppercase rs-text-caption"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="h-11 border border-(--ui-border) bg-(--surface-input) rounded-sm px-4 rs-text-body outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-100 transition-all"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic" }}
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="text-[11px] text-red-400 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{error}</p>
          )}
          {saved && (
            <p className="text-[11px] text-teal-500 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Guardado correctamente ✓</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-10.5 px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Código de Padrino */}
        <div className="border border-teal-100 dark:border-teal-800/30 bg-teal-50 dark:bg-teal-900/20 rounded-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[11px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Tu Código de Padrino
            </p>
          </div>
          {user?.sponsorCode ? (
            <>
              <p
                className="text-[28px] tracking-[8px] font-mono text-teal-700 dark:text-teal-300 mb-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {user.sponsorCode}
              </p>
              <p
                className="text-[11px] tracking-[1px] uppercase text-teal-500/70 dark:text-teal-400/60"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Comparte este código con tu ahijado para que solicite el apadrinamiento
              </p>
            </>
          ) : (
            <div className="flex items-start gap-3 py-1">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="mt-0.5 shrink-0">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p
                  className="text-[11px] text-amber-600 dark:text-amber-400 mb-1 leading-relaxed"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  No se pudo cargar tu código.
                </p>
                <button
                  type="button"
                  onClick={logout}
                  className="text-[11px] tracking-[1px] uppercase text-amber-500 hover:text-amber-600 underline transition-colors"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Cierra sesión y vuelve a entrar para verlo →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Usuarios que apoyo */}
        <div className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[11px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mi Ahijado
            </p>
          </div>

          {sponsorshipActionError && (
            <p className="text-[11px] text-red-400 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {sponsorshipActionError}
            </p>
          )}

          {supportedUsers.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1" className="mb-1">
                <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-[13px] italic rs-text-caption" style={{ fontFamily: "'Playfair Display', serif" }}>
                Aún no tienes un ahijado activo.
              </p>
              <p className="text-[11px] tracking-[0.5px] rs-text-caption max-w-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Comparte tu código de padrino para que alguien solicite tu apoyo.
              </p>
            </div>
          ) : (
            supportedUsers.map((supportedUser) => (
              <div key={supportedUser.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0a1628] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center shrink-0">
                  <span
                    className="text-[13px] italic text-teal-600"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {supportedUser.displayName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-[15px] italic rs-text-body"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {supportedUser.displayName}
                  </p>
                  <p
                    className="text-[11px] rs-text-caption"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Adicción: {supportedUser.addictionType} — {supportedUser.sobrietyDays} días de recuperación
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[7px] tracking-[1px] uppercase text-teal-400 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800/40 px-2 py-1 rounded-full"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {supportedUser.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>


        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/30">
          <p
            className="text-[11px] tracking-[0.9px] uppercase rs-text-caption italic"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Oasis de Sobriedad — Gestión de Privacidad
          </p>
          <button
            onClick={logout}
            className="text-[11px] tracking-[1px] uppercase text-red-400 hover:text-red-500 transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
}
