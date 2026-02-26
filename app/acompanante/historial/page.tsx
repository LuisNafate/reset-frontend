"use client";

import React from "react";

const MOOD_SVG: Record<string, React.ReactNode> = {
  calmado: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M9 15h6" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#0d9488"/>
      <circle cx="15" cy="9.5" r="1" fill="#0d9488"/>
    </svg>
  ),
  ansioso: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 15.5s1-1 3.5-1 3.5 1 3.5 1" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#f59e0b"/>
      <circle cx="15" cy="9.5" r="1" fill="#f59e0b"/>
    </svg>
  ),
  alegre: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#0ea5e9"/>
      <circle cx="15" cy="9.5" r="1" fill="#0ea5e9"/>
    </svg>
  ),
  neutro: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M9 14.5h6" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#94a3b8"/>
      <circle cx="15" cy="9.5" r="1" fill="#94a3b8"/>
    </svg>
  ),
  triste: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#6366f1"/>
      <circle cx="15" cy="9.5" r="1" fill="#6366f1"/>
    </svg>
  ),
};

const entries = [
  { moodId: "calmado", label: "Calmado", date: "Hoy, 9:14 AM", excerpt: "Hoy fue un día tranquilo. Logré hacer mi rutina matutina sin interrupciones y me sentí bastante centrado...", shared: true },
  { moodId: "ansioso", label: "Ansioso", date: "Ayer, 11:30 PM", excerpt: "Tuve un momento difícil por la noche. Los pensamientos circulares volvieron pero usé la técnica de respiración.", shared: false },
  { moodId: "alegre", label: "Alegre", date: "Hace 2 días", excerpt: "Cumplí mi meta de ejercicio por quinta vez consecutiva. Pequeña celebración con un café especial.", shared: true },
  { moodId: "neutro", label: "Neutro", date: "Hace 3 días", excerpt: "Día sin grandes altibajos. Trabajé bien y cuidé mi alimentación.", shared: false },
  { moodId: "triste", label: "Triste", date: "Hace 4 días", excerpt: "Me costó levantarme. Recordé el cumpleaños de mi madre y me puse melancólico. Pero salí a caminar.", shared: true },
];

export default function HistorialPage() {
  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-10 py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Registros Emocionales —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bitácora de Progreso
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Historial emocional de Alex — Últimos 30 días
        </p>

        {/* Emotional trend chart */}
        <div className="border border-slate-200 bg-white rounded-sm p-8 mb-6">
          <p
            className="text-[9px] tracking-[2px] uppercase text-teal-600 mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tendencia Emocional
          </p>
          <div className="relative h-[80px]">
            <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,60 C40,55 80,30 120,35 C160,40 200,25 240,20 C280,15 320,40 360,30 L400,25 L400,80 L0,80 Z" fill="url(#trendGrad)"/>
              <path d="M0,60 C40,55 80,30 120,35 C160,40 200,25 240,20 C280,15 320,40 360,30 L400,25" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" className="animate-draw"/>
              {[
                [0, 60], [120, 35], [240, 20], [360, 30], [400, 25]
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="#0d9488"/>
              ))}
            </svg>
            {/* Y axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
              <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Muy bien</p>
              <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Regular</p>
              <p className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Difícil</p>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((w) => (
              <p key={w} className="text-[8px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{w}</p>
            ))}
          </div>
        </div>

        {/* Entries list */}
        <div className="border border-slate-200 bg-white rounded-sm p-8">
          <p
            className="text-[9px] tracking-[2px] uppercase text-teal-600 mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Entradas Recientes
          </p>

          {entries.map((entry, i) => (
            <div key={i} className={`py-5 ${i > 0 ? "border-t border-slate-50" : ""}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {MOOD_SVG[entry.moodId]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p
                      className="text-[15px] italic text-slate-700"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {entry.label}
                    </p>
                    {entry.shared ? (
                      <span
                        className="text-[7px] tracking-[1px] uppercase text-teal-400 bg-teal-50 px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Compartido
                      </span>
                    ) : (
                      <span
                        className="text-[7px] tracking-[1px] uppercase text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Privado
                      </span>
                    )}
                    <p
                      className="text-[9px] text-slate-300 ml-auto"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {entry.date}
                    </p>
                  </div>
                  <p
                    className="text-[12px] italic text-slate-400 leading-relaxed mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;{entry.excerpt}&rdquo;
                  </p>
                  {entry.shared && (
                    <button
                      className="text-[8px] tracking-[1.5px] uppercase text-teal-500 border border-teal-200 hover:bg-teal-50 transition-colors px-4 py-1.5 rounded"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Leer Nota Completa →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
