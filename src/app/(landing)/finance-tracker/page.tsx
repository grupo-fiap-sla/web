import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    FormEvent,
} from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    Timestamp,
    where,
    orderBy,
    Firestore,
} from 'firebase/firestore';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
} from 'recharts';
import {
    CornIcon,
    SoyIcon,
    CoffeeIcon,
    CottonIcon,
    PlusIcon,
    ArrowUp,
    ArrowDown,
    TrendingUpIcon,
    TrendingDownIcon,
    DollarIcon,
    EditIcon,
    TrashIcon,
} from './svg';
import {
    Commodity,
    Transaction,
    Crop,
    InventoryItem,
    CropMetric,
} from './types';

// --- Configuração do Firebase ---
const appId =
    typeof __app_id !== 'undefined' ? __app_id : 'default-finance-manager';
const firebaseConfig =
    typeof __firebase_config !== 'undefined'
        ? JSON.parse(__firebase_config)
        : {};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Hook Simulado para Commodities (Req. 1) ---
const useSimulatedCommodities = () => {
    const initialCommodities: Commodity[] = [
        {
            id: 'corn',
            name: 'Milho',
            price: 58.5,
            change: 0.45,
            unit: 'R$/saca 60kg',
            icon: <CornIcon />,
        },
        {
            id: 'soy',
            name: 'Soja',
            price: 122.3,
            change: -0.21,
            unit: 'R$/saca 60kg',
            icon: <SoyIcon />,
        },
        {
            id: 'coffee',
            name: 'Café Arábica',
            price: 1050.0,
            change: 1.12,
            unit: 'R$/saca 60kg',
            icon: <CoffeeIcon />,
        },
        {
            id: 'cotton',
            name: 'Algodão',
            price: 380.5,
            change: 0.05,
            unit: 'R$/@ 15kg',
            icon: <CottonIcon />,
        },
    ];

    const [commodities, setCommodities] =
        useState<Commodity[]>(initialCommodities);

    useEffect(() => {
        const interval = setInterval(() => {
            setCommodities((prev) =>
                prev.map((item) => {
                    const change = (Math.random() - 0.5) * 0.5; // Pequena variação
                    return {
                        ...item,
                        price: Math.max(0, item.price + change),
                        change: (change / item.price) * 100,
                    };
                }),
            );
        }, 15000); // Atualiza a cada 15 segundos

        return () => clearInterval(interval);
    }, []);

    return commodities;
};

