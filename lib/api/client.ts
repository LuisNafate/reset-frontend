// lib/api/client.ts
// Cliente HTTP centralizado — gestiona base URL, token JWT y errores.
// El token se guarda en memoria (nunca en localStorage).

const BASE = process.env.NEXT_PUBLIC_API_URL;

if (!BASE) {
  console.warn('⚠️ NEXT_PUBLIC_API_URL no está definida. Usando fallback localhost:3000');
}

const API_BASE = BASE ?? 'http://localhost:3000/api/v1';

console.log(`🔗 API Base configurada en: ${API_BASE}`);

let authToken: string | null = null;

export function setToken(token: string | null) {
  authToken = token;
}

export function getToken(): string | null {
  return authToken;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Error ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}
