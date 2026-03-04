// lib/api/auth.ts
// Autenticación — POST /auth/register  y  POST /auth/login
// El token se almacena en memoria a través del cliente HTTP centralizado.

import { apiRequest, setToken } from './client';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'ADICTO' | 'PADRINO';
  addictionName?: string;
  classification?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Respuestas normalizadas (usadas por los hooks) ──────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
}

export interface AuthResult {
  accessToken: string;
  user: AuthUser;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

export async function register(payload: RegisterPayload): Promise<void> {
  await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Autentica al usuario, almacena el token en memoria y devuelve
 * los datos normalizados.
 */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  const res: any = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // El backend envuelve la respuesta en data: { accessToken, user }
  const data = res?.data ?? res;
  const token: string = data?.accessToken ?? data?.token ?? '';

  if (token) setToken(token);

  return {
    accessToken: token,
    user: {
      id: data?.user?.id ?? '',
      name: data?.user?.name ?? '',
      email: data?.user?.email ?? '',
      role: data?.user?.role ?? 'ADICTO',
    },
  };
}
