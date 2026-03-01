"use client";

import Toggle from "@/components/ui/Toggle";
import { useConfiguracion } from "@/hooks/useConfiguracion";
import { ADDICTION_TYPES } from "@/lib/constants";

export default function ConfiguracionPage() {
  const {
    username,
    addictionType,
    emergencyNotifs,
    peers,
    isLoading,
    isSaving,
    error,
    saved,
    setUsername,
    setAddictionType,
    handleUpdateProfile,
    handleRemovePeer,
    handleToggleEmergencyNotifs,
  } = useConfiguracion();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-[10px] tracking-[2px] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Ajustes del Oasis —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Perfil y Apoyo
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Gestiona tu red de seguridad
        </p>

        {/* Mi Perfil Section */}
        <div className="border border-slate-200 rounded-sm bg-white mb-6 p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[9px] tracking-[2px] uppercase text-[#0ea5e9]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mi Perfil
            </p>
          </div>

          {/* Grid perfil: 1 columna en móvil, 2 en sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Nombre de Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[44px] border border-slate-200 bg-white rounded-sm px-4 text-slate-700 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic" }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Addiction type */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Tipo de Adicción
              </label>
              <div className="relative">
                <select
                  value={addictionType}
                  onChange={(e) => setAddictionType(e.target.value)}
                  className="w-full h-[44px] border border-slate-200 bg-white rounded-sm px-4 text-slate-700 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all appearance-none cursor-pointer"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic" }}
                >
                  {ADDICTION_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                    <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-red-400 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{error}</p>
          )}
          {saved && (
            <p className="text-[11px] text-teal-500 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Guardado correctamente ✓</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateProfile}
              disabled={isSaving}
              className="h-[42px] px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Actualizar Perfil
            </button>
          </div>
        </div>

        {/* Pares de Apoyo */}
        <div className="border border-slate-200 rounded-sm bg-white mb-6 p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p
                className="text-[9px] tracking-[2px] uppercase text-[#0ea5e9]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Pares de Apoyo
              </p>
            </div>
            <button
              className="flex items-center gap-1.5 text-[9px] tracking-[1px] uppercase text-sky-500 hover:text-sky-600 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Añadir Par
            </button>
          </div>

          <p
            className="text-[11px] italic text-slate-400 mb-5 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Estas son las personas que recibirán una alerta si decides activar tu &apos;Raíz de Emergencia&apos;.
          </p>

          {/* Cabecera de tabla — ocultar columna email en móvil */}
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-4 pb-2 mb-1">
            <p
              className="text-[9px] tracking-[1px] uppercase text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Nombre
            </p>
            {/* Columna email oculta en móvil */}
            <p
              className="hidden sm:block text-[9px] tracking-[1px] uppercase text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Correo Electrónico
            </p>
          </div>

          {peers.map((peer) => (
            <div
              key={peer.id}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-4 py-3 border-t border-slate-50 items-center"
            >
              <p
                className="text-[14px] italic text-slate-700"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {peer.name}
              </p>
              {/* Email oculto en móvil */}
              <p
                className="hidden sm:block text-[11px] text-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {peer.email}
              </p>
              <button
                onClick={() => handleRemovePeer(peer.id)}
                className="text-slate-300 hover:text-red-400 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}

          {/* Emergency notifications toggle */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="flex-shrink-0">
                <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex-1">
                <p
                  className="text-[9px] tracking-[1.5px] uppercase text-[#0ea5e9] mb-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Notificaciones de Emergencia
                </p>
                <p
                  className="text-[11px] text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Enviar alerta automática a mis pares al presionar el botón de pánico.
                </p>
              </div>
              <Toggle
                checked={emergencyNotifs}
                onChange={handleToggleEmergencyNotifs}
                color="teal"
              />
            </div>
          </div>
        </div>

        {/* Footer responsivo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-slate-100">
          <p
            className="text-[9px] tracking-[0.9px] uppercase text-slate-400 italic"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Oasis de Sobriedad — Gestión de Privacidad
          </p>
          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
