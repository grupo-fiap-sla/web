import { TrendingUpIcon, TrendingDownIcon, DollarIcon } from '../svg';
import { useMemo } from 'react';
import { Transaction } from '../types';

type FinancialSummaryCardsProps = {
    transactions: Transaction[];
    month: string;
};

export function FinancialSummaryCards({
    transactions,
    month,
}: FinancialSummaryCardsProps) {
    const { revenue, expenses, balance } = useMemo(() => {
        const monthlyTransactions = transactions.filter((t) =>
            t.date.startsWith(month),
        );

        const revenue = monthlyTransactions
            .filter((t) => t.type === 'receita')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthlyTransactions
            .filter((t) => t.type === 'despesa')
            .reduce((sum, t) => sum + t.amount, 0); // valores já são negativos

        const balance = monthlyTransactions.reduce(
            (sum, t) => sum + t.amount,
            0,
        );

        return { revenue, expenses, balance };
    }, [transactions, month]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-full text-white">
                        <TrendingUpIcon />
                    </div>
                    <div>
                        <p className="text-sm text-green-800">Receita Mensal</p>
                        <p className="text-2xl font-bold text-green-900">
                            {revenue.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-red-100 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500 rounded-full text-white">
                        <TrendingDownIcon />
                    </div>
                    <div>
                        <p className="text-sm text-red-800">Despesa Mensal</p>
                        <p className="text-2xl font-bold text-red-900">
                            {Math.abs(expenses).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-full text-white">
                        <DollarIcon />
                    </div>
                    <div>
                        <p className="text-sm text-blue-800">Saldo Mensal</p>
                        <p
                            className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-900' : 'text-red-900'}`}
                        >
                            {balance.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
