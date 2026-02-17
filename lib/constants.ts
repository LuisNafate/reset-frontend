import type { AddictionType, Mood } from "@/types";

export const ADDICTION_TYPES: AddictionType[] = [
  { id: "alcohol", label: "Alcohol" },
  { id: "drogas", label: "Drogas" },
  { id: "apuestas", label: "Apuestas" },
  { id: "videojuegos", label: "Videojuegos" },
  { id: "celular", label: "Celular" },
  { id: "sexo", label: "Sexo" },
  { id: "otros", label: "Otros" },
];

export const MOOD_OPTIONS: Mood[] = [
  { id: "feliz", label: "Feliz" },
  { id: "calmado", label: "Calmado" },
  { id: "ansioso", label: "Ansioso" },
  { id: "triste", label: "Triste" },
  { id: "directado", label: "Directado" },
];
