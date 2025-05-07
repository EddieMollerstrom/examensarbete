import { NextResponse } from 'next/server';

// Denna funktion kan anpassas för att hantera ytterligare logik
export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    console.log("Middleware körs för:", request.nextUrl.pathname);
    console.log("Token finns:", !!token);

    // Kontrollera om requestens väg börjar med /gymdeluxe eller /protected
    if (request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/gymdeluxe' ||
        request.nextUrl.pathname.startsWith('/protected')) {

        // Om ingen token finns, omdirigera till inloggningssidan
        if (!token) {
            console.log("Ingen token hittad, omdirigerar till /login");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log("Token hittad, tillåter åtkomst till skyddad sida");
        // Token finns så vi låter requesten fortsätta

        // Om användaren går till rot-URL, omdirigera till gymdeluxe
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/gymdeluxe', request.url));
        }
    }

    return NextResponse.next();
}

// Konfigurera vilka vägar middleware ska köras på
export const config = {
    matcher: ['/', '/gymdeluxe', '/protected/:path*']
};