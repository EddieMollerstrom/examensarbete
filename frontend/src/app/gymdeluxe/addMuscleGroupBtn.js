"use client";
import { useState } from "react";
import InputField from "@/app/_components/input";

export default function AddMuscleGroupBtn({ muscleGroupId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [muscleGroupName, setMuscleGroupName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (!muscleGroupId) {
            console.error("Muscle Group ID is missing");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/exercise/addexercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: muscleGroupName,
                    muscleGroupId: muscleGroupId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Fel vid sparning:", data.error);
                return;
            }


            setIsModalOpen(false);
            setMuscleGroupName("");
        } catch (error) {
            console.error("Något gick fel:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <button
                className="ge-accent-bg-color ge-white-color hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                Add Exercise
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Add a Muscle Group</h2>
                        <InputField
                            customHintText={"Name"}
                            value={muscleGroupName}
                            onChange={(e) => setMuscleGroupName(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="mt-4 px-4 py-2 ge-accent-bg-color text-white rounded hover:cursor-pointer"
                                onClick={handleSave}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
