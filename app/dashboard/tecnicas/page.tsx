"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Tecnica {
  id: string;
  categoria: string;
  nombre: string;
  duracion: string;
  dificultad: "Fácil" | "Moderada" | "Avanzada";
  descripcion: string;
  pasos: string[];
  consejo?: string;
}

// ─── Datos estáticos (listos para conectar a API) ─────────────────────────────

const TECNICAS: Tecnica[] = [
  // ── Calma y Respiración ────────────────────────────────────────────────────
  {
    id: "respiracion-4-7-8",
    categoria: "Calma y Respiración",
    nombre: "Respiración 4-7-8",
    duracion: "5 min",
    dificultad: "Fácil",
    descripcion:
      "Técnica de respiración controlada que activa el sistema nervioso parasimpático, reduciendo la ansiedad y el impulso de craving en minutos.",
    pasos: [
      "Siéntate o acuéstate en una posición cómoda.",
      "Inhala por la nariz contando lentamente hasta 4.",
      "Sostén el aire contando hasta 7.",
      "Exhala completamente por la boca contando hasta 8.",
      "Repite el ciclo entre 3 y 6 veces.",
    ],
    consejo: "Hazlo con los ojos cerrados y enfoca toda tu atención en el conteo. Si sientes mareo, vuelve a tu ritmo normal.",
  },
  {
    id: "grounding-5-4-3-2-1",
    categoria: "Calma y Respiración",
    nombre: "Grounding 5-4-3-2-1",
    duracion: "3–5 min",
    dificultad: "Fácil",
    descripcion:
      "Técnica de anclaje sensorial que te trae al presente de forma inmediata, interrumpiendo espirales de ansiedad o pensamientos intrusivos.",
    pasos: [
      "Nombra 5 cosas que puedes VER a tu alrededor.",
      "Nombra 4 cosas que puedes TOCAR o sentir físicamente.",
      "Nombra 3 cosas que puedes ESCUCHAR en este momento.",
      "Nombra 2 cosas que puedes OLER (o que te gustaría oler).",
      "Nombra 1 cosa que puedes SABOREAR.",
    ],
    consejo: "Puedes hacerlo en silencio o en voz alta. Lo importante es tomarte el tiempo real con cada sentido.",
  },
  {
    id: "relajacion-muscular",
    categoria: "Calma y Respiración",
    nombre: "Relajación Muscular Progresiva",
    duracion: "10 min",
    dificultad: "Fácil",
    descripcion:
      "Técnica para liberar tensión física acumulada por el estrés o la ansiedad, tensando y soltando grupos musculares de forma intencional.",
    pasos: [
      "Comienza por los pies: tensa los músculos durante 5 segundos.",
      "Suelta y nota la diferencia entre tensión y relajación por 10 segundos.",
      "Sube por pantorrillas, muslos, abdomen, manos, brazos, hombros y rostro.",
      "Al terminar, respira profundo tres veces.",
    ],
  },
  // ── Manejo de Cravings ─────────────────────────────────────────────────────
  {
    id: "regla-15-minutos",
    categoria: "Manejo de Cravings",
    nombre: "La Regla de los 15 Minutos",
    duracion: "15 min",
    dificultad: "Moderada",
    descripcion:
      "Un craving raramente dura más de 15 minutos en su pico. Esta técnica usa ese conocimiento para crear distancia entre el impulso y la acción.",
    pasos: [
      "Cuando sientas un craving, mira la hora y ponle nombre: \"Estoy teniendo un craving.\"",
      "Elige una actividad simple para los próximos 15 minutos (caminar, agua fría, llamar a alguien).",
      "Al cumplir los 15 minutos, evalúa: ¿el impulso bajó?",
      "Si persiste, repite el ciclo una vez más.",
    ],
    consejo: "Nombrar el craving sin juzgarlo lo hace menos intenso. No eres el craving; lo observas.",
  },
  {
    id: "halt",
    categoria: "Manejo de Cravings",
    nombre: "La Técnica HALT",
    duracion: "2–3 min",
    dificultad: "Fácil",
    descripcion:
      "HALT es un acrónimo: Hambre, Ansiedad (Anger), Soledad (Lonely), Cansancio (Tired). Muchos cravings se disparan por una de estas cuatro necesidades básicas no atendidas.",
    pasos: [
      "Cuando sientas un impulso, hazte la pregunta: ¿Tengo Hambre? ¿Estoy muy Ansioso? ¿Me siento Solo? ¿Estoy agotado?",
      "Identifica cuál aplica ahora mismo.",
      "Atiende primero esa necesidad: come algo, escribe tu emoción, llama a alguien, o descansa 10 minutos.",
    ],
    consejo: "Este chequeo rápido puede ahorrarte mucho. Con la práctica lo harás automáticamente.",
  },
  {
    id: "surf-del-craving",
    categoria: "Manejo de Cravings",
    nombre: "Surf del Craving",
    duracion: "5–10 min",
    dificultad: "Moderada",
    descripcion:
      "En lugar de luchar contra el impulso, lo observas como si fuera una ola: sube, llega a su cresta y baja. No te fusionas con él, lo examinas.",
    pasos: [
      "Siéntate cómodamente y cierra los ojos.",
      "Observa dónde sientes el craving en el cuerpo (pecho, garganta, estómago).",
      "Dale una forma, tamaño y color mental.",
      "Imagina que eres un surfista sobre esa ola: estás encima, no dentro.",
      "Observa cómo la ola se mueve y cambia sin que tú hagas nada.",
    ],
  },
  // ── Hábitos y Rutina ──────────────────────────────────────────────────────
  {
    id: "diario-gratitud",
    categoria: "Hábitos y Rutina",
    nombre: "Diario de Gratitud",
    duracion: "5 min",
    dificultad: "Fácil",
    descripcion:
      "Escribir tres cosas por las que estás agradecido cada día reorienta la atención del cerebro hacia lo positivo, reduciendo la rumiación.",
    pasos: [
      "Abre tu Bitácora al final del día (o al despertar).",
      "Escribe exactamente tres cosas concretas por las que estás agradecido hoy.",
      "No repitas la misma lista: busca detalles pequeños y nuevos.",
      "Opcional: escribe también por qué te alegra cada una.",
    ],
    consejo: "La clave está en la especificidad. \"Estoy agradecido por el café de esta mañana\" es más poderoso que \"agradecido por la vida\".",
  },
  {
    id: "habito-ancla",
    categoria: "Hábitos y Rutina",
    nombre: "El Hábito Ancla",
    duracion: "Variable",
    dificultad: "Moderada",
    descripcion:
      "Vincular un nuevo hábito saludable a uno que ya haces todos los días lo hace mucho más fácil de mantener. Es el método más efectivo para consolidar rutinas.",
    pasos: [
      "Elige un hábito que ya haces sin pensarlo (tomar agua, lavarte los dientes, preparar el desayuno).",
      "Decide el nuevo hábito que quieres construir (5 respiraciones, 2 minutos de estiramiento, escribir una línea en la Bitácora).",
      "Cada vez que hagas el hábito ancla, inmediatamente haz el nuevo hábito.",
      "Mantenlo durante 2 semanas seguidas antes de añadir otro.",
    ],
    consejo: "Pequeño y consistente siempre supera a grande e irregular.",
  },
  // ── Autoconocimiento ───────────────────────────────────────────────────────
  {
    id: "carta-a-ti-mismo",
    categoria: "Autoconocimiento",
    nombre: "Carta a tu Yo Futuro",
    duracion: "15–20 min",
    dificultad: "Avanzada",
    descripcion:
      "Escribirte una carta a ti mismo en el futuro fortalece la identidad del \"yo que elige no consumir\" y da perspectiva en momentos difíciles.",
    pasos: [
      "Cierra los ojos e imagínate dentro de 6 o 12 meses, habiendo mantenido tu proceso.",
      "Abre la Bitácora y escríbete una carta: ¿Qué has logrado? ¿Qué sientes? ¿Qué quieres que recuerdes hoy?",
      "Léela al terminar.",
      "Guárdala para abrirla en un momento de debilidad.",
    ],
    consejo: "No hace falta que sea perfecta. Lo que importa es la conexión emocional con esa versión futura.",
  },
  {
    id: "valores-bussola",
    categoria: "Autoconocimiento",
    nombre: "Brújula de Valores",
    duracion: "10–15 min",
    dificultad: "Moderada",
    descripcion:
      "Tener claros tus valores personales actúa como ancla en momentos de tentación. Esta técnica te ayuda a identificarlos y usarlos como guía.",
    pasos: [
      "Escribe 10 palabras que representan cómo quieres vivir (familia, honestidad, salud, libertad, creatividad…).",
      "Reduce la lista a los 3 valores más importantes para ti.",
      "Escribe una acción concreta que puedes hacer hoy que esté alineada con cada uno.",
      "Cuando enfrentes una decisión difícil, pregúntate: ¿esto va en línea con mis 3 valores?",
    ],
  },
];

