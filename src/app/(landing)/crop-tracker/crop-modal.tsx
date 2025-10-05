import { FormEvent, useState } from 'react';
import { Crop, GROWTH_STAGES, guidGenerator } from './crops';

export function CropModal({
    crop,
    onSave,
    onClose,
}: {
    crop: Crop | null;
    onSave: (data: Crop) => void;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<Crop>({
        id: crop?.id || guidGenerator(),
        name: crop?.name || '',
        variety: crop?.variety || '',
        plantingDate:
            crop?.plantingDate || new Date().toISOString().split('T')[0],
        expectedHarvestDate: crop?.expectedHarvestDate || '',
        growthStage: crop?.growthStage || GROWTH_STAGES[0],
        notes: crop?.notes || '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-[#000000C0] flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            {crop ? 'Editar Plantação' : 'Nova Plantação'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nome da Cultura
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Variedade
                                </label>
                                <input
                                    type="text"
                                    name="variety"
                                    value={formData.variety}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Data de Plantio
                                </label>
                                <input
                                    type="date"
                                    name="plantingDate"
                                    value={formData.plantingDate}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Previsão de Colheita
                                </label>
                                <input
                                    type="date"
                                    name="expectedHarvestDate"
                                    value={formData.expectedHarvestDate}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Estágio de Crescimento
                                </label>
                                <select
                                    name="growthStage"
                                    value={formData.growthStage}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 cursor-pointer"
                                >
                                    {GROWTH_STAGES.map((stage) => (
                                        <option key={stage} value={stage}>
                                            {stage}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Anotações
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
