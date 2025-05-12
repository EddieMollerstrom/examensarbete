import { useState, useEffect } from "react";
import InputField from "@/app/_components/input";
import ShowLift from "@/app/gymdeluxe/showLift";
import LineChartComponent from "@/app/gymdeluxe/chart";

export default function LiftModal({ name, exerciseId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [recentLifts, setRecentLifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        fetchRecentLifts();
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const fetchRecentLifts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/gym/user-lifts?exerciseId=${exerciseId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch recent lifts');
            }

            const data = await response.json();
            setRecentLifts(data.slice(0, 5)); // Visa bara de 5 senaste
        } catch (error) {
            console.error('Error fetching recent lifts:', error);
            setError('Failed to load recent lifts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!weight || !reps) {
            setError("Both weight and reps are required");
            return;
        }

        try {
            setIsLoading(true);
            await createLift(exerciseId, parseFloat(weight), parseInt(reps, 10));

            setWeight("");
            setReps("");
            fetchRecentLifts();
        } catch (error) {
            setError(error.message || "Failed to save lift");
        } finally {
            setIsLoading(false);
        }
    };

    async function createLift(exerciseId, weight, reps) {
        try {
            const response = await fetch('/api/gym/user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exerciseId,
                    weight,
                    reps
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to create lift');
            }

            const data = await response.json();
            console.log('Lift created:', data);
            return data;
        } catch (error) {
            console.error('Error creating lift:', error);
            throw error;
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 ge-white-bg-color ge-primary-color font-medium rounded hover:opacity-90 transition-opacity"
            >
                {name}
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 ge-primary-bg-color bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">{name}</h2>

                        {recentLifts.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-md font-medium mb-2 text-center">Viktprogression</h3>
                                <LineChartComponent recentLifts={recentLifts} exerciseName={name} />
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mb-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <InputField
                                        customHintText="Kg"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        required
                                    />
                                    <InputField
                                        customHintText="Reps"
                                        value={reps}
                                        onChange={(e) => setReps(e.target.value)}
                                        type="number"
                                        min="1"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`self-center px-6 py-2 ge-accent-bg-color text-white rounded hover:bg-green-600 transition-colors ${
                                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>

                        <div className="mb-6">
                            <h3 className="text-md font-medium mb-2">Latest sets:</h3>
                            <div className="flex flex-col gap-2">
                                {isLoading && recentLifts.length === 0 ? (
                                    <p className="text-center text-gray-500">Loading recent lifts...</p>
                                ) : recentLifts.length > 0 ? (
                                    recentLifts.map((lift, index) => (
                                        <ShowLift
                                            key={lift.id || index}
                                            weight={lift.weight}
                                            reps={lift.reps}
                                            date={formatDate(lift.date)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No lifts recorded yet</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}