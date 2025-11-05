import { useCommodities } from '../use-commodities';
import { ArrowUp, ArrowDown } from '../svg';

export function CommodityCarousel() {
    const commodities = useCommodities();

    return (
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
                                <span className="text-gray-400">
                                    {item.unit}
                                </span>
                                <span
                                    className={`font-bold flex items-center ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                                >
                                    {item.change >= 0 ? (
                                        <ArrowUp />
                                    ) : (
                                        <ArrowDown />
                                    )}
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
}
