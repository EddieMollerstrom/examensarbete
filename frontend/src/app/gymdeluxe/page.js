'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogSet from './logset';
import Set from './set';
import MuscleGroups from "@/app/gymdeluxe/musclegroups";

const GymDeluxePage = () => {
    const [loading, setLoading] = useState(true);
    const [gymData, setGymData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchGymData = async () => {
            try {
                // Först kontrollera om användaren är autentiserad
                const authCheck = await fetch('/api/auth/session', {
                    credentials: 'include'
                });

                if (!authCheck.ok) {
                    throw new Error('Du måste logga in för att se denna sida');
                }

                // Om autentiserad, hämta användarens gym-data
                setLoading(false);

            } catch (error) {
                console.error('Error:', error);
                setError(error.message);

                // Omdirigera till inloggningssidan om autentiseringsfel
                if (error.message.includes('logga in')) {
                    setTimeout(() => {
                        router.push('/');
                    }, 1500);
                }
            }
        };

        fetchGymData();
    }, [router]);

    // Visa laddningsskärm
    if (loading && !error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center p-8 max-w-md rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Laddar GymDeluxe...</h2>
                    <div className="animate-pulse flex justify-center">
                        <div className="h-4 w-4 bg-blue-500 rounded-full mx-1"></div>
                        <div className="h-4 w-4 bg-blue-500 rounded-full mx-1 animate-pulse delay-150"></div>
                        <div className="h-4 w-4 bg-blue-500 rounded-full mx-1 animate-pulse delay-300"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Visa felmeddelande om något gick fel
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center p-8 max-w-md bg-red-50 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-red-700 mb-4">Ett fel uppstod</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    {error.includes('logga in') && (
                        <p className="text-gray-600">Omdirigerar till inloggningssidan...</p>
                    )}
                </div>
            </div>
        );
    }

    // Huvudinnehåll - gymdeluxe-sidan
    return <>
        <MuscleGroups />
        {/*<div>
            <LogSet/>
            <Set/>
        </div>*/}
    </>
};

export default GymDeluxePage;