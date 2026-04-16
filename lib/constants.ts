import type { AddictionType, Mood } from "@/types";

export const ADDICTION_TYPES: AddictionType[] = [
  { id: "alcohol", label: "Alcohol", classification: "Sustancias" },
  { id: "drogas", label: "Drogas", classification: "Sustancias" },
  { id: "apuestas", label: "Apuestas", classification: "Conductual" },
  { id: "videojuegos", label: "Videojuegos", classification: "Conductual" },
  { id: "celular", label: "Celular", classification: "Conductual" },
  { id: "sexo", label: "Sexo", classification: "Conductual" },
  { id: "otros", label: "Otros" },
];

export const MOOD_OPTIONS: Mood[] = [
  { id: "feliz",       label: "Feliz" },
  { id: "calmado",     label: "Calmado" },
  { id: "motivado",    label: "Motivado" },
  { id: "esperanzado", label: "Esperanzado" },
  { id: "agradecido",  label: "Agradecido" },
  { id: "ansioso",     label: "Ansioso" },
  { id: "confundido",  label: "Confundido" },
  { id: "agotado",     label: "Agotado" },
  { id: "triste",      label: "Triste" },
  { id: "enojado",     label: "Enojado" },
];

// Etiquetas disponibles para publicaciones del foro
export const FORO_TAGS: string[] = [
  "Alcohol",
  "Drogas",
  "Apuestas",
  "Videojuegos",
  "Celular",
  "Sexo",
  "Otros",
  "Logros diarios",
  "Relaciones",
  "Ansiedad",
  "Estrés",
  "Felicidad",
  "Tranquilo",
];

export const FORO_TAG_VARIANTS: Record<string, "default" | "blue" | "green" | "red" | "yellow"> = {
  Alcohol: "red",
  Drogas: "red",
  Apuestas: "yellow",
  Videojuegos: "blue",
  Celular: "blue",
  Sexo: "default",
  Otros: "default",
  "Logros diarios": "green",
  Relaciones: "green",
  Ansiedad: "yellow",
  Estrés: "yellow",
  Felicidad: "green",
  Tranquilo: "green",
};
