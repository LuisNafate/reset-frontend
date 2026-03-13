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
  role?: "ADICTO" | "PADRINO";
}

export interface AddictionData {
  custom_name: string;
  classification: string;
  is_active: boolean;
  registered_at: string;
}

export interface SponsorData {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADICTO" | "PADRINO";
  sponsorCode?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  addiction?: AddictionData | null;
  sponsor?: SponsorData | null;
}

export interface AuthResponse {
  accessToken: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'role' | 'sponsorCode'>;
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

export type MoodId =
  | "feliz"
  | "calmado"
  | "ansioso"
  | "triste"
  | "motivado"
  | "esperanzado"
  | "agradecido"
  | "agotado"
  | "confundido"
  | "enojado";

export interface Mood {
  id: MoodId;
  label: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  mood: MoodId;
  notes: string;
  consumed: boolean;
  createdAt: string;
  isShared?: boolean; // TODO: sin soporte en BD actual
}

export interface SaveJournalEntryData {
  title: string;
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
  authorId: string;
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

export interface ForoComment {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  content: string;
  isAnonymous: boolean;
  likes: number;
  timeAgo: string;
  isMine: boolean;
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

export interface SupportedUser {
  id: string;
  displayName: string;
  addictionType: string;
  sobrietyDays: number;
  status: 'Activo' | 'Inactivo';
}

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
