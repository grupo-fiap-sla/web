// --- Funções Auxiliares de Data ---
export function formatMonthYear(monthStr: string) {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const formatted = date.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
