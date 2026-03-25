import { LoginPayload, AuthBasicResult } from './auth';
import { apiRequest, setToken } from './client';

/**
 * Autentica al administrador con el flujo simplificado (sin 2FA).
 */
export async function adminLogin(payload: LoginPayload): Promise<AuthBasicResult> {
  const res = await apiRequest<any>('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  const token = res.accessToken;
  if (token) setToken(token);

  return {
    accessToken: token,
    user: res.user,
  };
}

// ─── Metrics Types ───────────────────────────────────────────────────────────

export interface AdminOverview {
  totalUsers: number;
  activeUsers24h: number;
  padrinosCount: number;
  adictosCount: number;
}

export interface EmotionalTrend {
  date: string;
  moodLevel: number;
  label: string;
}

export interface EngagementCorrelation {
  activeForoUsers: number;
  avgStreakDays: number;
}

export interface ActivityFrequency {
  timeSlot: string;
  count: number;
}

export interface AddictionPrevalence {
  name: string;
  value: number;
}

export interface HallOfFameStreak {
  userName: string;
  days: number;
  avatarUrl?: string | null;
}

export interface ForumReport {
  id: string;
  title: string;
  author: string;
  reason: string;
  status: 'PENDING' | 'REVIEWED';
}

// ─── API Functions ───────────────────────────────────────────────────────────

export async function getAdminOverview(): Promise<AdminOverview> {
  return await apiRequest<AdminOverview>('/admin/metrics/overview');
}

export async function getEmotionalTrends(startDate?: string, endDate?: string): Promise<EmotionalTrend[]> {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  return await apiRequest<EmotionalTrend[]>(`/admin/metrics/emotional-trends?${params.toString()}`);
}

export async function getEngagementCorrelation(): Promise<EngagementCorrelation> {
  return await apiRequest<EngagementCorrelation>('/admin/metrics/correlation');
}

export async function getLogsFrequency(): Promise<ActivityFrequency[]> {
  return await apiRequest<ActivityFrequency[]>('/admin/metrics/logs-frequency');
}

export async function getLogsByAddiction(): Promise<AddictionPrevalence[]> {
  return await apiRequest<AddictionPrevalence[]>('/admin/metrics/logs-by-addiction');
}

export async function getStreaksSummary(): Promise<HallOfFameStreak[]> {
  return await apiRequest<HallOfFameStreak[]>('/admin/metrics/streaks-summary');
}

export async function getReportsSummary(): Promise<ForumReport[]> {
  return await apiRequest<ForumReport[]>('/admin/metrics/reports-summary');
}
