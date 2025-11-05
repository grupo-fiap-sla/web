import { useMemo } from 'react';
import { Transaction } from '../types';
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts';

type MonthlyChartProps = {
    transactions: Transaction[];
    month: string;
};

export function MonthlyChart({ transactions, month }: MonthlyChartProps) {
    const chartData = useMemo(() => {
        const filtered = transactions.filter((t) => t.date.startsWith(month));
        const daysInMonth = new Date(
            parseInt(month.split('-')[0]),
            parseInt(month.split('-')[1]),
            0,
        ).getDate();

        const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, '0');
            const date = `${month}-${day}`;

            const receitas = filtered
                .filter((t) => t.type === 'receita' && t.date === date)
                .reduce((sum, t) => sum + t.amount, 0);

            const despesas = filtered
                .filter((t) => t.type === 'despesa' && t.date === date)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0); // Gráfico com valor positivo

            return { name: day, receitas, despesas };
        });

        return dailyData;
    }, [transactions, month]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
                <XAxis dataKey="name" fontSize={12} />
                <YAxis
                    fontSize={12}
                    tickFormatter={(val) => `R$${val / 1000}k`}
                />
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
}
