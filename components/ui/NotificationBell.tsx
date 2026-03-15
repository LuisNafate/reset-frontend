'use client';
// components/ui/NotificationBell.tsx
// Campana de notificaciones con panel desplegable.
// Soporta notificaciones de foro (REACTION, COMMENT, REPLY)
// y de apadrinamiento (SPONSORSHIP_REQUEST, SPONSORSHIP_ACCEPTED, SPONSORSHIP_REJECTED).

import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import type { NotificationItem, NotificationType } from '@/lib/api/notifications';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function notifLabel(type: NotificationType): string {
  switch (type) {
    case 'SPONSORSHIP_REQUEST':  return 'Solicitud de apadrinamiento';
    case 'SPONSORSHIP_ACCEPTED': return 'Apadrinamiento aceptado';
    case 'SPONSORSHIP_REJECTED': return 'Apadrinamiento rechazado';
    case 'REACTION':             return 'Reaccionaron a tu publicación';
    case 'COMMENT':              return 'Comentaron tu publicación';
    case 'REPLY':                return 'Te respondieron un comentario';
    default:                     return 'Nueva notificación';
  }
}

function notifColor(type: NotificationType): string {
  switch (type) {
    case 'SPONSORSHIP_REQUEST':  return 'text-sky-600';
    case 'SPONSORSHIP_ACCEPTED': return 'text-teal-600';
    case 'SPONSORSHIP_REJECTED': return 'text-red-500';
    default:                     return 'text-slate-500';
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffMin < 1440) return `Hace ${Math.floor(diffMin / 60)} h`;
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

// ─── Componente ───────────────────────────────────────────────────────────────

interface Props {
  /** Variante de color para adaptarse al sidebar de usuario o de padrino */
  variant?: 'blue' | 'teal';
}

export default function NotificationBell({ variant = 'blue' }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // ID de la notificación de apadrinamiento pendiente de confirmar
  const [pendingConfirmId, setPendingConfirmId] = useState<string | null>(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    handleMarkOne,
    handleMarkAll,
    handleAcceptSponsorship,
    handleRejectSponsorship,
  } = useNotifications();

  // Cierra el panel al hacer click fuera
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const accentColor = variant === 'teal' ? '#0d9488' : '#0ea5e9';
  const badgeColor  = variant === 'teal' ? 'bg-teal-500' : 'bg-sky-500';

  // ─── Render de una notificación individual ───────────────────────────────

  function renderNotif(notif: NotificationItem) {
    const isSponsorReq = notif.type === 'SPONSORSHIP_REQUEST';
    return (
      <div
        key={notif._id}
        className={`px-4 py-3 border-b rs-border-subtle last:border-0 ${
          notif.isRead ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start gap-2">
          {/* Punto de no leído */}
          {!notif.isRead && (
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${badgeColor}`} />
          )}
          {notif.isRead && <span className="mt-1.5 w-1.5 h-1.5 shrink-0" />}

          <div className="flex-1 min-w-0">
            <p
              className={`font-jetbrains text-[11px] font-medium tracking-[0.5px] uppercase ${notifColor(notif.type)}`}
            >
              {notifLabel(notif.type)}
            </p>
            <p
              className="font-jetbrains text-[11px] text-slate-400 dark:text-slate-500 mt-0.5"
            >
              {formatDate(notif.createdAt)}
            </p>

            {/* Acciones para solicitud de apadrinamiento */}
            {isSponsorReq && !notif.isRead && (
              pendingConfirmId === notif._id ? (
                // Paso de confirmación
                <div className="mt-2 p-3 rounded-lg border rs-border bg-(--surface-card-inner)">
                  <p
                    className="font-playfair italic text-[11px] tracking-[0.5px] rs-text-body mb-1"
                  >
                    {notif.actorName
                      ? `¿Aceptar el apadrinamiento de ${notif.actorName}?`
                      : '¿Confirmar el apadrinamiento?'}
                  </p>
                  <p
                    className="font-jetbrains text-[10px] rs-text-caption mb-3 leading-relaxed"
                  >
                    Podrás ver su progreso y recibir alertas de emergencia.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { handleAcceptSponsorship(notif._id); setPendingConfirmId(null); }}
                      className="font-jetbrains flex-1 py-1.5 text-[10px] tracking-[1px] uppercase bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setPendingConfirmId(null)}
                      className="font-jetbrains flex-1 py-1.5 text-[10px] tracking-[1px] uppercase bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Botones iniciales Aceptar / Rechazar
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setPendingConfirmId(notif._id)}
                    className="font-jetbrains px-3 py-1 text-[10px] tracking-[1px] uppercase bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleRejectSponsorship(notif._id)}
                    className="font-jetbrains px-3 py-1 text-[10px] tracking-[1px] uppercase bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md transition-colors"
                  >
                    Rechazar
                  </button>
                </div>
              )
            )}
          </div>

          {/* Marcar una como leída */}
          {!notif.isRead && !isSponsorReq && (
            <button
              onClick={() => handleMarkOne(notif._id)}
              className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
              title="Marcar como leída"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── JSX ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative">
      {/* Botón campana */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="relative p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        aria-label="Notificaciones"
        title="Notificaciones"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={open ? accentColor : 'currentColor'} strokeWidth="1.5">
          <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {unreadCount > 0 && (
          <span
            className={`absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full ${badgeColor} text-white flex items-center justify-center`}
            style={{ fontSize: 9 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel desplegable */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 md:left-full md:right-auto md:ml-2 top-0 mt-0 w-72 max-w-[min(288px,calc(100vw-1rem))] rs-surface-card border rs-border rounded-xl shadow-xl z-50 overflow-hidden"
        >
          {/* Header del panel */}
          <div className="flex items-center justify-between px-4 py-3 border-b rs-border-subtle">
            <p
              className="font-jetbrains text-[11px] tracking-[2px] uppercase"
              style={{ color: accentColor }}
            >
              Notificaciones
            </p>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                className="font-jetbrains text-[10px] tracking-[0.5px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                Marcar todas
              </button>
            )}
          </div>

          {/* Lista */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <p
                className="font-jetbrains text-center text-[11px] text-slate-400 py-6"
              >
                Cargando...
              </p>
            ) : notifications.length === 0 ? (
              <p
                className="font-playfair text-center text-[11px] italic text-slate-400 py-6"
              >
                No hay notificaciones
              </p>
            ) : (
              notifications.map(renderNotif)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
