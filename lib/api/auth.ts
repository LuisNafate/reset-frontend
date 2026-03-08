// lib/api/auth.ts
// Autenticación — POST /auth/register  y  POST /auth/login
// Contratos exactos según documentación API v1.

import { apiRequest, setToken } from './client';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  /** La contraseña en texto plano — el backend la hashea. Campo llamado passwordHash por contrato. */
  passwordHash: string;
  role: 'ADICTO' | 'PADRINO';
  /** Requerido si role = 'ADICTO'. Ej: "Alcohol", "Drogas", "Apuestas". */
  addictionName?: string;
  /** Categoría de la adicción. Ej: "Sustancias", "Conductual". */
  classification?: string;
}

export interface LoginPayload {
  email: string;
  /** La contraseña en texto plano — el backend la valida. Campo llamado passwordHash por contrato. */
  passwordHash: string;
}

// ─── Respuestas normalizadas (usadas por los hooks y el contexto) ─────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
  sponsorCode?: string | null;
}

export interface AuthResult {
  accessToken: string;
  user: AuthUser;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/**
 * Registra un nuevo usuario.
 * Para rol ADICTO, se deben enviar addictionName y (opcionalmente) classification.
 */
export async function register(payload: RegisterPayload): Promise<void> {
  await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      passwordHash: payload.passwordHash,
      role: payload.role,
      ...(payload.addictionName ? { addictionName: payload.addictionName } : {}),
      ...(payload.classification ? { classification: payload.classification } : {}),
    }),
  });
}

/**
 * Autentica al usuario, almacena el token en memoria y devuelve
 * los datos normalizados según el contrato de la API.
 */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  const res: any = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      passwordHash: payload.passwordHash,
    }),
  });

  // La API devuelve: { accessToken: string, user: UserResponse }
  const data = res?.data ?? res;
  const token: string = data?.accessToken ?? '';

  if (token) setToken(token);

  const apiUser = data?.user ?? {};

  return {
    accessToken: token,
    user: {
      id: apiUser.id ?? '',
      name: apiUser.name ?? '',
      email: apiUser.email ?? '',
      role: (apiUser.role === 'PADRINO' ? 'PADRINO' : 'ADICTO') as 'ADICTO' | 'PADRINO',
      sponsorCode: apiUser.sponsorCode ?? null,
    },
  };
}
