/**
 * lib/storage.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Capa de abstracción de almacenamiento clave-valor.
 *
 * ┌─────────────────┬──────────────────────────────────────────────────────┐
 * │ Contexto         │ Implementación                                      │
 * ├─────────────────┼──────────────────────────────────────────────────────┤
 * │ Web (navegador) │ localStorage — compatible, sin instalación extra     │
 * │ iOS nativo      │ @capacitor/preferences → UserDefaults (NSUserDefaults)│
 * │ Android nativo  │ @capacitor/preferences → SharedPreferences           │
 * └─────────────────┴──────────────────────────────────────────────────────┘
 *
 * La API es siempre async para unificar ambos contextos.
 * El import de @capacitor/preferences es dinámico — solo se evalúa en nativo.
 *
 * USO:
 *   import { storageSave, storageGet, storageRemove } from '@/lib/storage';
 *   await storageSave('auth_token', token);
 *   const token = await storageGet('auth_token');
 */

import { isNativePlatform } from "@/lib/platform";

// ─── Claves de almacenamiento ─────────────────────────────────────────────────

export const STORAGE_KEYS = {
  /** Token JWT de autenticación. */
  TOKEN: "auth_token",
  /** Objeto AuthUser serializado como JSON. */
  USER: "auth_user",
  /** Prefijo para los likes del foro (se concatena con userId). */
  FORO_LIKES_PREFIX: "foro_liked_",
} as const;

// ─── Funciones ────────────────────────────────────────────────────────────────

/**
 * Guarda un valor de tipo string bajo una clave.
 * En nativo usa @capacitor/preferences; en web usa localStorage.
 */
export async function storageSave(key: string, value: string): Promise<void> {
  if (isNativePlatform()) {
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.set({ key, value });
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    // cuota excedida u otro error — ignorar silenciosamente
  }
}

/**
 * Lee el valor almacenado bajo una clave.
 * Devuelve `null` si no existe o si ocurre un error.
 */
export async function storageGet(key: string): Promise<string | null> {
  if (isNativePlatform()) {
    const { Preferences } = await import("@capacitor/preferences");
    const { value } = await Preferences.get({ key });
    return value;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Elimina la entrada almacenada bajo una clave.
 */
export async function storageRemove(key: string): Promise<void> {
  if (isNativePlatform()) {
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.remove({ key });
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // ignorar
  }
}
