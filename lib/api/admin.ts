import { LoginPayload, AuthBasicResult } from './auth';
import { apiRequest, setToken } from './client';

/**
 * Autentica al administrador específicamente.
 */
export async function adminLogin(payload: LoginPayload): Promise<AuthBasicResult> {
  const res = await apiRequest<any>('/admin-login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  // El backend de admin no suele requerir 2FA (según la descripción del usuario en la conversación 10d169e0)
  const token = res.accessToken;
  if (token) setToken(token);

  return {
    accessToken: token,
    user: res.user,
  };
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  padrinosCount: number;
  adictosCount: number;
  registrationsTrend: { name: string; users: number }[];
  moodStats: { name: string; value: number }[];
  relapsesHistory: { date: string; count: number }[];
}

/**
 * Obtiene las estadísticas globales para el dashboard de admin.
 */
export async function getAdminMetrics(): Promise<AdminMetrics> {
  return await apiRequest<AdminMetrics>('/admin/metrics', {
    method: 'GET',
  });
}
