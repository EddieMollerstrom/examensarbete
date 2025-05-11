'use client'

import { useEffect, useState } from "react";
import AddMuscleGroupBtn from "@/app/gymdeluxe/addMuscleGroupBtn";
import LiftModal from "@/app/gymdeluxe/liftmodal";

export default function MuscleGroups() {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClick = (group) => {
        setSelectedGroup(group);
    };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/auth/session');

                if (!response.ok) {
                    throw new Error('Kunde inte hämta användardata');
                }

                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!userData) return;

        const fetchMuscleGroups = async () => {
            try {
                const res = await fetch("http://localhost:8080/muscleGroup", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Kunde inte hämta muskelgrupper");
                }

                const data = await res.json();
                setMuscleGroups(data);

                if (data.length > 0 && !selectedGroup) {
                    setSelectedGroup(data[0]);
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchMuscleGroups();
    }, [userData]);

    useEffect(() => {
        if (!userData || !selectedGroup) return;

        const fetchExercises = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/exercise?muscleGroupId=${selectedGroup.id}&userId=${userData.userId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error("Kunde inte hämta övningar");
                }

                const data = await res.json();
                setExercises(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchExercises();
    }, [selectedGroup, userData]);

    if (loading) return <p>Laddar användardata...</p>;
    if (error) return <p>Ett fel uppstod: {error}</p>;
    if (!userData?.authenticated) return <p>Du är inte inloggad</p>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                {muscleGroups.map((group) => (
                    <button
                        key={group.id}
                        onClick={() => handleClick(group)}
                        type="button"
                        className={`text-base transition-colors duration-200 hover:cursor-pointer
                            ${selectedGroup && selectedGroup.id === group.id ? "ge-accent-color" : "ge-white-color"}`}
                    >
                        {group.name}
                    </button>
                ))}
            </div>


            <div className="mt-4">
                <div className="flex flex-col gap-3">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="p-4 ge-white-bg-color rounded-lg flex justify-center">
                            <LiftModal name={exercise.name} />
                        </div>
                    ))}
                </div>
                {selectedGroup && (
                    <AddMuscleGroupBtn muscleGroupId={selectedGroup.id} />
                )}
                {exercises.length === 0 && selectedGroup && (
                    <p>Inga övningar hittades för denna muskelgrupp.</p>
                )}
            </div>
        </div>
    );
}