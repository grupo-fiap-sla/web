import { EditIcon, TrashIcon } from './icons';
import { useMemo } from 'react';
import { Crop } from './crops';

export function CropCard({
    crop,
    onEdit,
    onDelete,
}: {
    crop: Crop;
    onEdit: (crop: Crop) => void;
    onDelete: (id: string) => void;
}) {
    const progress = useMemo(() => {
        const start = new Date(crop.plantingDate).getTime();
        const end = new Date(crop.expectedHarvestDate).getTime();
        const now = new Date().getTime();

        if (start >= end) return 100;
        const percentage = ((now - start) / (end - start)) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    }, [crop.plantingDate, crop.expectedHarvestDate]);

    const daysRemaining = useMemo(() => {
        const end = new Date(crop.expectedHarvestDate);
        const now = new Date();

        now.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const diffTime = end.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [crop.expectedHarvestDate]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-green-600 font-semibold uppercase">
                            {crop.variety}
                        </p>
                        <h3 className="text-xl font-bold text-gray-800">
                            {crop.name}
                        </h3>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(crop)}
                            className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => onDelete(crop.id)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">
                        Estágio Atual:
                    </p>
                    <p className="text-md font-semibold text-green-700">
                        {crop.growthStage}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-gray-600">
                            Progresso para Colheita
                        </span>
                        <span
                            className={`font-bold ${daysRemaining < 0 ? 'text-red-500' : 'text-gray-700'}`}
                        >
                            {daysRemaining > 0
                                ? `${daysRemaining} dias`
                                : daysRemaining === 0
                                  ? 'Hoje!'
                                  : 'Atrasado'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`${daysRemaining > 0 ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-md h-20 overflow-y-auto">
                    {crop.notes || 'Nenhuma anotação.'}
                </p>
            </div>
            <div className="bg-gray-50 px-5 py-3 text-xs text-gray-500 flex justify-between">
                <span>
                    Plantio:{' '}
                    {new Date(crop.plantingDate).toLocaleDateString('pt-BR')}
                </span>
                <span>
                    Colheita:{' '}
                    {new Date(crop.expectedHarvestDate).toLocaleDateString(
                        'pt-BR',
                    )}
                </span>
            </div>
        </div>
    );
}
