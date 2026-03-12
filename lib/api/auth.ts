// lib/api/auth.ts
// Autenticación — POST /auth/register  y  POST /auth/login
// Contratos exactos según documentación API v1.

import { apiRequest, setToken } from './client';

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  /** La contraseña en texto plano — el backend la hashea. */
  password: string;
  role: 'ADICTO' | 'PADRINO';
  /** Requerido si role = 'ADICTO'. Ej: "Alcohol", "Drogas", "Apuestas". */
  addictionName?: string;
  /** Categoría de la adicción. Ej: "Sustancias", "Conductual". */
  classification?: string;
}

export interface LoginPayload {
  email: string;
  /** La contraseña en texto plano — el backend la valida. */
  password: string;
}

// ─── Respuestas normalizadas (usadas por los hooks y el contexto) ─────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
  sponsorCode?: string | null;
  avatarUrl?: string | null;
  /** Nombre de la adición tal como lo entregó el backend — solo presente si role = 'ADICTO' */
  addictionType?: string | null;
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
      password: payload.password,
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
      password: payload.password,
    }),
  });

  // La API devuelve: { accessToken: string, user: UserResponse }
  const data = res?.data ?? res;
  const token: string = data?.accessToken ?? '';

  if (token) setToken(token);

  const apiUser = data?.user ?? {};

  // El backend puede devolver camelCase (sponsorCode) o snake_case (sponsor_code)
  const sponsorCode = apiUser.sponsorCode ?? (apiUser as Record<string, unknown>).sponsor_code ?? null;

  // Fallback: decodificar el JWT para extraer sponsorCode si el endpoint no lo incluye
  let resolvedSponsorCode = sponsorCode as string | null;
  if (!resolvedSponsorCode && token) {
    try {
      const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(b64)) as Record<string, unknown>;
      resolvedSponsorCode = (payload.sponsorCode ?? payload.sponsor_code ?? null) as string | null;
    } catch { /* JWT malformado — ignorar */ }
  }

  // Extraer tipo de adición del usuario (puede venir como addictionName, addiction_name, etc.)
  const addictionRaw =
    apiUser.addictionName ??
    (apiUser as Record<string, unknown>).addiction_name ??
    (apiUser as Record<string, unknown>).addictionType ??
    (apiUser as Record<string, unknown>).addiction_type ??
    null;

  // Fallback: intentar desde el JWT si no vino en el body
  let resolvedAddiction = addictionRaw as string | null;
  if (!resolvedAddiction && token) {
    try {
      const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(b64)) as Record<string, unknown>;
      resolvedAddiction = (
        payload.addictionName ??
        payload.addiction_name ??
        payload.addictionType ??
        payload.addiction_type ??
        null
      ) as string | null;
    } catch { /* JWT malformado — ignorar */ }
  }

  return {
    accessToken: token,
    user: {
      id: apiUser.id ?? '',
      name: apiUser.name ?? '',
      email: apiUser.email ?? '',
      role: (apiUser.role === 'PADRINO' ? 'PADRINO' : 'ADICTO') as 'ADICTO' | 'PADRINO',
      sponsorCode: resolvedSponsorCode,
      avatarUrl: (apiUser.avatarUrl ?? apiUser.avatar_url ?? null) as string | null,
      addictionType: resolvedAddiction,
    },
  };
}
