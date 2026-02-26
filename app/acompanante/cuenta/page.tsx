"use client";

import Toggle from "@/components/ui/Toggle";
import { useMiCuenta } from "@/hooks/useMiCuenta";

export default function MiCuentaPage() {
  const { profile, supportedUsers, isLoading, isSaving, error, saved, handleChange, handleSave } = useMiCuenta();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-slate-400 text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-10 py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Perfil de Acompañante —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mi Cuenta y Alertas
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Gestiona tu perfil y preferencias de notificación
        </p>

        {/* Profile form */}
        <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[9px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mi Perfil
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-6">
            {([
              { label: "Nombre Completo", field: "name", value: profile.name, type: "text" },
              { label: "Correo Electrónico", field: "email", value: profile.email, type: "email" },
              { label: "Teléfono (para SMS)", field: "phone", value: profile.phone, type: "tel" },
            ] as const).map(({ label, field, value, type }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label
                  className="text-[9px] tracking-[1.5px] uppercase text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="h-[44px] border border-slate-200 bg-white rounded-sm px-4 text-slate-700 outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-100 transition-all"
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
              className="h-[42px] px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
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

        {/* Usuarios que apoyo */}
        <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[9px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Usuarios que Apoyo
            </p>
          </div>

          {supportedUsers.length === 0 ? (
            <p className="text-[11px] italic text-slate-400" style={{ fontFamily: "'Playfair Display', serif" }}>No hay usuarios a su cargo aún.</p>
          ) : (
            supportedUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-[13px] italic text-teal-600"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {user.displayName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-[15px] italic text-slate-700"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {user.displayName}
                  </p>
                  <p
                    className="text-[9px] text-slate-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Adicción: {user.addictionType} — {user.sobrietyDays} días de recuperación
                  </p>
                </div>
                <span
                  className="text-[7px] tracking-[1px] uppercase text-teal-400 bg-teal-50 border border-teal-100 px-2 py-1 rounded-full"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {user.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Alert preferences */}
        <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p
              className="text-[9px] tracking-[2px] uppercase text-teal-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Preferencias de Alerta
            </p>
          </div>

          <p
            className="text-[11px] italic text-slate-400 mb-5 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Elige cómo quieres recibir notificaciones cuando Alex active el protocolo de emergencia.
          </p>

          {[
            { label: "Notificaciones por Email", sub: "Recibe un correo cuando se active la alarma.", field: "emailAlerts" as const, checked: profile.emailAlerts },
            { label: "Notificaciones por SMS", sub: `Mensaje al número ${profile.phone}.`, field: "smsAlerts" as const, checked: profile.smsAlerts },
          ].map(({ label, sub, checked, field }) => (
            <div key={label} className="flex items-center gap-4 py-4 border-t border-slate-50">
              <div className="flex-1">
                <p
                  className="text-[9px] tracking-[1.5px] uppercase text-slate-600 mb-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {label}
                </p>
                <p
                  className="text-[11px] text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {sub}
                </p>
              </div>
              <Toggle checked={checked} onChange={(v) => handleChange(field, v)} color="teal" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p
            className="text-[9px] tracking-[0.9px] uppercase text-slate-400 italic"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Oasis de Sobriedad — Gestión de Privacidad
          </p>
          <button
            className="text-[9px] tracking-[1px] uppercase text-red-400 hover:text-red-500 transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
