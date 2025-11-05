import { JSX } from 'react';

// --- Tipos de Dados ---
export interface Commodity {
    id: string;
    name: string;
    price: number;
    change: number;
    unit: string;
    icon: JSX.Element;
}

export interface Transaction {
    id: string;
    description: string;
    amount: number; // Positivo para receita, negativo para despesa
    date: string; // Formato YYYY-MM-DD
    category:
        | 'insumo'
        | 'venda'
        | 'transporte'
        | 'mao_de_obra'
        | 'manutencao'
        | 'outra';
    type: 'receita' | 'despesa';
    notes: string;
    linkedCropId?: string; // ID do cultivo do CropTracker
}

export interface Crop {
    id: string;
    name: string;
    variety: string;
    area: number; // Em hectares, crucial para métricas
    //... outros campos do CropTracker
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
}

export interface CropMetric {
    cropId: string;
    cropName: string;
    totalCost: number;
    totalRevenue: number;
    netProfit: number;
    profitPerHectare: number;
}
