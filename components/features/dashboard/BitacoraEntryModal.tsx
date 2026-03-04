// components/features/dashboard/BitacoraEntryModal.tsx
// Modal de detalle de una entrada de bitácora.
// Recibe la entrada y callbacks; no contiene lógica de negocio.

import { MOOD_COLORS, MOOD_ICONS, formatDate } from "@/lib/bitacora-helpers";
import { MOOD_OPTIONS } from "@/lib/constants";
import type { JournalEntry, MoodId } from "@/types";

interface Props {
  entry: JournalEntry;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function BitacoraEntryModal({ entry, onClose, onDelete }: Props) {
  const colors = MOOD_COLORS[entry.mood as MoodId];
  const moodLabel = MOOD_OPTIONS.find((m) => m.id === entry.mood)?.label ?? entry.mood;
  const { date, time } = formatDate(entry.createdAt);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-sm overflow-hidden"
        style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{ backgroundColor: colors.bg, borderColor: colors.border }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#fff", border: `1px solid ${colors.border}`, color: colors.text }}
            >
              <span style={{ display: "flex", transform: "scale(0.7)", transformOrigin: "center" }}>
                {MOOD_ICONS[entry.mood as MoodId]}
              </span>
              <span
                className="text-[8px] uppercase tracking-[0.5px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.text }}
              >
                {moodLabel}
              </span>
            </div>
            {entry.consumed && (
              <span
                className="text-[8px] uppercase tracking-[0.5px] px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#ef4444",
                }}
              >
                Consumo registrado
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="px-6 py-5">
          <p
            className="text-[9px] uppercase text-slate-400 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {date} · {time}
          </p>
          <h2
            className="text-[22px] italic text-slate-800 leading-snug mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {entry.title || "Sin título"}
          </h2>
          <div
            className="text-[14px] text-slate-600 leading-[1.9] whitespace-pre-wrap max-h-72 overflow-y-auto pr-1"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {entry.notes}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onDelete(entry.id)}
            className="flex items-center gap-1.5 text-slate-300 hover:text-red-400 transition-colors text-[10px] uppercase tracking-[1px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="h-9 px-5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-[10px] uppercase tracking-[1.5px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
