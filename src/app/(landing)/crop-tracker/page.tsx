'use client';
import { DeleteConfirmationModal } from './delete-modal';
import { LeafIcon, PlusIcon } from './icons';
import { CropModal } from './crop-modal';
import { CropCard } from './crop-card';
import { Crop, cropsMock } from './crops';
import { useState } from 'react';

export default function CropGrowthTracker() {
    const [crops, setCrops] = useState<Crop[]>(cropsMock);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
        null,
    );

    // Funções de manipulação
    const handleOpenModal = (crop: Crop | null = null) => {
        setEditingCrop(crop);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCrop(null);
    };

    const handleSaveCrop = async (formData: Crop) => {
        if (editingCrop) {
            // Atualizar
            const cropIdx = crops.findIndex(
                (crop) => crop.id == editingCrop.id,
            );

            cropsMock[cropIdx] = formData;
        } else {
            // Adicionar
            cropsMock.push(formData);
        }

        setCrops(cropsMock);
        handleCloseModal();
    };

    const handleDeleteCrop = async (cropId: string) => {
        const cropIdx = crops.findIndex((crop) => crop.id == cropId);
        cropsMock.splice(cropIdx, 1);
        console.log(cropsMock);
        setCrops(cropsMock);
        setShowDeleteConfirm(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="text-green-600">
                            <LeafIcon />
                        </div>
                        <h1 className="text-3xl font-bold text-green-800">
                            Rastreador de Cultivos
                        </h1>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105 cursor-pointer"
                    >
                        <PlusIcon />
                        <span className="ml-2 hidden sm:inline">
                            Adicionar Plantação
                        </span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {crops.length === 0 && (
                    <div className="text-center py-16 px-4 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Nenhuma plantação encontrada
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Clique em &quot;Adicionar Plantação&quot; para
                            começar a monitorar suas culturas.
                        </p>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop) => (
                        <CropCard
                            key={crop.id}
                            crop={crop}
                            onEdit={handleOpenModal}
                            onDelete={(id) => setShowDeleteConfirm(id)}
                        />
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <CropModal
                    crop={editingCrop}
                    onSave={handleSaveCrop}
                    onClose={handleCloseModal}
                />
            )}

            {showDeleteConfirm && (
                <DeleteConfirmationModal
                    onConfirm={() => handleDeleteCrop(showDeleteConfirm)}
                    onCancel={() => setShowDeleteConfirm(null)}
                />
            )}
        </div>
    );
}
