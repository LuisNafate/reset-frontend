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
  users: { total: number; activeLoggers: number };
  tracking: { totalLogs: number; totalStreaks: number; activeStreaks: number };
  forum: { totalPosts: number; totalComments: number; totalReactions: number };
}

export interface EmotionalTrendsData {
  global: { avgCraving: number; avgEmotion: number; totalLogs: number };
  daily: { date: string; avgCraving: number; avgEmotion: number; logCount: number }[];
  cravingDistribution: { level: number; count: number }[];
  emotionDistribution: { level: number; count: number }[];
}

export interface EngagementCorrelation {
  forumUsers: { count: number; avgLogsPerUser: number; avgCraving: number; avgEmotion: number; avgStreakDays: number; relapseRate: number };
  nonForumUsers: { count: number; avgLogsPerUser: number; avgCraving: number; avgEmotion: number; avgStreakDays: number; relapseRate: number };
}

export interface LogsFrequencyData {
  summary: { totalLogs: number; avgLogsPerDay: number; logsWithConsumption: number; logsClean: number; uniqueUsersLogging: number };
  daily: { date: string; count: number }[];
}

export interface LogsByAddictionData {
  byClassification: { classification: string; totalUsers: number; totalLogs: number; avgLogsPerUser: number; consumedLogs: number; relapseRate: number; activeLoggers: number }[];
  byAddictionName: { addictionName: string; totalUsers: number; totalLogs: number; avgLogsPerUser: number }[];
}

export interface StreaksSummaryData {
  summary: { totalStreaks: number; activeStreaks: number; brokenStreaks: number; relapseRate: number };
  averages: { avgDaysAll: number; maxDaysAll: number; avgDaysActive: number; maxDaysActive: number };
  distribution: { "0-7": number; "8-14": number; "15-30": number; "31-60": number; "61-90": number; "90+": number };
}

export interface ReportsSummaryData {
  totalReports: number;
  byReason: { reason: string; count: number }[];
  byStatus: { status: string; count: number }[];
  byTargetType: { targetType: string; count: number }[];
}

// ─── API Functions ───────────────────────────────────────────────────────────

export async function getAdminOverview(): Promise<AdminOverview> {
  return await apiRequest<AdminOverview>('/admin/metrics/overview');
}

export async function getEmotionalTrends(startDate?: string, endDate?: string): Promise<EmotionalTrendsData> {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  return await apiRequest<EmotionalTrendsData>(`/admin/metrics/emotional-trends?${params.toString()}`);
}

export async function getEngagementCorrelation(): Promise<EngagementCorrelation> {
  return await apiRequest<EngagementCorrelation>('/admin/metrics/correlation');
}

export async function getLogsFrequency(): Promise<LogsFrequencyData> {
  return await apiRequest<LogsFrequencyData>('/admin/metrics/logs-frequency');
}

export async function getLogsByAddiction(): Promise<LogsByAddictionData> {
  return await apiRequest<LogsByAddictionData>('/admin/metrics/logs-by-addiction');
}

export async function getStreaksSummary(): Promise<StreaksSummaryData> {
  return await apiRequest<StreaksSummaryData>('/admin/metrics/streaks-summary');
}

export async function getReportsSummary(): Promise<ReportsSummaryData> {
  return await apiRequest<ReportsSummaryData>('/admin/metrics/reports-summary');
}
