'use client';
// context/AuthContext.tsx
// Contexto global para compartir el token JWT y los datos del usuario
// entre todos los hooks y componentes de la aplicación.
//
// ESTRATEGIA DE PERSISTENCIA:
//   • En web:     localStorage  (comportamiento anterior, sin cambios visibles)
//   • En nativo:  @capacitor/preferences → UserDefaults (iOS) / SharedPreferences (Android)
//
// Esto resuelve el problema crítico en móvil: al cerrar la app y volver a abrirla,
// el token se restaura de almacenamiento y el usuario no tiene que hacer login de nuevo.
//
// El token sigue guardándose en memoria (authToken en client.ts) para acceso síncrono.
// El almacenamiento persistente se usa solo al arrancar o al cerrar sesión.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { setToken } from '@/lib/api/client';
import { storageSave, storageGet, storageRemove, STORAGE_KEYS } from '@/lib/storage';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
  /** Código de 8 caracteres del padrino — solo presente si role = 'PADRINO' */
  sponsorCode?: string | null;
}

interface AuthCtx {
  user: AuthUser | null;
  saveAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
  /** Actualiza campos del usuario en memoria (ej: tras editar nombre). */
  updateUser: (partial: Partial<AuthUser>) => void;
  /**
   * true mientras se intenta restaurar la sesión guardada al arrancar la app.
   * Úsalo en el layout raíz para mostrar una pantalla de carga inicial y evitar
   * un flash de "no autenticado" en móvil cuando el token sí existe en storage.
   */
  isRestoring: boolean;
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // ── Restaurar sesión al arrancar ──────────────────────────────────────────
  // Se ejecuta una sola vez al montar el Provider (début de la app).
  // Si existe un token guardado, lo restaura en memoria y recupera los datos
  // del usuario para que la app no pida login de nuevo tras reiniciarse.
  useEffect(() => {
    async function restoreSession() {
      try {
        const [token, raw] = await Promise.all([
          storageGet(STORAGE_KEYS.TOKEN),
          storageGet(STORAGE_KEYS.USER),
        ]);
        if (token && raw) {
          const parsedUser = JSON.parse(raw) as AuthUser;

          // Sesión antigua: si el PADRINO no tiene sponsorCode guardado,
          // intentar extraerlo del JWT (payload público — no requiere red).
          if (parsedUser.role === 'PADRINO' && !parsedUser.sponsorCode) {
            try {
              const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
              const payload = JSON.parse(atob(b64)) as Record<string, unknown>;
              const extracted = (payload.sponsorCode ?? payload.sponsor_code ?? null) as string | null;
              if (extracted) {
                parsedUser.sponsorCode = extracted;
                // Actualizar storage con el dato recuperado
                storageSave(STORAGE_KEYS.USER, JSON.stringify(parsedUser)).catch(() => {});
              }
            } catch { /* JWT malformado — ignorar */ }
          }

          setToken(token);   // pone el token en memoria para las llamadas HTTP
          setUser(parsedUser);
        }
      } catch {
        // Si el storage está corrupto, seguir sin sesión (pedirá login)
      } finally {
        setIsRestoring(false);
      }
    }
    restoreSession();
  }, []);

  // ── Guardar ───────────────────────────────────────────────────────────────
  const saveAuth = (token: string, u: AuthUser) => {
    setToken(token);
    setUser(u);
    // Persistir de forma asíncrona (fire-and-forget).
    // Si falla (p.ej. almacenamiento lleno), la sesión en memoria sigue activa.
    storageSave(STORAGE_KEYS.TOKEN, token).catch(() => {});
    storageSave(STORAGE_KEYS.USER, JSON.stringify(u)).catch(() => {});
  };

  // ── Limpiar ───────────────────────────────────────────────────────────────
  const clearAuth = () => {
    setToken(null);
    setUser(null);
    storageRemove(STORAGE_KEYS.TOKEN).catch(() => {});
    storageRemove(STORAGE_KEYS.USER).catch(() => {});
  };

  // ── Actualización parcial del usuario ────────────────────────────────────
  const updateUser = (partial: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      // Mantener storage sincronizado
      storageSave(STORAGE_KEYS.USER, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, saveAuth, clearAuth, updateUser, isRestoring }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
