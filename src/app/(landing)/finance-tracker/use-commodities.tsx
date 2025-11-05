import { useState, useEffect } from 'react';
import { Commodity } from './types';
import { initialCommodities } from './data/mock';

export function useCommodities() {
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
}