// ─── Groups ───────────────────────────────────────────────────────────────────

const CATEGORIAS = [...new Set(TECNICAS.map((t) => t.categoria))];

const DIFICULTAD_COLORS: Record<Tecnica["dificultad"], { bg: string; text: string }> = {
  Fácil:    { bg: "bg-emerald-50",  text: "text-emerald-600" },
  Moderada: { bg: "bg-amber-50",    text: "text-amber-600" },
  Avanzada: { bg: "bg-violet-50",   text: "text-violet-600" },
};

// ─── Componente tarjeta ────────────────────────────────────────────────────────

function TecnicaCard({ tecnica }: { tecnica: Tecnica }) {
  const [expanded, setExpanded] = useState(false);
  const dc = DIFICULTAD_COLORS[tecnica.dificultad];

  return (
    <div
      className="bg-white border border-slate-200 rounded-sm overflow-hidden transition-shadow hover:shadow-sm"
      style={{ boxShadow: "0px 2px 12px -4px rgba(0,0,0,0.06)" }}
    >
      {/* Card header */}
      <button
        type="button"
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] tracking-[1px] uppercase font-normal ${dc.bg} ${dc.text}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tecnica.dificultad}
            </span>
            <span
              className="text-[8px] tracking-[1px] uppercase text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tecnica.duracion}
            </span>
          </div>
          <h3
            className="text-[18px] font-normal text-slate-800 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {tecnica.nombre}
          </h3>
          {!expanded && (
            <p
              className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tecnica.descripcion}
            </p>
          )}
        </div>
        <span className="flex-shrink-0 mt-1 text-slate-300 transition-transform" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
          <p
            className="text-[13px] text-slate-500 leading-relaxed mt-4 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {tecnica.descripcion}
          </p>

          <p
            className="text-[8px] tracking-[2px] uppercase text-slate-400 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Pasos
          </p>
          <ol className="flex flex-col gap-3 mb-5">
            {tecnica.pasos.map((paso, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[9px] text-sky-500 font-bold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-[13px] text-slate-600 leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {paso}
                </p>
              </li>
            ))}
          </ol>

          {tecnica.consejo && (
            <div className="bg-sky-50 border border-sky-100 rounded-sm px-4 py-3 flex gap-3 items-start">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className="text-[12px] italic text-sky-700 leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {tecnica.consejo}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function TecnicasPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todas");
  const categorias = ["Todas", ...CATEGORIAS];

  const tecnicasFiltradas =
    categoriaActiva === "Todas"
      ? TECNICAS
      : TECNICAS.filter((t) => t.categoria === categoriaActiva);

  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-8 sm:py-14">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-[9px] tracking-[1.8px] uppercase text-slate-400 mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Herramientas de Recuperación
          </p>
          <h1
            className="text-[42px] font-normal text-slate-800 leading-none mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mis Técnicas
          </h1>
          <p
            className="text-[12px] italic text-slate-400 max-w-md"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recursos prácticos pensados para tu proceso de recuperación. Úsalos a tu ritmo, vuelve a ellos cuando los necesites.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaActiva(cat)}
              className={`h-8 px-4 rounded-full text-[9px] tracking-[1.5px] uppercase transition-colors ${
                categoriaActiva === cat
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de técnicas */}
        <div className="flex flex-col gap-3">
          {tecnicasFiltradas.map((t) => (
            <TecnicaCard key={t.id} tecnica={t} />
          ))}
        </div>

        {/* CTA a bitácora */}
        <div className="mt-12 border border-slate-100 bg-white rounded-sm p-8 text-center">
          <p
            className="text-[9px] tracking-[2px] uppercase text-slate-400 mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Después de practicar
          </p>
          <p
            className="text-[18px] font-normal text-slate-700 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Registra cómo te sentiste en tu Bitácora
          </p>
          <Link
            href="/dashboard/bitacora"
            className="inline-flex items-center gap-2 h-10 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-sm transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Ir a Bitácora →
          </Link>
        </div>

      </div>
    </div>
  );
}
