"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ChartType = { costData: { mes: string, custo: number }[] }

export function Chart ( { costData }: ChartType ) {
    return (
        <ResponsiveContainer width="100%" height={ 200 }>
            <BarChart data={ costData }>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="custo" fill="#22c55e" radius={ [ 6, 6, 0, 0 ] } />
            </BarChart>
        </ResponsiveContainer>
    )
}