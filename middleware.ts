import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('reset_token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/acompanante');
  
  // Rutas que NO deben ser accesibles si ya estás logueado (opcional)
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    // Guardar la URL original para redirigir después del login
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && token) {
    // Si ya tiene token, lo enviamos al dashboard (por defecto a /dashboard)
    // Nota: Aquí podrías discriminar por rol si tuvieras el rol en otra cookie
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
