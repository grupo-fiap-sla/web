'use client';
import { useState, useEffect } from 'react';
import { PlusIcon } from './svg';
import { Transaction, Crop } from './types';
import { CommodityCarousel } from './components/commodity-carousel';
import { CropMetrics } from './components/crop-metrics';
import { FinancialSummaryCards } from './components/finance-summary-cards';
import { MonthlyChart } from './components/monthly-chart';
import { TransactionList } from './components/transaction-list';
import { TransactionModal } from './components/transaction-modal';
import { getTransactions, getCrops } from './data/mock';
import { formatMonthYear } from './helper';

export default function FarmFinanceManager() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(
        new Date().toISOString().slice(0, 7),
    );

    const [crops, _] = useState<Crop[]>(getCrops);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] =
        useState<Transaction[]>(getTransactions);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    // Simula um tempo de carregamento
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // --- Funções do Modal ---
    const handleOpenModal = (transaction: Transaction | null = null) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    const changeMonth = (delta: number) => {
        setCurrentMonth((prev) => {
            const [year, month] = prev.split('-').map(Number);
            const newDate = new Date(year, month - 1 + delta, 1);
            return newDate.toISOString().slice(0, 7);
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-800">
                        Gestão Financeira
                    </h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center cursor-pointer justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                    >
                        <PlusIcon />
                        <span className="ml-2 hidden sm:inline">
                            Nova Transação
                        </span>
                    </button>
                </div>
            </header>

            <CommodityCarousel />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-8">
                <section
                    id="finance-dashboard"
                    className="bg-white p-6 rounded-xl shadow-lg"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Resumo do Mês
                        </h2>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => changeMonth(-1)}
                                className="p-2 cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                                aria-label="Mês anterior"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <span className="text-lg font-semibold w-40 text-center capitalize">
                                {formatMonthYear(currentMonth)}
                            </span>
                            <button
                                onClick={() => changeMonth(1)}
                                className="p-2 cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                                aria-label="Próximo mês"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cards de Resumo */}
                    <FinancialSummaryCards
                        transactions={transactions}
                        month={currentMonth}
                    />

                    {/* Gráfico */}
                    <div className="mt-8 h-80">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Receitas vs Despesas (Diário)
                        </h3>
                        <MonthlyChart
                            transactions={transactions}
                            month={currentMonth}
                        />
                    </div>

                    {/* Lista de Transações do Mês */}
                    <TransactionList
                        transactions={transactions.filter((t) =>
                            t.date.startsWith(currentMonth),
                        )}
                        onEdit={handleOpenModal}
                        setTransactions={setTransactions} // Passando o setter
                    />
                </section>

                <section
                    id="crop-metrics"
                    className="bg-white p-6 rounded-xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Rentabilidade por Cultivo
                    </h2>
                    <CropMetrics crops={crops} transactions={transactions} />
                </section>
            </main>

            {/* Modal de Transação */}
            {isModalOpen && (
                <TransactionModal
                    transaction={editingTransaction}
                    crops={crops}
                    setTransactions={setTransactions}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
