export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const exerciseId = searchParams.get('exerciseId');
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if (!exerciseId) {
        return new Response(JSON.stringify({ error: 'Missing exerciseId parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const userRes = await fetch('http://localhost:8080/me', {
            credentials: 'include',
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (!userRes.ok) {
            throw new Error('Invalid session');
        }

        const userData = await userRes.json();
        const userId = userData.userId;

        const liftsRes = await fetch(`http://localhost:8080/lift/user/${userId}/exercise/${exerciseId}`, {
            credentials: 'include',
            headers: {
                'Cookie': `token=${token}`
            }
        });

        if (!liftsRes.ok) {
            throw new Error('Failed to fetch lifts');
        }

        const lifts = await liftsRes.json();

        lifts.sort((a, b) => new Date(b.date) - new Date(a.date));

        return new Response(JSON.stringify(lifts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching user lifts:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch user lifts',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}