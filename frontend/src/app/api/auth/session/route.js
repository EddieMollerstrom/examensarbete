export async function GET(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const res = await fetch('http://localhost:8080/me', {
            credentials: 'include',
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (!res.ok) {
            throw new Error('Invalid session');
        }

        const userData = await res.json();

        return new Response(JSON.stringify({
            authenticated: true,
            email: userData.email,
            userId: userData.userId,  // Inkludera userId här!
            username: userData.username || userData.email, // Använd username om det finns, annars email
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error validating session:', error);

        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}