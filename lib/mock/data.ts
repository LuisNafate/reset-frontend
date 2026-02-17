import type {
  ForoPost,
  ForoCategory,
  JournalEntry,
  SupportPeer,
  CompanionProgress,
  CompanionActivity,
  Message,
  MessageLibraryItem,
  CompanionProfile,
  SupportedUser,
  UserProgress,
  User,
} from "@/types";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const MOCK_USER: User = {
  id: "usr_001",
  name: "Alex",
  email: "alex@correo.com",
  addictionType: "Drogas",
  createdAt: "2026-01-01T00:00:00Z",
  role: "user",
};

export const MOCK_COMPANION_USER: User = {
  id: "cmp_001",
  name: "Martina García",
  email: "padrino@correo.com",
  addictionType: "",
  createdAt: "2026-01-01T00:00:00Z",
  role: "companion",
};

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const MOCK_PROGRESS: UserProgress = {
  sobrietyDays: 42,
  plantStage: "Semilla",
  consecutiveDays: 7,
  lastNote: "Hoy fue un día tranquilo. Logré hacer mi rutina matutina...",
  nextMilestone: { label: "2 Meses", daysLeft: 18 },
};

// ─── Journal ─────────────────────────────────────────────────────────────────

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "j1",
    mood: "calmado",
    notes: "Hoy fue un día tranquilo. Logré hacer mi rutina matutina sin interrupciones.",
    createdAt: "2026-02-25T09:14:00Z",
    isShared: true,
  },
  {
    id: "j2",
    mood: "ansioso",
    notes: "Los pensamientos circulares volvieron pero usé la técnica de respiración.",
    createdAt: "2026-02-24T23:30:00Z",
    isShared: false,
  },
];

// ─── Forum ───────────────────────────────────────────────────────────────────

export const MOCK_FORO_POSTS: ForoPost[] = [
  {
    id: 1,
    title: "Mi primer mes",
    author: "Usuario_1",
    timeAgo: "Hace 2 horas",
    tags: ["Alcohol", "Logros"],
    tagVariants: ["blue", "green"],
    content:
      "No puedo creer que finalmente llegué a los 30 días. Ha sido un viaje de introspección y mucha paciencia.",
    likes: 24,
    comments: 12,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Consejos para la ansiedad",
    author: "Usuario_E",
    timeAgo: "Ayer, hace 2 horas",
    tags: ["Ansiedad", "Apuestas"],
    tagVariants: ["yellow", "blue"],
    content:
      "Cuando las ganas de volver a jugar aparecen, la respiración diafragmática y caminar descalzo me ayudan a aterrizar mis pensamientos.",
    likes: 56,
    comments: 38,
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    title: "Recaídas y perdón",
    author: "amaro_R",
    timeAgo: "Ayer",
    tags: ["Reflexión"],
    tagVariants: ["default"],
    content:
      "Ayer tuve un tropiezo después de 15 días. Me sentí devastado, pero hoy elijo perdonarme y empezar de nuevo.",
    likes: 102,
    comments: 45,
    liked: false,
    bookmarked: true,
  },
];

export const MOCK_FORO_CATEGORIES: ForoCategory[] = [
  { name: "Alcoholismo", count: "1,2K" },
  { name: "Apuestas", count: "948" },
  { name: "Ansiedad & Estrés", count: "2,1K" },
  { name: "Logros Diarios", count: "3,3K" },
  { name: "Relaciones", count: "789" },
];

// ─── Profile / Configuración ─────────────────────────────────────────────────

export const MOCK_SUPPORT_PEERS: SupportPeer[] = [
  { id: 1, name: "Elena Martínez", email: "elena.m@correo.com" },
  { id: 2, name: "Carlos Ruiz", email: "cruiz_88@servidor.es" },
];

// ─── Companion ───────────────────────────────────────────────────────────────

export const MOCK_COMPANION_ACTIVITY: CompanionActivity[] = [
  {
    mood: "calmado",
    moodEmoji: "😌",
    label: "Calmado",
    date: "Hoy 9:14 AM",
    excerpt: "Escribió en su bitácora: 'Hoy fue un día tranquilo...'",
    shared: true,
  },
  {
    mood: "ansioso",
    moodEmoji: "😟",
    label: "Ansioso",
    date: "Ayer 11:30 PM",
    excerpt: "Registro de estado emocional sin nota adjunta.",
    shared: false,
  },
  {
    mood: "feliz",
    moodEmoji: "😊",
    label: "Feliz",
    date: "Hace 2 días",
    excerpt: "Escribió en su bitácora: 'Cumplí mi meta de ejercicio...'",
    shared: true,
  },
];

export const MOCK_COMPANION_PROGRESS: CompanionProgress = {
  sobrietyDays: 42,
  plantStage: "Ciprés de Resiliencia — Estadio III",
  notesThisWeek: 7,
  messagesReceived: 3,
  consistency: 91,
  lastActiveAt: "hoy a las 9:14 AM",
  recentActivity: MOCK_COMPANION_ACTIVITY,
};

// ─── Messages ────────────────────────────────────────────────────────────────

export const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    text: "¡Hola Alex! Vi tu nota de ayer, me alegra que hayas salido a caminar. ¡Sigue así!",
    time: "Ayer 8:30 PM",
    fromMe: true,
  },
  {
    id: "m2",
    text: "Gracias Elena, significó mucho recibir tu mensaje. Hoy me siento mejor.",
    time: "Ayer 9:00 PM",
    fromMe: false,
  },
  {
    id: "m3",
    text: "¿Cómo vas hoy? Recuerda que cada día cuenta. Estoy aquí si me necesitas.",
    time: "Hoy 7:45 AM",
    fromMe: true,
  },
];

export const MOCK_MESSAGE_LIBRARY: MessageLibraryItem[] = [
  { id: 1, text: "Cada día que avanzas es una victoria. 🌱" },
  { id: 2, text: "Eres más fuerte de lo que crees." },
  { id: 3, text: "La constancia es el camino. Sigue adelante." },
  { id: 4, text: "Estoy orgulloso/a de tu esfuerzo." },
  { id: 5, text: "Hoy es un nuevo comienzo." },
  { id: 6, text: "Tu valor no se mide en días perfectos." },
];

// ─── Mi Cuenta ───────────────────────────────────────────────────────────────

export const MOCK_COMPANION_PROFILE: CompanionProfile = {
  name: "Martina García",
  email: "martina.g@correo.com",
  phone: "+34 612 345 678",
  emailAlerts: true,
  smsAlerts: false,
};

export const MOCK_SUPPORTED_USERS: SupportedUser[] = [
  {
    id: "usr_001",
    displayName: "Alex R.",
    addictionType: "Drogas",
    sobrietyDays: 42,
    status: "Activo",
  },
];
