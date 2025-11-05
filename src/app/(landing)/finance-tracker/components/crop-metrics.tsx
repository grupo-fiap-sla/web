import { Crop, CropMetric, Transaction } from '../types';
import { useMemo } from 'react';

type CropMetricsProps = {
    transactions: Transaction[];
    crops: Crop[];
};

export function CropMetrics({ transactions, crops }: CropMetricsProps) {
    const metrics = useMemo((): CropMetric[] => {
        return crops.map((crop) => {
            const cropTransactions = transactions.filter(
                (t) => t.linkedCropId === crop.id,
            );

            const totalCost = cropTransactions
                .filter((t) => t.type === 'despesa')
                .reduce((sum, t) => sum + t.amount, 0); // Já é negativo

            const totalRevenue = cropTransactions
                .filter((t) => t.type === 'receita')
                .reduce((sum, t) => sum + t.amount, 0);

            const netProfit = totalRevenue + totalCost; // (ex: 5000 + (-2000))
            const profitPerHectare =
                crop.area > 0 ? netProfit / crop.area : netProfit;

            return {
                cropId: crop.id,
                cropName: `${crop.name} (${crop.variety})`,
                totalCost: Math.abs(totalCost),
                totalRevenue,
                netProfit,
                profitPerHectare,
            };
        });
    }, [crops, transactions]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.length === 0 && (
                <p className="text-gray-500 md:col-span-3">
                    Nenhum cultivo encontrado. Adicione cultivos no
                    &apos;Rastreador de Cultivos&apos; e vincule transações a
                    eles.
                </p>
            )}
            {metrics.map((metric) => (
                <div
                    key={metric.cropId}
                    className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm"
                >
                    <h4 className="text-lg font-bold text-green-800">
                        {metric.cropName}
                    </h4>
                    <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Custo Total:</span>
                            <span className="font-medium text-red-600">
                                {metric.totalCost.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Receita Total:
                            </span>
                            <span className="font-medium text-green-600">
                                {metric.totalRevenue.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between border-t pt-1 mt-1 border-gray-300">
                            <span className="font-bold text-gray-800">
                                Lucro Líquido:
                            </span>
                            <span
                                className={`font-bold ${metric.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}
                            >
                                {metric.netProfit.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span className="font-medium">Rentabilidade:</span>
                            <span className="font-medium">
                                {metric.profitPerHectare.toLocaleString(
                                    'pt-BR',
                                    { style: 'currency', currency: 'BRL' },
                                )}{' '}
                                / hectare
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
