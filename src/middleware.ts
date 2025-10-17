import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Only guard the exact /admin path for admin role; non-admin -> 404
    if (pathname === '/admin' && token) {
        const roleFromToken = (token as any)?.role;
        const isAdmin = String(roleFromToken) === '1';
        if (!isAdmin) {
            return NextResponse.rewrite(new URL('/not-found', req.url));
        }
    }

    if (token) {
        if (pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (!token) {
        const publicPaths = ['/auth', '/contact', '/about'];

        const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

        if (!isPublicPath) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}