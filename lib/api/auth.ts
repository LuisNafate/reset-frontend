import { User, AddictionData } from '@/types';
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
  const res: any = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    }),
  });
  console.log("[AuthService] Login Response Raw:", res);
  const data = res?.data ?? res;
  console.log("[AuthService] Unwrapped Data:", data);

  if (data?.code === '2FA_REQUIRED' || res?.code === '2FA_REQUIRED') {
    console.log("[AuthService] 2FA Required detected");
    return {
      accessToken: '',
      user: { id: '', name: '', email: '', role: 'ADICTO', sponsorCode: null },
      code: '2FA_REQUIRED',
      mfaToken: data.mfaToken || res.mfaToken,
    };
  }

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
      sponsorCode: apiUser.sponsorCode ?? apiUser.sponsor_code ?? null,
    },
  };
}

/**
 * Verifica el código OTP para completar el login con 2FA.
 */
export async function verify2FA(payload: Verify2FAPayload): Promise<AuthBasicResult> {
  const res: any = await apiRequest('/auth/verify-2fa', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

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
      sponsorCode: apiUser.sponsorCode ?? apiUser.sponsor_code ?? null,
    },
  };
}

/**
 * Obtiene el perfil completo del usuario.
 */
export async function getProfile(): Promise<AuthProfileResult> {
  const res: any = await apiRequest('/auth/profile', {
    method: 'GET',
  });

  const data = res?.data ?? res;
  
  // Mapear la respuesta del backend al objeto User unificado
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: (data.role === 'PADRINO' ? 'PADRINO' : 'ADICTO') as 'ADICTO' | 'PADRINO',
    sponsorCode: data.sponsorCode ?? data.sponsor_code ?? null,
    avatarUrl: data.avatarUrl ?? data.avatar_url ?? null,
    createdAt: data.createdAt ?? data.created_at ?? '',
    addiction: data.addiction ? {
      custom_name: data.addiction.custom_name ?? data.addiction.customName,
      classification: data.addiction.classification,
      is_active: data.addiction.is_active ?? data.addiction.isActive,
      registered_at: data.addiction.registered_at ?? data.addiction.registeredAt,
    } : null,
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
