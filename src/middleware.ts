import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

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