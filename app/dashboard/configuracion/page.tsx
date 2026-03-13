"use client";

import { useState } from "react";
import Link from "next/link";
import { useConfiguracion } from "@/hooks/useConfiguracion";
import { useAuth } from "@/context/AuthContext";

export default function ConfiguracionPage() {
  const { user } = useAuth();
  const {
    username,
    addictionType,
    peers,
    isLoading,
    isSaving,
    isDeleting,
    error,
    peerError,
    saved,
    sponsorCode,
    setSponsorCode,
    sponsorshipState,
    isSponsorshipLoading,
    sponsorshipError,
    handleRequestSponsorship,
    handleTerminateSponsorship,
    handleDeleteAccount,
    setUsername,
    handleUpdateProfile,
    handleRemovePeer,
    handleAddPeer,
    handleToggleEmergencyNotifs,
  } = useConfiguracion();

  // Estado local para confirmación de borrado de cuenta
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Estado local para confirmación de borrado de padrino
  const [showDeleteSponsorConfirm, setShowDeleteSponsorConfirm] = useState(false);

  // Estado local del formulario de "Añadir Par"
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [peerName, setPeerName] = useState("");
  const [peerPhone, setPeerPhone] = useState("");
  const [peerRelationship, setPeerRelationship] = useState("");
  const [peerEmail, setPeerEmail] = useState("");
  const [isAddingPeer, setIsAddingPeer] = useState(false);
  // Almacena el código enviado para mostrarlo grayed-out en estados PENDING/ACTIVE
  const [submittedSponsorCode, setSubmittedSponsorCode] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="font-jetbrains text-[11px] tracking-[2px] uppercase text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="font-jetbrains text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2"
        >
          — Ajustes de ReSet —
        </p>
        <h1
          className="font-playfair text-[44px] font-normal rs-text-heading leading-none mb-1"
        >
          Perfil y Apoyo
        </h1>
        <p
          className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-10"
        >
          Gestiona tu red de seguridad
        </p>

        {/* Mi Perfil Section */}
        <div className="border border-(--ui-border) rounded-sm bg-(--surface-card) mb-6 p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="font-jetbrains text-[11px] tracking-[2px] uppercase text-[#0ea5e9]"
            >
              Mi Perfil
            </p>
          </div>

          {/* Grid perfil: 1 columna en móvil, 2 en sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption"
              >
                Nombre de Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="font-jetbrains w-full h-11 border border-(--ui-border) bg-(--surface-input) rounded-sm px-4 text-[15px] rs-text-body outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Addiction type — solo lectura */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption"
              >
                Tipo de Adicción
              </label>
              <div
                className="font-jetbrains w-full h-11 border border-(--ui-border) bg-(--surface-card-inner) rounded-sm px-4 text-[14px] rs-text-body flex items-center opacity-70 select-none cursor-default"
              >
                {addictionType || "No especificado"}
              </div>
              <p className="font-jetbrains text-[11px] tracking-[0.5px] rs-text-caption">
                Para cambiar tu tipo de adicción, contacta a soporte.
              </p>
            </div>
          </div>

          {error && (
            <p className="font-jetbrains text-[12px] text-red-400 mb-3">{error}</p>
          )}
          {saved && (
            <p className="font-jetbrains text-[12px] text-teal-500 mb-3">Guardado correctamente ✓</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateProfile}
              disabled={isSaving}
              className="font-jetbrains h-10.5 px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors text-[11px] tracking-[2px] uppercase"
            >
              Actualizar Perfil
            </button>
          </div>
        </div>

        {/* ── Padrino de Apoyo ── */}
        <div className="border border-(--ui-border) rounded-sm bg-(--surface-card) mb-6 p-5 sm:p-8">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p
                className="font-jetbrains text-[11px] tracking-[2px] uppercase text-[#0ea5e9]"
              >
                Padrino de Apoyo
              </p>
            </div>
            <Link
              href="/dashboard/tutorial-padrino"
              className="font-jetbrains text-[11px] tracking-[1px] rs-text-caption hover:text-[#0ea5e9] transition-colors"
            >
              ¿Cómo funciona? →
            </Link>
          </div>

          {/* Estado NONE: formulario para ingresar código */}
          {sponsorshipState.status === 'NONE' && (
            <>
              <p
                className="font-jetbrains text-[13px] rs-text-caption mb-5 leading-relaxed"
              >
                Tu padrino te compartirá un código de 8 caracteres. Ingrésalo aquí para enviarle una solicitud de apadrinamiento.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption"
                  >
                    Código del Padrino
                  </label>
                  <input
                    type="text"
                    value={sponsorCode}
                    onChange={(e) => setSponsorCode(e.target.value.toUpperCase())}
                    maxLength={10}
                    placeholder="XXXXXXXX"
                    className="font-jetbrains h-11 w-full border border-(--ui-border) bg-(--surface-input) rounded-sm px-4 rs-text-body outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all tracking-[4px] text-center text-[15px]"
                    onKeyDown={(e) => e.key === 'Enter' && handleRequestSponsorship()}
                  />
                </div>
                <button
                  onClick={() => { setSubmittedSponsorCode(sponsorCode); handleRequestSponsorship(); }}
                  disabled={isSponsorshipLoading || !sponsorCode.trim()}
                  className="font-jetbrains h-11 w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-sm transition-colors text-[11px] tracking-[1.5px] uppercase"
                >
                  {isSponsorshipLoading ? "Enviando…" : "Solicitar"}
                </button>
              </div>
              {sponsorshipError && (
                <p className="font-jetbrains mt-3 text-[12px] text-red-400">{sponsorshipError}</p>
              )}
            </>
          )}

          {/* Estado PENDING: esperando que el padrino acepte */}
          {sponsorshipState.status === 'PENDING' && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-end">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label
                    className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption"
                  >
                    Código del Padrino
                  </label>
                  <input
                    type="text"
                    value={submittedSponsorCode}
                    disabled
                    placeholder="XXXXXXXX"
                    className="font-jetbrains h-11 border border-(--ui-border) bg-(--surface-card-inner) rounded-sm px-4 rs-text-caption outline-none tracking-[4px] text-center opacity-60 cursor-not-allowed text-[15px]"
                  />
                </div>
                <div className="font-jetbrains h-11 px-5 border border-(--ui-border) bg-(--surface-card-inner) text-[11px] tracking-[1.5px] uppercase rs-text-caption rounded-sm flex items-center opacity-60 cursor-not-allowed shrink-0"
                >
                  Enviado
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/40 rounded-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="shrink-0 mt-0.5">
                  <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-sky-600 dark:text-sky-400 mb-1">
                    Solicitud enviada
                  </p>
                  <p className="font-jetbrains text-[12px] rs-text-caption">
                    Esperando a que tu padrino acepte la solicitud. Te notificaremos cuando lo haga.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Estado ACTIVE: conexión activa */}
          {sponsorshipState.status === 'ACTIVE' && (
            <div>
              <div className="flex items-start gap-4 p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40 rounded-lg mb-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold overflow-hidden">
                  {user?.sponsor?.avatarUrl ? (
                    <img src={user.sponsor.avatarUrl} alt={user.sponsor.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.sponsor?.name?.charAt(0).toUpperCase() ?? 'P'
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-teal-600 dark:text-teal-400 mb-1">Apadrinamiento activo</p>
                  <p className="font-playfair text-[15px] rs-text-heading font-bold">{user?.sponsor?.name ?? "Tu Padrino"}</p>
                  <p className="font-jetbrains text-[11px] rs-text-caption lowercase">{user?.sponsor?.email}</p>
                </div>
              </div>
              {sponsorshipError && (
                <p className="font-jetbrains mb-2 text-[12px] text-red-400">{sponsorshipError}</p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteSponsorConfirm(true)}
                  disabled={isSponsorshipLoading}
                  className="font-jetbrains flex items-center gap-2 h-10 px-5 border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-sm transition-colors text-[11px] tracking-[1.5px] uppercase disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Borrar padrino
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pares de Apoyo */}
          <div className="border border-(--ui-border) rounded-sm bg-(--surface-card) mb-6 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p
                className="font-jetbrains text-[11px] tracking-[2px] uppercase text-[#0ea5e9]"
              >
                Pares de Apoyo
              </p>
            </div>
            <button
              onClick={() => setShowAddPeer((v) => !v)}
              className="font-jetbrains flex items-center gap-1.5 text-[11px] tracking-[1px] uppercase text-sky-500 hover:text-sky-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Añadir Par
            </button>
          </div>

          {/* Formulario de nuevo par de apoyo */}
          {showAddPeer && (
            <div className="mb-5 p-5 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/40 rounded-sm">
              <p
                className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-sky-500 mb-4"
              >
                Nuevo par de apoyo
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption">Nombre *</label>
                  <input
                    type="text"
                    value={peerName}
                    onChange={(e) => setPeerName(e.target.value)}
                    placeholder="Ej: María González"
                    className="font-jetbrains h-10 border border-(--ui-border) bg-(--surface-input) rounded-sm px-3 rs-text-body text-[13px] outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    value={peerPhone}
                    onChange={(e) => setPeerPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="font-jetbrains h-10 border border-(--ui-border) bg-(--surface-input) rounded-sm px-3 rs-text-body text-[13px] outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption">Relación *</label>
                  <select
                    value={peerRelationship}
                    onChange={(e) => setPeerRelationship(e.target.value)}
                    className="font-jetbrains h-10 border border-(--ui-border) bg-(--surface-input) rounded-sm px-3 rs-text-body text-[13px] outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  >
                    <option value="">Selecciona una relación…</option>
                    <option value="familia">Familiar</option>
                    <option value="amigo">Amigo/a</option>
                    <option value="padrino">Padrino / Madrina</option>
                    <option value="terapeuta">Terapeuta</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption">Correo *</label>
                  <input
                    type="email"
                    value={peerEmail}
                    onChange={(e) => setPeerEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="font-jetbrains h-10 border border-(--ui-border) bg-(--surface-input) rounded-sm px-3 rs-text-body text-[13px] outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  />
                </div>
              </div>
              {peerError && (
                <p className="font-jetbrains mb-3 text-[11px] text-red-400" role="alert">
                  {peerError}
                </p>
              )}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setShowAddPeer(false); setPeerName(""); setPeerPhone(""); setPeerRelationship(""); setPeerEmail(""); }}
                  className="font-jetbrains h-9 px-4 border border-(--ui-border) rs-text-caption hover:text-slate-600 rounded-sm text-[11px] tracking-[1px] uppercase transition-colors"
                >
                  Cancelar
                </button>
                <button
                  disabled={isAddingPeer || !peerName.trim() || !peerEmail.trim() || !peerRelationship.trim()}
                  onClick={async () => {
                    setIsAddingPeer(true);
                    const ok = await handleAddPeer({ contactName: peerName.trim(), phone: peerPhone.trim(), relationship: peerRelationship.trim(), email: peerEmail.trim() || undefined });
                    setIsAddingPeer(false);
                    if (ok) {
                      setShowAddPeer(false);
                      setPeerName(""); setPeerPhone(""); setPeerRelationship(""); setPeerEmail("");
                    }
                  }}
                  className="font-jetbrains h-9 px-5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-sm text-[11px] tracking-[1px] uppercase transition-colors"
                >
                  {isAddingPeer ? "Guardando…" : "Guardar"}
                </button>
              </div>
            </div>
          )}

          <p
            className="font-jetbrains text-[13px] rs-text-caption mb-5 leading-relaxed"
          >
            Estas son las personas que recibirán una alerta si decides activar tu &apos;Raíz de Emergencia&apos;.
          </p>

          {/* Cabecera de tabla — ocultar columna email en móvil */}
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-4 pb-2 mb-1">
            <p
              className="font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption"
            >
              Nombre
            </p>
            {/* Columna email oculta en móvil */}
            <p
              className="hidden sm:block font-jetbrains text-[11px] tracking-[1px] uppercase rs-text-caption"
            >
              Correo Electrónico
            </p>
          </div>

          {peers.map((peer) => (
            <div
              key={peer.id}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-4 py-3 border-t border-slate-50 dark:border-slate-700/20 items-center"
            >
              <p
                className="font-jetbrains text-[14px] rs-text-body"
              >
                {peer.name}
              </p>
              {/* Email oculto en móvil */}
              <p
                className="hidden sm:block font-jetbrains text-[11px] rs-text-caption"
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


        </div>

        {/* Zona de Peligro / Borrar Cuenta */}
        <div className="mt-12 pt-8 border-t border-red-100 dark:border-red-900/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-red-500 mb-1">
                Zona de Peligro
              </h3>
              <p className="font-jetbrains text-[13px] rs-text-caption">
                Una vez eliminada, no podrás recuperar tu información ni acceder de nuevo.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="font-jetbrains h-10 px-6 border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors text-[11px] tracking-[1.5px] uppercase"
            >
              Borrar mi cuenta
            </button>
          </div>
        </div>

        {/* Modal de Confirmación de Borrado de Padrino */}
        {showDeleteSponsorConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-(--surface-card) border border-(--ui-border) rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl text-center rs-text-heading mb-3">¿Borrar padrino?</h3>
              <p className="font-jetbrains text-[12px] text-center rs-text-muted mb-8 leading-relaxed">
                Se terminará la conexión con tu padrino de inmediato. Podrás vincular uno nuevo cuando quieras.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowDeleteSponsorConfirm(false);
                    handleTerminateSponsorship();
                  }}
                  disabled={isSponsorshipLoading}
                  className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-jetbrains text-[11px] tracking-[2px] uppercase transition-all shadow-lg shadow-red-500/20 disabled:opacity-60"
                >
                  {isSponsorshipLoading ? "Procesando…" : "Sí, borrar padrino"}
                </button>
                <button
                  onClick={() => setShowDeleteSponsorConfirm(false)}
                  disabled={isSponsorshipLoading}
                  className="w-full h-12 border border-(--ui-border) rs-text-body rs-hover-card rounded-xl font-jetbrains text-[11px] tracking-[2px] uppercase transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación de Borrado de Cuenta */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-(--surface-card) border border-(--ui-border) rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl text-center rs-text-heading mb-3">¿Estás seguro?</h3>
              <p className="font-jetbrains text-[12px] text-center rs-text-muted mb-8 leading-relaxed">
                Esta acción es irreversible y eliminará todo tu progreso. No enviamos notificaciones de borrado a tus contactos.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-jetbrains text-[11px] tracking-[2px] uppercase transition-all shadow-lg shadow-red-500/20"
                >
                  {isDeleting ? "Eliminando..." : "Sí, borrar cuenta"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="w-full h-12 border border-(--ui-border) rs-text-body rs-hover-card rounded-xl font-jetbrains text-[11px] tracking-[2px] uppercase transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer responsivo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-slate-100 dark:border-slate-700/30 mt-12">
          <p
            className="font-jetbrains text-[11px] tracking-[0.9px] uppercase rs-text-caption"
          >
            Oasis de Sobriedad — Gestión de Privacidad
          </p>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>
    </div>
  );
}
