"use client";
/**
 * components/ui/PlantStage.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Ilustración SVG de planta que evoluciona visualmente según los días de
 * sobriedad del usuario.
 *
 * Etapas:
 *  0  (0 días)     → Semilla
 *  1  (1 día)      → Semilla Viva
 *  2  (2–6 días)   → Germinando
 *  3  (7–13 días)  → Primer Brote
 *  4  (14–20 días) → Planta Joven
 *  5  (21–27 días) → Creciendo
 *  6  (28–29 días) → Casi Lista
 *  7  (30+ días)   → Plena Floración  ← HITO VISUAL
 */
import { useMemo } from "react";

interface PlantStageProps {
  days: number;
  className?: string;
}

function getStageIndex(days: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  if (days < 1)  return 0;
  if (days < 2)  return 1;
  if (days < 7)  return 2;
  if (days < 14) return 3;
  if (days < 21) return 4;
  if (days < 28) return 5;
  if (days < 30) return 6;
  return 7;
}

export const PLANT_STAGE_LABELS = [
  "Semilla",
  "Semilla Viva",
  "Germinando",
  "Primer Brote",
  "Planta Joven",
  "Creciendo",
  "Casi Lista",
  "Plena Floración",
] as const;

/** Devuelve la etiqueta de etapa según los días de sobriedad. */
export function getPlantLabel(days: number): string {
  return PLANT_STAGE_LABELS[getStageIndex(days)];
}

export default function PlantStage({ days, className = "" }: PlantStageProps) {
  const stage = useMemo(() => getStageIndex(days), [days]);
  const isMilestone = stage === 7;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Aura de celebración — solo en hito 30 días */}
      {isMilestone && (
        <div
          className="absolute inset-0 animate-breathe pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 72%)",
          }}
        />
      )}

      <svg
        width="110"
        height="140"
        viewBox="0 0 110 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "filter 0.6s ease",
          filter: isMilestone
            ? "drop-shadow(0 0 10px rgba(251,191,36,0.3))"
            : "none",
        }}
      >
        {stage === 0 && <Stage0 />}
        {stage === 1 && <StageDay1 />}
        {stage === 2 && <Stage1 />}
        {stage === 3 && <Stage2 />}
        {stage === 4 && <Stage3 />}
        {stage === 5 && <Stage4 />}
        {stage === 6 && <Stage5 />}
        {stage === 7 && <Stage6 />}
      </svg>
    </div>
  );
}

// ── Helpers compartidos ────────────────────────────────────────────────────

function GroundLine() {
  return (
    <line
      x1="20" y1="120" x2="90" y2="120"
      stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"
    />
  );
}

function SoilMound({ green = false }: { green?: boolean }) {
  return (
    <ellipse
      cx="55" cy="118" rx="26" ry="7"
      fill={green ? "#dcfce7" : "#e2e8f0"}
      stroke={green ? "#86efac" : "none"}
      strokeWidth="0.5"
    />
  );
}

// ── Etapa 0: Semilla ───────────────────────────────────────────────────────

function Stage0() {
  return (
    <>
      <GroundLine />
      <SoilMound />
      <ellipse cx="55" cy="106" rx="10" ry="13" fill="#e8edf2" stroke="#94a3b8" strokeWidth="1.5" />
      <path
        d="M55 93C55 93 63 99 63 107C63 115 55 120 55 120"
        stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.5"
      />
      <path
        d="M48 99C46 94 50 90 52 89C51 93 49 96 48 99Z"
        fill="#94a3b8" opacity="0.4"
      />
    </>
  );
}

// ── Etapa 1 (día 1): Semilla Viva ─────────────────────────────────────────

