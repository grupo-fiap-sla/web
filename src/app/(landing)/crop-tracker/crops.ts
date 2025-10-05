export interface Crop {
    id: string;
    name: string;
    variety: string;
    plantingDate: string;
    expectedHarvestDate: string;
    growthStage: string;
    notes: string;
}

export const GROWTH_STAGES = [
    'Semente',
    'Germinação',
    'Crescimento Vegetativo',
    'Florescimento',
    'Frutificação',
    'Maturação',
    'Pronto para Colheita',
];

export const cropsMock: Crop[] = [];

// -- Gera ID Aleatório
export function guidGenerator() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    );
}
