import React from "react";

export default function PaginaCompleta () {
    return (
        <main className="bg-green-50 text-gray-800 font-sans">
            {/* Início */ }
            <section className="py-16 px-6 text-center">
                <h1 className="text-3xl font-bold text-green-800 mb-4">Bem-vindo</h1>
                <div className="bg-[#f3e2cf] p-4 rounded-md inline-block shadow">
                    <p className="italic text-gray-700 font-medium">
                        <strong className="text-green-700">ODS 2 – Fome Zero e Agricultura Sustentável:</strong>{ ' ' }
                        Garantir sistemas sustentáveis de produção de alimentos e implementar práticas agrícolas resilientes.
                    </p>
                </div>
                <p className="mt-6 max-w-2xl mx-auto">
                    Este site apresenta os principais desafios e soluções para a produção sustentável de alimentos,
                    com foco nos pequenos produtores e na importância da integração de tecnologia acessível ao campo.
                </p>
            </section>

            {/* Desafios */ }
            <section className="py-12 px-6 bg-[#fefae0] text-center">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Desafios</h2>
                <ul className="space-y-4 max-w-xl mx-auto text-left list-disc list-inside">
                    <li>Uso inadequado do solo</li>
                    <li>Falta de acesso à tecnologia</li>
                    <li>Baixa produtividade agrícola</li>
                    <li>Impactos ambientais negativos</li>
                </ul>
            </section>

            {/* Público-Alvo */ }
            <section className="py-12 px-6 text-center">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Público-Alvo</h2>
                <p className="max-w-xl mx-auto">
                    Pequenos agricultores, cooperativas agrícolas, estudantes e profissionais da área ambiental interessados
                    em práticas sustentáveis de produção de alimentos.
                </p>
            </section>

            {/* Solução */ }
            <section className="py-12 px-6 bg-[#fefae0] text-center">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Solução</h2>
                <p className="max-w-xl mx-auto">
                    Promover o uso de tecnologias acessíveis, capacitação técnica, práticas de cultivo sustentáveis
                    e políticas públicas que favoreçam a agricultura familiar e a preservação ambiental.
                </p>
            </section>
        </main>
    );
}
