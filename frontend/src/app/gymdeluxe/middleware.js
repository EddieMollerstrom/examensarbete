import { NextResponse } from 'next/server';

// Denna funktion kan anpassas för att hantera ytterligare logik
export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    console.log("Middleware körs för:", request.nextUrl.pathname);
    console.log("Token finns:", !!token);

    if (request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/gymdeluxe' ||
        request.nextUrl.pathname.startsWith('/protected')) {

        if (!token) {
            console.log("Ingen token hittad, omdirigerar till /login");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log("Token hittad, tillåter åtkomst till skyddad sida");

        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/gymdeluxe', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/gymdeluxe', '/protected/:path*']
};