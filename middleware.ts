// middleware.ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

export async function middleware(request: NextRequest) {
  // Chemins qui nécessitent une authentification
  const protectedPaths = ['/profile', '/admin'];
  // Chemins réservés aux administrateurs
  const adminPaths = ['/admin'];
  
  const path = request.nextUrl.pathname;
  
  // Vérifier si le chemin est protégé
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));
  const isAdminPath = adminPaths.some(prefix => path.startsWith(prefix));
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Vérifier les permissions d'administrateur
    if (isAdminPath && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'],
};



/*
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth/jwt';

export async function middleware(request: NextRequest) {
  const session = await getSession(request.cookies.get('token')?.value);
  const { pathname } = request.nextUrl;

  // Routes protégées
  const protectedRoutes = ['/dashboard', '/profile', '/admin'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Routes d'authentification
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

*/