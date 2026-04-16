import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Verifica superficialmente si un token JWT parece válido y no está expirado.
 * NO valida la firma (eso lo hace el backend), pero evita redirecciones
 * con tokens corruptos o expirados que causarían loops.
 */
function isTokenProbablyValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decodificar el payload (parte 2) para verificar expiración
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8')
    );

    // Si tiene campo `exp`, verificar que no haya expirado
    if (typeof payload.exp === 'number') {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('reset_token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/acompanante');

  // Rutas que NO deben ser accesibles si ya estás logueado (opcional)
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Verificar si el token parece válido (formato JWT + no expirado)
  const tokenValid = token ? isTokenProbablyValid(token) : false;

  if (isProtectedRoute && !tokenValid) {
    const url = new URL('/login', request.url);
    // Guardar la URL original para redirigir después del login
    url.searchParams.set('callbackUrl', pathname);

    const response = NextResponse.redirect(url);

    // Si había una cookie inválida, eliminarla para evitar loops
    if (token && !tokenValid) {
      response.cookies.set('reset_token', '', {
        path: '/',
        maxAge: 0,
      });
    }

    return response;
  }

  if (isAuthRoute && tokenValid) {
    // Si ya tiene token válido, lo enviamos al dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si está en una ruta auth con token inválido, limpiar la cookie y dejarlo pasar
  if (isAuthRoute && token && !tokenValid) {
    const response = NextResponse.next();
    response.cookies.set('reset_token', '', {
      path: '/',
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.next();
}

// Configurar en qué rutas se debe ejecutar este middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/acompanante/:path*',
    '/login',
    '/register',
  ],
};
