"use client";

import { useBitacora } from "@/hooks/useBitacora";
import { MOOD_OPTIONS } from "@/lib/constants";

// SVG icons for mood options — visual only, stay in the component
const MOOD_ICONS: Record<string, React.ReactNode> = {
  alegre: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  calmado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 15h6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  ansioso: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 15.5s1-1 3.5-1 3.5 1 3.5 1" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1" fill="none" stroke="currentColor"/>
      <circle cx="15" cy="9.5" r="1" fill="none" stroke="currentColor"/>
    </svg>
  ),
  triste: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15" cy="9.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  directado: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12h6M12 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function BitacoraPage() {
  const { selectedMood, notes, isLoading, error, saved, setSelectedMood, setNotes, handleSave } = useBitacora();

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] tracking-[4.4px] uppercase italic text-slate-400 mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Bitácora Diaria —
          </p>
          <h1
            className="text-[48px] font-normal text-slate-800 leading-none mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¿Cómo te sientes hoy?
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-slate-200" />
            <p
              className="text-[10px] tracking-[1px] uppercase text-slate-400 opacity-60"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Día 42 de Renovación
            </p>
            <span className="w-8 h-px bg-slate-200" />
          </div>
        </div>

        {/* Main card */}
        <div
          className="bg-white border border-slate-200 rounded-sm overflow-hidden mb-8"
          style={{ boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.05)" }}
        >
          <div className="p-8">
            {/* State section header */}
            <div className="flex items-center gap-3 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.266.64 1.266 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.56 0-2.385-1.716-4.052-4.165-4.052-2.836 0-4.499 2.126-4.499 4.325 0 .856.33 1.775.741 2.275a.3.3 0 01.069.285l-.278 1.133c-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <p
                className="text-[10px] tracking-[1px] uppercase text-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Estado Emocional
              </p>
            </div>

            {/* Mood selector — grid 3 columnas en móvil, 5 en sm+ */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
              {MOOD_OPTIONS.map((mood) => {
                const active = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex flex-col items-center gap-2 py-3 sm:py-4 px-2 sm:px-4 rounded-xl border transition-all ${
                      active
                        ? "bg-[#f0f4f8] border-sky-400 shadow-[0_0_0_1px_#0ea5e9]"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={active ? "text-sky-500" : "text-slate-400"}>
                      {MOOD_ICONS[mood.id]}
                    </span>
                    <span
                      className="text-[9px] tracking-[-0.45px] uppercase"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: active ? "#334155" : "#94a3b8",
                      }}
                    >
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-1 h-px bg-slate-100" />
              <p
                className="text-[9px] tracking-[1.8px] uppercase text-slate-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Notas del Día
              </p>
              <span className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Text area */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe aquí lo que tu alma necesite expresar..."
              rows={6}
              className="w-full bg-transparent border border-slate-100 rounded-lg p-5 text-slate-600 placeholder-slate-300 outline-none focus:border-slate-200 focus:ring-1 focus:ring-slate-100 resize-none transition-all"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 14,
                lineHeight: "1.8",
                fontStyle: "italic",
              }}
            />

            {/* Save button */}
            {error && (
              <p className="mt-2 text-[11px] text-red-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{error}</p>
            )}
            {saved && (
              <p className="mt-2 text-[11px] text-teal-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Guardado correctamente ✓</p>
            )}
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="mt-5 flex items-center gap-3 justify-center w-full h-[52px] bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Guardar en mi Bitácora
            </button>
          </div>
        </div>

        {/* Bottom suggestion cards — 1 columna en móvil, 2 en sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/50 border border-slate-100 p-6">
            <p
              className="text-[9px] tracking-[0.9px] uppercase text-sky-500 mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Sugerencia de Cuidado
            </p>
            <p
              className="text-[14px] italic leading-[1.6] text-slate-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Si hoy la calma es tu refugio, dedica cinco minutos a observar las nubes y agradecer por la estabilidad."
            </p>
          </div>
          <div className="bg-white/50 border border-slate-100 p-6">
            <p
              className="text-[9px] tracking-[0.9px] uppercase text-sky-500 mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Reflexión Anterior
            </p>
            <p
              className="text-[14px] italic leading-[1.6] text-slate-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Ayer sentiste gratitud por el apoyo del foro. Mantén ese vínculo presente hoy."
            </p>
          </div>
        </div>

        {/* Footer responsivo */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <p
            className="text-[9px] tracking-[0.9px] uppercase text-slate-400 italic"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Oasis de Sobriedad — Bitácora Personal
          </p>
          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