function StageDay1() {
  return (
    <>
      <GroundLine />
      <SoilMound />
      <ellipse cx="55" cy="106" rx="10" ry="13" fill="#e8edf2" stroke="#86efac" strokeWidth="1.5" />
      <path
        d="M55 93C55 93 62 99 62 106C62 114 55 120 55 120"
        stroke="#86efac" strokeWidth="1" strokeLinecap="round" opacity="0.6"
      />
      {/* Señal mínima de vida en el día 1 */}
      <path d="M55 97 Q54.5 94 55 90" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

// ── Etapa 1: Germinando ────────────────────────────────────────────────────

function Stage1() {
  return (
    <>
      <GroundLine />
      <SoilMound green />
      <ellipse cx="55" cy="108" rx="9" ry="11" fill="#e8edf2" stroke="#86efac" strokeWidth="1.5" />
      <path
        d="M55 97C55 97 62 102 62 109C62 116 55 120 55 120"
        stroke="#86efac" strokeWidth="1" strokeLinecap="round" opacity="0.6"
      />
      {/* Brote diminuto emergiendo */}
      <path d="M55 97 Q54 91 55 84" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M55 87 Q52 83 49 80"
        stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"
      />
    </>
  );
}

// ── Etapa 2: Primer Brote ──────────────────────────────────────────────────

function Stage2() {
  return (
    <>
      <GroundLine />
      <SoilMound green />
      {/* Tallo corto */}
      <path d="M55 119 Q54 107 55 94" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      {/* Ramas */}
      <path d="M55 103 Q49 99 44 94" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 103 Q61 99 66 94" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
      {/* Hojas */}
      <ellipse cx="42" cy="93" rx="7" ry="3.5" fill="#86efac" transform="rotate(-25 42 93)" />
      <ellipse cx="68" cy="93" rx="7" ry="3.5" fill="#86efac" transform="rotate(25 68 93)" />
      {/* Yema superior */}
      <ellipse cx="55" cy="92" rx="4" ry="5.5" fill="#a7f3d0" opacity="0.9" />
    </>
  );
}

// ── Etapa 3: Planta Joven ──────────────────────────────────────────────────

function Stage3() {
  return (
    <>
      <GroundLine />
      <SoilMound green />
      {/* Tallo ~35px */}
      <path d="M55 119 Q54 102 55 83" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Par inferior */}
      <path d="M55 110 Q47 106 40 100" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 110 Q63 106 70 100" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="38" cy="99" rx="9" ry="5" fill="#4ade80" transform="rotate(-30 38 99)" />
      <ellipse cx="72" cy="99" rx="9" ry="5" fill="#4ade80" transform="rotate(30 72 99)" />
      {/* Par superior */}
      <path d="M55 96 Q49 92 44 86" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 96 Q61 92 66 86" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="42" cy="85" rx="8" ry="4" fill="#86efac" transform="rotate(-20 42 85)" />
      <ellipse cx="68" cy="85" rx="8" ry="4" fill="#86efac" transform="rotate(20 68 85)" />
      {/* Yema */}
      <ellipse cx="55" cy="80" rx="5" ry="7" fill="#a7f3d0" opacity="0.9" />
    </>
  );
}

// ── Etapa 4: Creciendo ─────────────────────────────────────────────────────

function Stage4() {
  return (
    <>
      <GroundLine />
      <SoilMound green />
      {/* Tallo ~55px */}
      <path d="M55 119 Q54 95 55 65" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Par bajo */}
      <path d="M55 112 Q45 107 38 101" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 112 Q65 107 72 101" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="99" rx="10" ry="5.5" fill="#22c55e" transform="rotate(-32 36 99)" />
      <ellipse cx="74" cy="99" rx="10" ry="5.5" fill="#22c55e" transform="rotate(32 74 99)" />
      {/* Par medio */}
      <path d="M55 98 Q46 94 40 87" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 98 Q64 94 70 87" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="38" cy="86" rx="10" ry="5.5" fill="#4ade80" transform="rotate(-25 38 86)" />
      <ellipse cx="72" cy="86" rx="10" ry="5.5" fill="#4ade80" transform="rotate(25 72 86)" />
      {/* Par alto */}
      <path d="M55 82 Q49 78 44 72" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 82 Q61 78 66 72" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="42" cy="71" rx="8.5" ry="4.5" fill="#86efac" transform="rotate(-18 42 71)" />
      <ellipse cx="68" cy="71" rx="8.5" ry="4.5" fill="#86efac" transform="rotate(18 68 71)" />
      {/* Yema */}
      <ellipse cx="55" cy="62" rx="5.5" ry="8" fill="#a7f3d0" stroke="#86efac" strokeWidth="0.5" />
    </>
  );
}

// ── Etapa 5: Casi Lista ────────────────────────────────────────────────────

