import type { SupportPeer, ProfileUpdateData } from "@/types";
import { MOCK_SUPPORT_PEERS, MOCK_USER } from "@/lib/mock/data";
import { authHeaders } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getProfile(): Promise<{ username: string; addictionType: string }> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 200));
  return { username: MOCK_USER.name, addictionType: MOCK_USER.addictionType };
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/profile`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener el perfil");
  // return res.json();
}

export async function updateProfile(data: ProfileUpdateData): Promise<void> {
  // --- MOCK ---
  void data;
  await new Promise((r) => setTimeout(r, 400));
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/profile`, {
  //   method: "PUT",
  //   headers: authHeaders(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Error al actualizar el perfil");
}

export async function getSupportPeers(): Promise<SupportPeer[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_SUPPORT_PEERS;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/profile/peers`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener los pares");
  // return res.json();
}

export async function removeSupportPeer(peerId: number): Promise<void> {
  // --- MOCK ---
  void peerId;
  await new Promise((r) => setTimeout(r, 200));
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/profile/peers/${peerId}`, {
  //   method: "DELETE",
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Error al eliminar el par");
}

export async function updateEmergencyNotifs(enabled: boolean): Promise<void> {
  // --- MOCK ---
  void enabled;
  await new Promise((r) => setTimeout(r, 200));
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // await fetch(`${BASE_URL}/profile/emergency-notifs`, {
  //   method: "PUT",
  //   headers: authHeaders(),
  //   body: JSON.stringify({ enabled }),
  // });
}
