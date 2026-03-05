"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Tecnica {
  id: string;
  categoria: string;
  nombre: string;
  duracion: string;
  dificultad: "Básica" | "Intermedia" | "Profunda";
  descripcion: string;
  pasos: string[];
  consejo?: string;
}

// ─── Datos estáticos (listos para conectar a API) ─────────────────────────────

const TECNICAS: Tecnica[] = [
  // ── Comunicación ───────────────────────────────────────────────────────────
  {
    id: "escucha-activa",
    categoria: "Comunicación",
    nombre: "Escucha Activa",
    duracion: "Sin límite",
    dificultad: "Básica",
    descripcion:
      "La habilidad más importante del acompañante. Escuchar sin interrumpir, sin ofrecer soluciones de inmediato y sin juzgar crea el espacio seguro que la persona en recuperación necesita.",
    pasos: [
      "Mantén contacto visual y lenguaje corporal abierto (no cruces los brazos).",
      "Espera a que la persona termine antes de responder. No te apresures a \"arreglar\" nada.",
      "Refleja lo que escuchas: \"Escucho que te sientes muy presionado. ¿Así es?\"",
      "Valida la emoción antes de ofrecer perspectiva: \"Tiene sentido que te sientas así.\"",
      "Evita: comparar su situación con otras, minimizar o dar consejos no pedidos.",
    ],
    consejo: "El silencio cómodo también es apoyo. No sientas que debes llenar cada pausa.",
  },
  {
    id: "preguntas-abiertas",
    categoria: "Comunicación",
    nombre: "El Arte de las Preguntas Abiertas",
    duracion: "Variable",
    dificultad: "Básica",
    descripcion:
      "Las preguntas abiertas invitan a la reflexión y generan conversación genuina. Las cerradas (sí/no) cierran el diálogo sin querer.",
    pasos: [
      "Sustituye preguntas cerradas por abiertas: en vez de \"¿Estás bien?\", pregunta \"¿Cómo estás llevando esta semana?\"",
      "Usa \"¿Qué?\", \"¿Cómo?\", \"¿Cuándo?\", \"¿Qué necesitas?\" en lugar de \"¿Por qué?\" (que puede sonar a juicio).",
      "Escucha sin evaluar. Tu objetivo no es interrogar, sino invitar.",
    ],
    consejo:
      "\"¿Qué es lo más difícil de hoy para ti?\" abre mucho más que \"¿Tuviste un día difícil?\".",
  },
  {
    id: "comunicacion-no-violenta",
    categoria: "Comunicación",
    nombre: "Comunicación No Violenta (CNV)",
    duracion: "10–15 min",
    dificultad: "Intermedia",
    descripcion:
      "Un marco para expresar necesidades y sentimientos sin culpar ni exigir. Útil cuando hay tensión o cuando quieres hablar de algo que te preocupa.",
    pasos: [
      "OBSERVACIÓN: Describe los hechos sin interpretar. \"Noto que esta semana no has escrito en tu bitácora.\"",
      "SENTIMIENTO: Expresa cómo te hace sentir. \"Me preocupo y me siento un poco impotente.\"",
      "NECESIDAD: Nombra tu necesidad. \"Necesito saber que estás bien para poder acompañarte mejor.\"",
      "PETICIÓN: Haz una petición concreta y negociable. \"¿Podrías contarme cómo estás hoy?\"",
    ],
    consejo: "TNota: las peticiones son diferentes a las exigencias. Si la persona dice que no, es válido. Las exigencias presionan; las peticiones conectan.",
  },
  // ── Límites Sanos ──────────────────────────────────────────────────────────
  {
    id: "limites-sanos",
    categoria: "Límites Sanos",
    nombre: "Identificar y Poner Límites",
    duracion: "15–20 min (reflexión)",
    dificultad: "Intermedia",
    descripcion:
      "Poner límites no es abandono. Es cuidarte para poder seguir cuidando. Sin límites claros, el agotamiento del acompañante se vuelve inevitable.",
    pasos: [
      "Identifica qué comportamientos o situaciones te generan desgaste o malestar.",
      "Define tu límite con claridad: ¿Qué sí puedes ofrecer? ¿Qué no?",
      "Comunícalo con calma y firmeza: \"Puedo acompañarte y escucharte, pero no puedo estar disponible las 24 horas todos los días.\"",
      "Mantén el límite aunque genere incomodidad al principio. La consistencia es clave.",
    ],
    consejo:
      "Un límite no es un castigo para la otra persona. Es una condición para que el acompañamiento sea sostenible.",
  },
  {
    id: "no-habilitar",
    categoria: "Límites Sanos",
    nombre: "Diferenciar Apoyo de Habilitación",
    duracion: "Variable",
    dificultad: "Profunda",
    descripcion:
      "Hay una diferencia entre apoyar el proceso de la persona y habilitar conductas que la mantienen estancada. Aprenderla protege a ambos.",
    pasos: [
      "Pregúntate: ¿Esta acción mía ayuda a la persona a crecer o la protege de las consecuencias de sus elecciones?",
      "Apoyo: escuchar, acompañar, estar presente, alentar hábitos saludables.",
      "Habilitación: cubrir sus errores, mentir por ella, asumir sus responsabilidades, ignorar recaídas.",
      "Si notas que habilitas, no te juzgues. Reflexiona qué necesitas tú para cambiar ese patrón.",
    ],
    consejo: "Busca apoyo para ti también si sientes que la línea se borra frecuentemente.",
  },
  // ── Momentos de Crisis ─────────────────────────────────────────────────────
  {
    id: "protocolo-crisis",
    categoria: "Momentos de Crisis",
    nombre: "Protocolo ante una Crisis",
    duracion: "Inmediato",
    dificultad: "Básica",
    descripcion:
      "Saber qué hacer (y qué no hacer) en un momento de crisis puede marcar la diferencia. La calma del acompañante es el primer recurso.",
    pasos: [
      "Mantén la calma. Tu estado emocional se transmite. Respira antes de responder.",
      "No des sermones. No es el momento de razonar ni de recordar compromisos.",
      "Pregunta simple y directa: \"¿Estás seguro/a ahora mismo?\" Si hay riesgo, actúa para buscar ayuda profesional.",
      "Escucha sin juzgar. Tu objetivo en ese momento es que la persona no esté sola.",
      "Después de la crisis, cuídate tú también. Una crisis también te afecta a ti.",
    ],
    consejo: "No tienes que tener respuestas perfectas. Estar presente y calmado ya es mucho.",
  },
  {
    id: "ante-recaida",
    categoria: "Momentos de Crisis",
    nombre: "Cómo Acompañar una Recaída",
    duracion: "Variable",
    dificultad: "Profunda",
    descripcion:
      "La recaída puede ser parte del proceso. Tu reacción como acompañante puede reforzar la vergüenza o abrir la puerta a retomar el camino.",
    pasos: [
      "No reacciones con enojo, decepción visible o distancia inmediata.",
      "Expresa que sigues estando: \"Estoy aquí. No esto no te define.\"",
      "Escucha cómo se siente la persona sin minimizar ni dramatizar.",
      "Avda a retomar el siguiente paso pequeño, no a reconstruir 'todo' de golpe.",
      "Busca apoyo profesional si la recaída implica riesgos de seguridad.",
    ],
    consejo: "Una recaída no es fracaso total. Es información y un punto nuevo para comenzar.",
  },
  // ── Autocuidado del Acompañante ────────────────────────────────────────────
  {
    id: "check-in-personal",
    categoria: "Autocuidado del Acompañante",
    nombre: "Check-in Personal Diario",
    duracion: "5 min",
    dificultad: "Básica",
    descripcion:
      "Acompañar a alguien en recuperación es emocionalmente exigente. Hacer un chequeo propio diario te mantiene consciente de tu propio estado.",
    pasos: [
      "Cada mañana o noche, hazte tres preguntas: ¿Cómo me siento hoy? ¿Qué necesito yo? ¿Tengo suficiente energía para acompañar?",
      "Escribe las respuestas (aunque sea dos líneas).",
      "Si notas que estás agotado/a, da prioridad a tu descanso antes de dar más al resto.",
    ],
    consejo: "No puedes verter de un vaso vacío. Tu bienestar importa igual.",
  },
  {
    id: "prevenir-burnout",
    categoria: "Autocuidado del Acompañante",
    nombre: "Prevenir el Burnout del Acompañante",
    duracion: "Reflexión continua",
    dificultad: "Intermedia",
    descripcion:
      "El síndrome de burnout en el acompañante es real y frecuente. Aprenderlo a tiempo permite mantener el acompañamiento sostenible a largo plazo.",
    pasos: [
      "Señales de alerta: agotamiento constante, irritabilidad, sensación de que la responsabilidad recae solo en ti, resentimiento.",
      "Acción 1: Establece momentos de desconexión donde no estés disponible (sin culpa).",
      "Acción 2: Mantén tus propias actividades, relaciones y espacios de descanso.",
      "Acción 3: Si el agotamiento persiste, considera un grupo de apoyo para familiares o un espacio terapéutico propio.",
    ],
    consejo: "Pedir ayuda tú también es parte del proceso, no una señal de debilidad.",
  },
];

