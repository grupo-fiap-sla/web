import { EditIcon, TrashIcon } from '../svg';
import { Transaction } from '../types';

export const TransactionList = ({
    transactions,
    onEdit,
    setTransactions,
}: {
    transactions: Transaction[];
    onEdit: (t: Transaction) => void;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}) => {
    const handleDelete = async (id: string) => {
        // Lógica do Firebase removida
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            setTransactions((prev) => prev.filter((t) => t.id !== id));
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Transações do Mês
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {transactions.length === 0 && (
                    <p className="text-gray-500">Nenhuma transação este mês.</p>
                )}
                {transactions
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((t) => (
                        <div
                            key={t.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                <span
                                    className={`font-bold text-xl ${t.type === 'receita' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {t.type === 'receita' ? '+' : '-'}
                                </span>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {t.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            t.date + 'T00:00:00',
                                        ).toLocaleDateString('pt-BR')}{' '}
                                        | {t.category}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span
                                    className={`font-bold text-lg ${t.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {Math.abs(t.amount).toLocaleString(
                                        'pt-BR',
                                        { style: 'currency', currency: 'BRL' },
                                    )}
                                </span>
                                <button
                                    onClick={() => onEdit(t)}
                                    className="text-blue-400 hover:text-blue-700 p-1 cursor-pointer"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="text-red-400 hover:text-red-700 p-1 cursor-pointer"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