function Stage5() {
  return (
    <>
      <GroundLine />
      <SoilMound green />
      {/* Tallo ~68px */}
      <path d="M55 119 Q54 91 55 52" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />
      {/* Par bajo */}
      <path d="M55 113 Q44 108 37 102" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 113 Q66 108 73 102" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="35" cy="100" rx="11" ry="5.5" fill="#16a34a" transform="rotate(-32 35 100)" />
      <ellipse cx="75" cy="100" rx="11" ry="5.5" fill="#16a34a" transform="rotate(32 75 100)" />
      {/* Par medio */}
      <path d="M55 97 Q45 92 39 85" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 97 Q65 92 71 85" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="37" cy="83" rx="11" ry="5.5" fill="#22c55e" transform="rotate(-26 37 83)" />
      <ellipse cx="73" cy="83" rx="11" ry="5.5" fill="#22c55e" transform="rotate(26 73 83)" />
      {/* Par alto */}
      <path d="M55 79 Q48 74 43 67" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 79 Q62 74 67 67" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="41" cy="66" rx="9" ry="4.5" fill="#4ade80" transform="rotate(-20 41 66)" />
      <ellipse cx="69" cy="66" rx="9" ry="4.5" fill="#4ade80" transform="rotate(20 69 66)" />
      {/* Yema a punto de abrirse */}
      <ellipse cx="55" cy="48" rx="6" ry="9" fill="#a7f3d0" stroke="#4ade80" strokeWidth="0.8" />
      <path d="M51 44 Q49 38 52 35" stroke="#86efac" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M59 44 Q61 38 58 35" stroke="#86efac" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M55 41 L55 34" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </>
  );
}

// ── Etapa 6: Plena Floración (HITO 30 días) ───────────────────────────────

function Stage6() {
  return (
    <>
      {/* Destellos de celebración */}
      <circle cx="22" cy="42" r="2" fill="#fbbf24" opacity="0.85" />
      <path
        d="M22 37L22 33M18 42L14 42M26 42L30 42M20 38L17 35M24 38L27 35"
        stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
      />
      <circle cx="87" cy="36" r="1.5" fill="#38bdf8" opacity="0.9" />
      <path
        d="M87 31L87 27M83 36L79 36M91 36L95 36"
        stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.75"
      />
      <circle cx="18" cy="82" r="1.5" fill="#f472b6" opacity="0.65" />
      <circle cx="93" cy="73" r="2" fill="#a78bfa" opacity="0.6" />
      <circle cx="28" cy="115" r="1" fill="#fbbf24" opacity="0.5" />
      <circle cx="84" cy="112" r="1.5" fill="#86efac" opacity="0.6" />

      <GroundLine />
      <SoilMound green />

      {/* Tallo principal */}
      <path d="M55 119 Q54 89 55 48" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />

      {/* Par bajo */}
      <path d="M55 113 Q44 108 37 102" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 113 Q66 108 73 102" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="35" cy="100" rx="11" ry="5.5" fill="#16a34a" transform="rotate(-32 35 100)" />
      <ellipse cx="75" cy="100" rx="11" ry="5.5" fill="#16a34a" transform="rotate(32 75 100)" />

      {/* Par medio */}
      <path d="M55 95 Q45 90 38 83" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 95 Q65 90 72 83" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="81" rx="11" ry="5.5" fill="#22c55e" transform="rotate(-26 36 81)" />
      <ellipse cx="74" cy="81" rx="11" ry="5.5" fill="#22c55e" transform="rotate(26 74 81)" />

      {/* Par alto */}
      <path d="M55 77 Q47 72 42 65" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 77 Q63 72 68 65" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="40" cy="64" rx="9" ry="4.5" fill="#4ade80" transform="rotate(-20 40 64)" />
      <ellipse cx="70" cy="64" rx="9" ry="4.5" fill="#4ade80" transform="rotate(20 70 64)" />

      {/* Pétalos de flor — 6 pétalos rotados alrededor del centro (55, 46) */}
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" />
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" transform="rotate(60 55 46)" />
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" transform="rotate(120 55 46)" />
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" transform="rotate(180 55 46)" />
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" transform="rotate(240 55 46)" />
      <ellipse cx="55" cy="37" rx="4.5" ry="7" fill="#38bdf8" opacity="0.92" transform="rotate(300 55 46)" />

      {/* Centro de la flor */}
      <circle cx="55" cy="46" r="8" fill="#fbbf24" />
      <circle cx="55" cy="46" r="5" fill="#f59e0b" />
      <circle cx="55" cy="46" r="2.5" fill="#fde68a" />
    </>
  );
}
