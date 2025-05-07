'use client'

import { useEffect, useState } from "react";

export default function MuscleGroups() {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("CHEST")

    const handleClick = (groupName) => {
        setSelectedGroup(groupName);
    };
    
    useEffect(() => {
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
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchMuscleGroups();
    }, []);

    return (
            <div className="flex flex-wrap gap-4">
                {muscleGroups.map((group, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(group.name)}
                        type="button"
                        className={`text-base transition-colors duration-200
                            ${selectedGroup === group.name ? "ge-accent-color" : "ge-white-color"}`}
                    >
                        {group.name}
                    </button>
                ))}
            </div>
    );
}
