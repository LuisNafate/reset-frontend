// components/ui/MoodIcons.tsx
// Iconos SVG de estado emocional compartidos entre las páginas de acompañante.

import React from "react";

export const MOOD_SVG: Record<string, React.ReactNode> = {
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
  triste: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 16s1-2 3.5-2 3.5 2 3.5 2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="#6366f1"/>
      <circle cx="15" cy="9.5" r="1" fill="#6366f1"/>
    </svg>
  ),
  motivado: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      <path d="M8.5 13.5s1 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round"/>
      <circle cx="9" cy="9.5" r="1.5" fill="#14b8a6"/>
      <circle cx="15" cy="9.5" r="1.5" fill="#14b8a6"/>
    </svg>
  ),
};
