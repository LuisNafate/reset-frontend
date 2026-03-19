import { User, AddictionData } from '@/types';
import { apiRequest, setToken } from './client';

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === 'object' && value !== null;
}

function asRecord(value: unknown): ApiRecord {
  return isRecord(value) ? value : {};
}

function unwrapData(value: unknown): unknown {
  if (!isRecord(value) || !('data' in value)) return value;
  const data = (value as { data?: unknown }).data;
  return data ?? value;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asNullableString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function parseRole(value: unknown): 'ADICTO' | 'PADRINO' {
  return value === 'PADRINO' ? 'PADRINO' : 'ADICTO';
}

function mapBasicUser(userRaw: unknown): Pick<User, 'id' | 'name' | 'email' | 'role' | 'sponsorCode'> {
  const user = asRecord(userRaw);
  return {
    id: asString(user.id),
    name: asString(user.name),
    email: asString(user.email),
    role: parseRole(user.role),
    sponsorCode: asNullableString(user.sponsorCode ?? user.sponsor_code),
  };
}

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
  /** Si es true, el backend emite una cookie de dispositivo de confianza. */
  rememberMe?: boolean;
}

// ─── Respuestas normalizadas (usadas por los hooks y el contexto) ─────────────

/**
 * Representa los datos básicos devueltos por /login
 */
export interface AuthBasicResult {
  accessToken: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'role' | 'sponsorCode'>;
  code?: string;
  mfaToken?: string;
}

export interface Verify2FAPayload {
  mfaToken: string;
  code: string;
  rememberMe?: boolean;
}

/**
 * Representa el perfil completo devuelto por /profile
 */
export type AuthProfileResult = User;

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
 * Autentica al usuario y devuelve el token y datos básicos.
 */
export async function login(payload: LoginPayload): Promise<AuthBasicResult> {
  const res = await apiRequest<unknown>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    }),
  });
  const data = asRecord(unwrapData(res));
  const root = asRecord(res);
  const responseCode = asString(data.code ?? root.code);

  if (responseCode === '2FA_REQUIRED') {
    return {
      accessToken: '',
      user: { id: '', name: '', email: '', role: 'ADICTO', sponsorCode: null },
      code: '2FA_REQUIRED',
      mfaToken: asString(data.mfaToken ?? root.mfaToken),
    };
  }

  const token = asString(data.accessToken);

  if (token) setToken(token);

  return {
    accessToken: token,
    user: mapBasicUser(data.user),
  };
}

/**
 * Verifica el código OTP para completar el login con 2FA.
 */
export async function verify2FA(payload: Verify2FAPayload): Promise<AuthBasicResult> {
  const res = await apiRequest<unknown>('/auth/verify-2fa', {
    method: 'POST',
    body: JSON.stringify({
      mfaToken: payload.mfaToken,
      code: payload.code,
      rememberMe: payload.rememberMe,
    }),
  });

  const data = asRecord(unwrapData(res));
  const token = asString(data.accessToken);

  if (token) setToken(token);

  return {
    accessToken: token,
    user: mapBasicUser(data.user),
  };
}

/**
 * Obtiene el perfil completo del usuario.
 */
export async function getProfile(): Promise<AuthProfileResult> {
  const res = await apiRequest<unknown>('/auth/profile', {
    method: 'GET',
  });

  const data = asRecord(unwrapData(res));
  const addictionRaw = asRecord(data.addiction);
  const sponsorRaw = asRecord(data.sponsor);

  const addiction: AddictionData | null = isRecord(data.addiction)
    ? {
        custom_name: asString(addictionRaw.custom_name ?? addictionRaw.customName),
        classification: asString(addictionRaw.classification),
        is_active: Boolean(addictionRaw.is_active ?? addictionRaw.isActive),
        registered_at: asString(addictionRaw.registered_at ?? addictionRaw.registeredAt),
      }
    : null;

  const sponsorshipId =
    asNullableString(sponsorRaw.sponsorshipId) ??
    asNullableString(sponsorRaw.sponsorship_id) ??
    undefined;

  const sponsor = isRecord(data.sponsor)
    ? {
        id: asString(sponsorRaw.id),
        name: asString(sponsorRaw.name),
        email: asString(sponsorRaw.email),
        avatarUrl: asNullableString(sponsorRaw.avatarUrl ?? sponsorRaw.avatar_url),
        sponsorshipId,
        status: sponsorRaw.status === 'PENDING' ? 'PENDING' as const : 'ACTIVE' as const,
      }
    : null;
  
  // Mapear la respuesta del backend al objeto User unificado
  return {
    id: asString(data.id),
    name: asString(data.name),
    email: asString(data.email),
    role: parseRole(data.role),
    sponsorCode: asNullableString(data.sponsorCode ?? data.sponsor_code),
    avatarUrl: asNullableString(data.avatarUrl ?? data.avatar_url),
    createdAt: asString(data.createdAt ?? data.created_at),
    addiction,
    sponsor,
  };
}

/**
 * Verifica el correo electrónico mediante un token.
 */
export async function verifyEmail(token: string): Promise<void> {
  await apiRequest('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

/**
 * Solicita un enlace de recuperación de contraseña.
 */
export async function forgotPassword(email: string): Promise<void> {
  await apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Restablece la contraseña usando un token.
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

/**
 * Realiza el borrado lógico de la cuenta del usuario.
 */
export async function deleteAccount(): Promise<void> {
  await apiRequest('/auth/account', {
    method: 'DELETE',
  });
}

/**
 * Permite a un Padrino reportar un relapso y volver a ser Adicto.
 * @param addictionName Nombre de la adicción.
 * @param classification Categoría de la adicción (opcional).
 */
export async function relapse(addictionName: string, classification?: string): Promise<{ message: string; role: string }> {
  const res = await apiRequest<unknown>('/auth/relapse', {
    method: 'POST',
    body: JSON.stringify({ addictionName, classification }),
  });
  const data = asRecord(unwrapData(res));
  return {
    message: asString(data.message, 'Relapso reportado.'),
    role: asString(data.role),
  };
}
/**
 * Reactiva una cuenta desactivada.
 */
export async function reactivate(payload: LoginPayload): Promise<{ message: string }> {
  const res = await apiRequest<unknown>('/auth/reactivate', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
  const data = asRecord(unwrapData(res));
  return {
    message: asString(data.message, 'Cuenta reactivada.'),
  };
}