// --- Componente Principal: Gestor Financeiro ---
export default function FarmFinanceManager() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Estados financeiros
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentMonth, setCurrentMonth] = useState(
        new Date().toISOString().slice(0, 7),
    ); // Formato 'YYYY-MM'

    // Estados de integração
    const [crops, setCrops] = useState<Crop[]>([]);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    // Estado do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    const commodities = useSimulatedCommodities();

    // --- Efeitos de Autenticação e Carregamento de Dados ---
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                signInAnonymously(auth).catch((error) =>
                    console.error('Erro no login anônimo:', error),
                );
            }
            setIsLoading(false);
        });
    }, []);

    const getCollectionPath = (collectionName: string) => {
        if (!user) return null;
        return `/artifacts/${appId}/users/${user.uid}/${collectionName}`;
    };

    // Carregar transações
    useEffect(() => {
        const path = getCollectionPath('transactions');
        if (!path) return;

        const q = query(collection(db, path));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() }) as Transaction,
                );
                setTransactions(data);
            },
            (error) => console.error('Erro ao buscar transações:', error),
        );

        return () => unsubscribe();
    }, [user]);

    // Carregar cultivos (do CropTracker)
    useEffect(() => {
        const path = getCollectionPath('crops');
        if (!path) return;

        const q = query(collection(db, path));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                // Garante que 'area' exista para os cálculos
                const data = snapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            area: 1, // Default de 1 hectare se não existir
                            ...doc.data(),
                        }) as Crop,
                );
                setCrops(data);
            },
            (error) => console.error('Erro ao buscar cultivos:', error),
        );

        return () => unsubscribe();
    }, [user]);

    // Carregar inventário (supõe uma coleção 'inventory')
    useEffect(() => {
        const path = getCollectionPath('inventory');
        if (!path) return;

        const q = query(collection(db, path));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() }) as InventoryItem,
                );
                setInventory(data);
            },
            (error) => console.error('Erro ao buscar inventário:', error),
        );

        return () => unsubscribe();
    }, [user]);

    // --- Funções de Abertura/Fechamento do Modal ---
    const handleOpenModal = (transaction: Transaction | null = null) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    // --- Cálculos e Métricas (Req. 2 e 3) ---
    const financialSummary = useMemo(() => {
        const filtered = transactions.filter((t) =>
            t.date.startsWith(currentMonth),
        );

        const monthlyRevenue = filtered
            .filter((t) => t.type === 'receita')
            .reduce((sum, t) => sum + t.amount, 0);

        const monthlyExpenses = filtered
            .filter((t) => t.type === 'despesa')
            .reduce((sum, t) => sum + t.amount, 0); // valores já são negativos

        const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

        return { monthlyRevenue, monthlyExpenses, totalBalance };
    }, [transactions, currentMonth]);

    const chartData = useMemo(() => {
        const filtered = transactions.filter((t) =>
            t.date.startsWith(currentMonth),
        );
        const daysInMonth = new Date(
            parseInt(currentMonth.split('-')[0]),
            parseInt(currentMonth.split('-')[1]),
            0,
        ).getDate();

        const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, '0');
            const date = `${currentMonth}-${day}`;

            const receitas = filtered
                .filter((t) => t.type === 'receita' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);

            const despesas = filtered
                .filter((t) => t.type === 'despesa' && t.date === date)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0); // Gráfico com valor positivo

            return { name: day, receitas, despesas };
        });

        return dailyData;
    }, [transactions, currentMonth]);

    const cropMetrics = useMemo((): CropMetric[] => {
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Carregando...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Erro de autenticação.</p>
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
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                    >
                        <PlusIcon />
                        <span className="ml-2 hidden sm:inline">
                            Nova Transação
                        </span>
                    </button>
                </div>
            </header>

            {/* 1. Carrossel de Commodities */}
            <CommodityCarousel commodities={commodities} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-8">
                {/* 2. Gestão Financeira */}
                <section
                    id="finance-dashboard"
                    className="bg-white p-6 rounded-xl shadow-lg"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Resumo do Mês
                        </h2>
                        <input
                            type="month"
                            value={currentMonth}
                            onChange={(e) => setCurrentMonth(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm text-lg"
                        />
                    </div>

                    {/* Cards de Resumo */}
                    <FinancialSummaryCards summary={financialSummary} />

                    {/* Gráfico */}
                    <div className="mt-8 h-80">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Receitas vs Despesas (Diário)
                        </h3>
                        <MonthlyChart data={chartData} />
                    </div>

                    {/* Lista de Transações do Mês */}
                    <TransactionList
                        transactions={transactions.filter((t) =>
                            t.date.startsWith(currentMonth),
                        )}
                        onEdit={handleOpenModal}
                        dbPath={getCollectionPath('transactions') || ''}
                    />
                </section>

                {/* 3. Métricas de Cultivos */}
                <section
                    id="crop-metrics"
                    className="bg-white p-6 rounded-xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Rentabilidade por Cultivo
                    </h2>
                    <CropMetrics metrics={cropMetrics} />
                </section>
            </main>

            {/* Modal de Transação */}
            {isModalOpen && (
                <TransactionModal
                    transaction={editingTransaction}
                    crops={crops}
                    dbPath={getCollectionPath('transactions') || ''}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

// --- Componentes Filhos ---

/** 1. Carrossel de Commodities */
const CommodityCarousel = ({ commodities }: { commodities: Commodity[] }) => (
    <div className="bg-gray-800 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
            {commodities.concat(commodities).map(
                (
                    item,
                    index, // Duplicar para loop contínuo
                ) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="flex-shrink-0 mx-6 p-4 bg-gray-700 rounded-lg w-60"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl text-yellow-400">
                                {item.icon}
                            </span>
                            <h3 className="text-lg font-bold text-white">
                                {item.name}
                            </h3>
                        </div>
                        <p className="text-2xl font-semibold text-white">
                            {item.price.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                        <div className="flex justify-between items-center text-sm mt-1">
                            <span className="text-gray-400">{item.unit}</span>
                            <span
                                className={`font-bold flex items-center ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                            >
                                {item.change >= 0 ? <ArrowUp /> : <ArrowDown />}
                                {item.change.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                ),
            )}
        </div>
        <style>{`
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
    </div>
);

/** 2a. Cards de Resumo Financeiro */
const FinancialSummaryCards = ({
    summary,
}: {
    summary: {
        monthlyRevenue: number;
        monthlyExpenses: number;
        totalBalance: number;
    };
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-full text-white">
                    <TrendingUpIcon />
                </div>
                <div>
                    <p className="text-sm text-green-800">Receita Mensal</p>
                    <p className="text-2xl font-bold text-green-900">
                        {summary.monthlyRevenue.toLocaleString('pt-BR', {
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
                        {Math.abs(summary.monthlyExpenses).toLocaleString(
                            'pt-BR',
                            { style: 'currency', currency: 'BRL' },
                        )}
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
                    <p className="text-sm text-blue-800">Saldo Geral</p>
                    <p className="text-2xl font-bold text-blue-900">
                        {summary.totalBalance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

/** 2b. Gráfico Mensal */
const MonthlyChart = ({
    data,
}: {
    data: { name: string; receitas: number; despesas: number }[];
}) => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} tickFormatter={(val) => `R$${val / 1000}k`} />
            <Tooltip
                formatter={(value: number) =>
                    value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })
                }
            />
            <Legend />
            <Bar dataKey="receitas" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

/** 2c. Lista de Transações */
const TransactionList = ({
    transactions,
    onEdit,
    dbPath,
}: {
    transactions: Transaction[];
    onEdit: (t: Transaction) => void;
    dbPath: string;
}) => {
    const handleDelete = async (id: string) => {
        if (!dbPath) return;
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            try {
                await deleteDoc(doc(db, dbPath, id));
            } catch (error) {
                console.error('Erro ao excluir transação: ', error);
            }
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
                                    className="text-blue-500 hover:text-blue-700 p-1"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
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

/** 2d. Modal de Transação */
const TransactionModal = ({
    transaction,
    crops,
    dbPath,
    onClose,
}: {
    transaction: Transaction | null;
    crops: Crop[];
    dbPath: string;
    onClose: () => void;
}) => {
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
        if (!dbPath) return;

        const dataToSave = {
            ...formData,
            amount:
                formData.type === 'receita'
                    ? parseFloat(formData.amount.toString())
                    : -Math.abs(parseFloat(formData.amount.toString())),
        };

        try {
            if (transaction) {
                // Atualizar
                const docRef = doc(db, dbPath, transaction.id);
                await updateDoc(docRef, dataToSave);
            } else {
                // Adicionar
                await addDoc(collection(db, dbPath), dataToSave);
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar transação: ', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/** 3. Métricas de Cultivos */
const CropMetrics = ({ metrics }: { metrics: CropMetric[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.length === 0 && (
            <p className="text-gray-500 md:col-span-3">
                Nenhum cultivo encontrado. Adicione cultivos no 'Rastreador de
                Cultivos' e vincule transações a eles.
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
                        <span className="text-gray-600">Receita Total:</span>
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
                            {metric.profitPerHectare.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}{' '}
                            / hectare
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
