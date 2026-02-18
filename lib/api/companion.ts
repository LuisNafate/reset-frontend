import type { CompanionProgress, CompanionProfile, SupportedUser, Message } from "@/types";
import {
  MOCK_COMPANION_PROGRESS,
  MOCK_COMPANION_PROFILE,
  MOCK_SUPPORTED_USERS,
  MOCK_MESSAGES,
  MOCK_MESSAGE_LIBRARY,
} from "@/lib/mock/data";
import { authHeaders } from "./auth";
import type { MessageLibraryItem } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getCompanionProgress(): Promise<CompanionProgress> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_COMPANION_PROGRESS;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/progress`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener el progreso");
  // return res.json();
}

export async function getMessages(): Promise<Message[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_MESSAGES;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/messages`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener los mensajes");
  // return res.json();
}

export async function sendMessage(text: string): Promise<Message> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 300));
  return {
    id: `m${Date.now()}`,
    text,
    time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
    fromMe: true,
  };
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/messages`, {
  //   method: "POST",
  //   headers: authHeaders(),
  //   body: JSON.stringify({ text }),
  // });
  // if (!res.ok) throw new Error("Error al enviar el mensaje");
  // return res.json();
}

export async function getMessageLibrary(): Promise<MessageLibraryItem[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_MESSAGE_LIBRARY;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/library`, { headers: authHeaders() });
  // return res.json();
}

export async function getCompanionProfile(): Promise<CompanionProfile> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_COMPANION_PROFILE;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/profile`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener el perfil");
  // return res.json();
}

export async function updateCompanionProfile(data: CompanionProfile): Promise<void> {
  // --- MOCK ---
  void data;
  await new Promise((r) => setTimeout(r, 400));
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/profile`, {
  //   method: "PUT",
  //   headers: authHeaders(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Error al guardar");
}

export async function getSupportedUsers(): Promise<SupportedUser[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_SUPPORTED_USERS;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/companion/users`, { headers: authHeaders() });
  // return res.json();
}
