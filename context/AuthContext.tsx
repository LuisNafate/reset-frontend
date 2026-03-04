'use client';
// context/AuthContext.tsx
// Contexto global para compartir el token JWT y los datos del usuario
// entre todos los hooks y componentes de la aplicación.
// El token se guarda SOLO en memoria (nunca en localStorage).

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { setToken } from '@/lib/api/client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADICTO' | 'PADRINO';
}

interface AuthCtx {
  user: AuthUser | null;
  saveAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const saveAuth = (token: string, u: AuthUser) => {
    setToken(token); // guarda en memoria del cliente HTTP
    setUser(u);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
