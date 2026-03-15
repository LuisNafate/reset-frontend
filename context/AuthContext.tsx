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
import { User } from '@/types';
import { getProfile } from '@/lib/api/auth';
import { setToken } from '@/lib/api/client';
import { storageSave, storageGet, storageRemove, STORAGE_KEYS } from '@/lib/storage';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type AuthUser = User;

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
  /** Forza la recarga del perfil desde el servidor */
  refreshProfile: () => Promise<void>;
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
        const token = await storageGet(STORAGE_KEYS.TOKEN);
        if (token) {
          setToken(token);   // pone el token en memoria para las llamadas HTTP
          
          // Intentar obtener el perfil fresco del servidor
          try {
            const profile = await getProfile();
            setUser(profile);
            // Sincronizar storage con los datos frescos
            storageSave(STORAGE_KEYS.USER, JSON.stringify(profile)).catch(() => {});
          } catch (error) {
            console.error("Error al restaurar sesión desde el servidor:", error);
            // Si el servidor falla, intentar usar los datos locales como fallback
            const raw = await storageGet(STORAGE_KEYS.USER);
            if (raw) {
              setUser(JSON.parse(raw) as AuthUser);
            } else {
              // Si no hay datos locales tampoco, limpiar sesión
              clearAuth();
            }
          }
        }
      } catch {
        // Al error de storage, seguimos sin sesión
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
    setUser((prev: AuthUser | null) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      // Mantener storage sincronizado
      storageSave(STORAGE_KEYS.USER, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  const refreshProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
      storageSave(STORAGE_KEYS.USER, JSON.stringify(profile)).catch(() => {});
    } catch (err) {
      console.error("Error al refrescar perfil:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, saveAuth, clearAuth, updateUser, isRestoring, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
