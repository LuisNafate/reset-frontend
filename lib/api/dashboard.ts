import type { UserProgress } from "@/types";
import { MOCK_PROGRESS } from "@/lib/mock/data";
import { authHeaders } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Fetch the authenticated user's sobriety progress */
export async function getProgress(): Promise<UserProgress> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_PROGRESS;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/dashboard/progress`, {
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Error al obtener el progreso");
  // return res.json();
}
