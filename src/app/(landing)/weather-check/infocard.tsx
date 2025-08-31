import { ReactNode } from 'react';

interface InfoCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

export const InfoCard = ({ title, value, icon }: InfoCardProps) => (
    <div className="bg-white/30 backdrop-blur-sm p-4 rounded-2xl flex items-center space-x-4">
        <div className="text-white">{icon}</div>
        <div>
            <p className="text-gray-200 text-sm">{title}</p>
            <p className="text-white font-bold text-lg">{value}</p>
        </div>
    </div>
);
