// Vetor com Dados de Horas Seguintes
export const MOCK_HOURLY_CODES = [
    10, 11, 11, 12, 12, 12, 13, 45, 61, 33, 32, 31, 30, 30, 21, 22, 22, 32, 23,
    22, 31, 31, 10, 10,
];

// Vetor com Dados de Dias Seguintes
export const MOCK_DAILY_CODES = [3, 80, 61, 1, 0, 2, 95];

// ! SIMULAÇÃO DE CURVA DE TEMPERATURA POR HORA
export function simulateHourTemp(hour: number) {
    return Math.round(15 - hour * 0.2 + Math.sin(hour / 2) * 2);
}

// ! SIMULAÇÃO DE MÁXIMAS E MÍNIMAS
export function simulateDayTemp(day: number) {
    const maxTemp = 20 + Math.round(Math.sin(day) * 3);
    const minTemp = maxTemp - (8 + Math.round(Math.cos(day) * 2));
    return [maxTemp, minTemp];
}
