// lib/api/client.ts
// Cliente HTTP centralizado — gestiona base URL, token JWT y errores.
// El token se guarda en memoria (nunca en localStorage).

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://resets.app/api/v1';

/** Timeout en ms para cada petición (importante en redes móviles) */
const REQUEST_TIMEOUT_MS = 15_000;

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

  // AbortController para timeout — evita peticiones colgadas en redes móviles
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        (err as { message?: string }).message ?? `Error ${res.status}`
      );
    }

    return res.json() as Promise<T>;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('La petición tardó demasiado. Verifica tu conexión.');
    }
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
