import type { LoginCredentials, RegisterData, AuthResponse } from "@/types";
import { MOCK_USER, MOCK_COMPANION_USER } from "@/lib/mock/data";

// TODO: Replace BASE_URL with your real API endpoint
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Authenticate a user with email and password.
 * Replace the mock body with: fetch(`${BASE_URL}/auth/login`, { method: "POST", body: JSON.stringify(credentials) })
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 500)); // simulate latency
  // Distinguir rol por email: padrino@correo.com → acompañante, cualquier otro → usuario
  const user = credentials.email === MOCK_COMPANION_USER.email ? MOCK_COMPANION_USER : MOCK_USER;
  return { token: "mock-token-abc123", user };
  // --- END MOCK ---

  // REAL IMPLEMENTATION (uncomment when ready):
  // const res = await fetch(`${BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(credentials),
  // });
  // if (!res.ok) throw new Error("Credenciales incorrectas");
  // return res.json();
}

/**
 * Register a new user.
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 500));
  const user = data.role === "companion" ? MOCK_COMPANION_USER : MOCK_USER;
  return { token: "mock-token-abc123", user };
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/auth/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Error al crear la cuenta");
  // return res.json();
}

// Needed by services that require auth headers
export function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
