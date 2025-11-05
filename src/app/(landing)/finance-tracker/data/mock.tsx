import { Commodity, Crop, Transaction } from '../types';
import transactions from './transactions.json';
import {
    CornIcon,
    SoyIcon,
    CoffeeIcon,
    CottonIcon,
    BeanIcon,
    CarrotIcon,
    GrapeIcon,
    LettuceIcon,
    OnionIcon,
    PotatoIcon,
    TomatoIcon,
    WheatIcon,
} from '../svg';

export const getCrops = (): Crop[] => [
    { id: 'c1', name: 'Milho', variety: 'AG-1051', area: 5 },
    { id: 'c2', name: 'Soja', variety: 'BRS-511', area: 10 },
    { id: 'c3', name: 'Café', variety: 'Arábica', area: 2 },
    { id: 'c4', name: 'Tomate', variety: 'Italiano', area: 1.5 },
    { id: 'c5', name: 'Alface', variety: 'Americana', area: 0.5 },
    { id: 'c6', name: 'Trigo', variety: 'BRS Parrudo', area: 20 },
    { id: 'c7', name: 'Batata', variety: 'Asterix', area: 3 },
    { id: 'c8', name: 'Cebola', variety: 'Valenciana', area: 1 },
    { id: 'c9', name: 'Feijão', variety: 'Carioca', area: 4 },
    { id: 'c10', name: 'Uva', variety: 'Niagara', area: 2.5 },
    { id: 'c11', name: 'Cenoura', variety: 'Brasília', area: 1 },
];

export const getTransactions = (): Transaction[] => {
    return transactions as Transaction[];
};

export const initialCommodities: Commodity[] = [
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
        unit: 'R$/saca 15kg',
        icon: <CottonIcon />,
    },
    // --- Novos Itens Adicionados ---
    {
        id: 'wheat',
        name: 'Trigo',
        price: 65.2,
        change: -0.15,
        unit: 'R$/saca 60kg',
        icon: <WheatIcon />,
    },
    {
        id: 'tomato',
        name: 'Tomate',
        price: 95.0,
        change: 2.5,
        unit: 'R$/caixa 20kg',
        icon: <TomatoIcon />,
    },
    {
        id: 'bean',
        name: 'Feijão Carioca',
        price: 290.0,
        change: 0.8,
        unit: 'R$/saca 60kg',
        icon: <BeanIcon />,
    },
    {
        id: 'potato',
        name: 'Batata Asterix',
        price: 135.0,
        change: -1.1,
        unit: 'R$/saca 50kg',
        icon: <PotatoIcon />,
    },
    {
        id: 'onion',
        name: 'Cebola',
        price: 62.4,
        change: 0.3,
        unit: 'R$/saca 20kg',
        icon: <OnionIcon />,
    },
    {
        id: 'grape',
        name: 'Uva Niagara',
        price: 8.5,
        change: 0.0,
        unit: 'R$/kg',
        icon: <GrapeIcon />,
    },
    {
        id: 'lettuce',
        name: 'Alface',
        price: 32.0,
        change: 0.1,
        unit: 'R$/dúzia',
        icon: <LettuceIcon />,
    },
    {
        id: 'carrot',
        name: 'Cenoura',
        price: 70.0,
        change: -0.5,
        unit: 'R$/caixa 20kg',
        icon: <CarrotIcon />,
    },
];
