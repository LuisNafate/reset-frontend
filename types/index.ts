// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  addictionType: string;
  otherDescription?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  addictionType: string;
  createdAt: string;
  role: "user" | "companion";
}

// ─── Dashboard / Progress ────────────────────────────────────────────────────

export interface UserProgress {
  sobrietyDays: number;
  plantStage: "Semilla" | "Brote" | "Planta" | "Árbol" | "Ciprés";
  consecutiveDays: number;
  lastNote?: string;
  nextMilestone?: {
    label: string;
    daysLeft: number;
  };
}

// ─── Addiction Types ─────────────────────────────────────────────────────────

export type AddictionTypeId =
  | "alcohol"
  | "drogas"
  | "apuestas"
  | "videojuegos"
  | "celular"
  | "sexo"
  | "otros";

export interface AddictionType {
  id: AddictionTypeId;
  label: string;
}

// ─── Journal / Bitácora ──────────────────────────────────────────────────────

export type MoodId = "feliz" | "calmado" | "ansioso" | "triste" | "directado";

export interface Mood {
  id: MoodId;
  label: string;
}

export interface JournalEntry {
  id: string;
  mood: MoodId;
  notes: string;
  createdAt: string;
  isShared?: boolean; // TODO: sin soporte en BD actual
}

export interface SaveJournalEntryData {
  mood: MoodId;
  notes: string;
  consumed: boolean;          // Requerido por tracking.daily_logs — activa/rompe la racha
  cravingLevel?: 1|2|3|4|5;  // Mapea a core.craving_levels.level
}

// ─── Forum / Foro ─────────────────────────────────────────────────────────────

export interface ForoPost {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  tags: string[];
  tagVariants: Array<"default" | "blue" | "green" | "red" | "yellow">;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  bookmarked: boolean;
}

export interface CreateForoPostData {
  title: string;
  content: string;
  isAnonymous: boolean; // Nombre exacto requerido por MongoDB (campo obligatorio)
  tags: string[];
}

export interface ForoCategory {
  name: string;
  count: string;
}

// ─── Profile / Configuración ─────────────────────────────────────────────────

export interface SupportPeer {
  id: string;
  name: string;
  email: string;
}

export interface ProfileUpdateData {
  username: string;
  addictionType: string;
}

// ─── Companion ───────────────────────────────────────────────────────────────

export interface CompanionActivity {
  mood: string;
  moodEmoji: string;
  label: string;
  date: string;
  excerpt?: string;
  shared: boolean;
}

export interface CompanionProgress {
  sobrietyDays: number;
  plantStage: string;
  notesThisWeek: number;
  messagesReceived: number;
  consistency: number;
  lastActiveAt: string;
  recentActivity: CompanionActivity[];
}

// ─── Messages / Mensajes ─────────────────────────────────────────────────────

export interface Message {
  id?: string;
  text: string;
  time: string;
  fromMe: boolean;
}

export interface MessageLibraryItem {
  id: string;
  text: string;
}

// ─── Mi Cuenta (Companion) ───────────────────────────────────────────────────

export interface CompanionProfile {
  name: string;
  email: string;
  phone: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
}

export interface SupportedUser {
  id: string;
  displayName: string;
  addictionType: string;
  sobrietyDays: number;
  status: "Activo" | "Inactivo";
}
