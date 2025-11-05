import { useState, FormEvent } from 'react';
import { Crop, Transaction } from '../types';

type TransactionModalProps = {
    transaction: Transaction | null;
    crops: Crop[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    onClose: () => void;
};

export const TransactionModal = ({
    transaction,
    crops,
    setTransactions,
    onClose,
}: TransactionModalProps) => {
    const [formData, setFormData] = useState({
        description: transaction?.description || '',
        amount: Math.abs(transaction?.amount || 0),
        date: transaction?.date || new Date().toISOString().slice(0, 10),
        type: transaction?.type || 'despesa',
        category: transaction?.category || 'insumo',
        linkedCropId: transaction?.linkedCropId || '',
        notes: transaction?.notes || '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Lógica do Firebase removida

        const dataToSave = {
            ...formData,
            amount:
                formData.type === 'receita'
                    ? parseFloat(formData.amount.toString())
                    : -Math.abs(parseFloat(formData.amount.toString())),
        };

        try {
            if (transaction) {
                // Atualizar estado local
                setTransactions((prev) =>
                    prev.map((t) =>
                        t.id === transaction.id
                            ? { ...dataToSave, id: t.id }
                            : t,
                    ),
                );
            } else {
                // Adicionar ao estado local
                setTransactions((prev) => [
                    { ...dataToSave, id: crypto.randomUUID() }, // Adiciona um ID único
                    ...prev,
                ]);
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar transação local: ', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#000000BB] flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            {transaction ? 'Editar' : 'Nova'} Transação
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Tipo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Tipo
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 p-2 cursor-pointer block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="despesa">Despesa</option>
                                    <option value="receita">Receita</option>
                                </select>
                            </div>
                            {/* Descrição */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            {/* Valor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Valor
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            {/* Data */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Data
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            {/* Categoria */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Categoria
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 p-2 cursor-pointer block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="insumo">
                                        Insumo (Adubo, Semente)
                                    </option>
                                    <option value="venda">
                                        Venda de Colheita
                                    </option>
                                    <option value="transporte">
                                        Transporte
                                    </option>
                                    <option value="mao_de_obra">
                                        Mão de Obra
                                    </option>
                                    <option value="manutencao">
                                        Manutenção
                                    </option>
                                    <option value="outra">Outra</option>
                                </select>
                            </div>
                            {/* Vincular ao Cultivo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Vincular ao Cultivo (Opcional)
                                </label>
                                <select
                                    name="linkedCropId"
                                    value={formData.linkedCropId}
                                    onChange={handleChange}
                                    className="mt-1 p-2 cursor-pointer block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Nenhum</option>
                                    {crops.map((crop) => (
                                        <option key={crop.id} value={crop.id}>
                                            {crop.name} ({crop.variety})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Anotações */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Anotações
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 p-2 resize-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
