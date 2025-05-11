import { cookies } from "next/headers";

export async function POST(request) {
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
        const body = await request.json();
        const { name, muscleGroupId } = body;

        if (!name || !muscleGroupId) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hämta userId via /me
        const meRes = await fetch("http://localhost:8080/me", {
            headers: {
                "Cookie": `token=${token}`,
            },
        });

        if (!meRes.ok) {
            throw new Error("Kunde inte hämta användardata");
        }

        const userData = await meRes.json();
        const userId = userData.userId;

        const res = await fetch(`http://localhost:8080/exercise?userId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`,
            },
            body: JSON.stringify({ name, muscleGroupId }),
        });

        if (!res.ok) {
            throw new Error(`Failed to create exercise`);
        }

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Error posting exercise:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
