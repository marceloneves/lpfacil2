import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas que precisam de autenticação
  const protectedRoutes = ['/dashboard'];
  
  // Rotas que não devem ser acessadas quando logado
  const authRoutes = ['/login', '/signup'];

  // Verificar se está tentando acessar uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Verificar se está tentando acessar uma rota de auth
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Se não tem sessão e está tentando acessar rota protegida
  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tem sessão e está tentando acessar rota de auth
  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/templates',
    '/editor',
    '/login',
    '/signup',
  ],
};
