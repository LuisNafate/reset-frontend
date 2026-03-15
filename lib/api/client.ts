// lib/api/client.ts
// Cliente HTTP centralizado — gestiona base URL, token JWT y errores.
// El token se guarda en memoria (nunca en localStorage).

const BASE = process.env.NEXT_PUBLIC_API_URL;
if (!BASE) throw new Error('NEXT_PUBLIC_API_URL no está definida');

/** Timeout en ms para cada petición (importante en redes móviles) */
const REQUEST_TIMEOUT_MS = 15_000;

let authToken: string | null = null;

/**
 * Establece el token en memoria para peticiones síncronas y lo guarda en cookies
 * para que el Middleware de Next.js pueda leerlo.
 */
export function setToken(token: string | null) {
  authToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      document.cookie = `reset_token=${token}; path=/; max-age=2592000; samesite=lax`;
    } else {
      document.cookie = `reset_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
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
      credentials: 'include', // Requerido para device_id y 2FA
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({})) as { 
        message?: string | string[]; 
        error?: string;
        code?: string; // Nuevo: Código de error específico
      };
      
      const rawMsg = err.message;
      const msg = Array.isArray(rawMsg)
        ? rawMsg[0]
        : (rawMsg ?? '');

      const fallbacks: Record<number, string> = {
        401: 'Correo o contraseña incorrectos.',
        403: 'No tienes permiso para realizar esta acción.',
        404: 'Recurso no encontrado.',
        409: 'Ya existe un registro con esos datos.',
        422: 'Los datos enviados no son válidos.',
        429: 'Demasiados intentos. Espera un momento antes de volver a intentarlo.',
        500: 'Error interno del servidor. Inténtalo de nuevo más tarde.',
      };

      // Adjuntamos el código al objeto de error si existe
      const errorMessage = msg || fallbacks[res.status] || `Error ${res.status}`;
      const errorObject = new Error(errorMessage) as any;
      if (err.code) errorObject.code = err.code;
      
      throw errorObject;
    }

    const result = await res.json() as any;
    // Auto-unwrap la envoltura NestJS {success: true, data: ...}
    if (result && typeof result === 'object' && result.success === true && 'data' in result) {
      return result.data as T;
    }
    return result as T;
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
