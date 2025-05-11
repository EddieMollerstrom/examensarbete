import { useState } from "react";

export default function LiftModal({ name }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true); // Öppna modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Stäng modal
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 ge-white-bg-color ge-primary-color font-medium"
            >
                {name}
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4">{name}</h2>
                        <div className="flex justify-between gap-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Stäng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