// ─── Groups ───────────────────────────────────────────────────────────────────

const CATEGORIAS = [...new Set(TECNICAS.map((t) => t.categoria))];

const DIFICULTAD_COLORS: Record<Tecnica["dificultad"], { bg: string; text: string }> = {
  Básica:      { bg: "bg-emerald-50", text: "text-emerald-600" },
  Intermedia:  { bg: "bg-amber-50",   text: "text-amber-600" },
  Profunda:    { bg: "bg-violet-50",  text: "text-violet-600" },
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
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-teal-50/30 transition-colors"
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
        <span
          className="flex-shrink-0 mt-1 text-teal-300 transition-transform"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
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
                  className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[9px] text-teal-600 font-bold"
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
            <div className="bg-teal-50 border border-teal-100 rounded-sm px-4 py-3 flex gap-3 items-start">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d9488"
                strokeWidth="1.5"
                className="flex-shrink-0 mt-0.5"
              >
                <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className="text-[12px] italic text-teal-700 leading-relaxed"
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

export default function TecnicasAcompananteePage() {
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
            className="text-[9px] tracking-[1.8px] uppercase text-teal-500 mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Recursos para Acompañantes
          </p>
          <h1
            className="text-[42px] font-normal text-slate-800 leading-none mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Técnicas de Acompañamiento
          </h1>
          <p
            className="text-[12px] italic text-slate-400 max-w-md"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Herramientas pensadas desde la perspectiva del padrino y del acompañante. Para estar presente sin agotarse.
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
                  ? "bg-teal-700 text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-teal-200"
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

        {/* Banner de autocuidado */}
        <div className="mt-12 border border-teal-100 bg-teal-50 rounded-sm p-8 text-center">
          <p
            className="text-[9px] tracking-[2px] uppercase text-teal-500 mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Recuerda
          </p>
          <p
            className="text-[18px] font-normal text-teal-800 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cuidar también se aprende
          </p>
          <p
            className="text-[11px] italic text-teal-600 max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tu bienestar no es secundario. Usando estas técnicas cuidas mejor a quien acompañas.
          </p>
          <Link
            href="/acompanante/cuenta"
            className="inline-flex items-center gap-2 h-10 px-6 bg-teal-700 hover:bg-teal-600 text-white rounded-sm transition-colors mt-5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Mi perfil →
          </Link>
        </div>

      </div>
    </div>
  );
}
