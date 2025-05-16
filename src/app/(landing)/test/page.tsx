import React from "react";

export default function PaginaAgrotech () {
    return <div className="min-h-screen bg-green-50">
        {/* Header */ }
        <header className="bg-gradient-to-r from-green-700 to-green-400 text-white text-center py-4">
            <h1 className="text-xl font-semibold italic">
                Desenvolvimento Sustentável na Produção de Alimentos
            </h1>
        </header>

        {/* Menu */ }
        <nav className="bg-[#f5e9db] text-green-800 font-semibold flex justify-center gap-10 py-3 shadow">
            <a href="#inicio" className="hover:underline">Início</a>
            <a href="#desafios" className="hover:underline">Desafios</a>
            <a href="#publico-alvo" className="hover:underline">Público-Alvo</a>
            <a href="#solucao" className="hover:underline">Solução</a>
            <a href="#fale-conosco" className="hover:underline">Fale Conosco</a>
        </nav>

        <main className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
            {/* Início */ }
            <section id="inicio" className="mb-10">
                <h2 className="text-3xl font-bold text-green-700 mb-4">Bem-vindo</h2>
                <div className="bg-[#f0e3d0] text-gray-800 italic border-l-4 border-green-600 px-4 py-3 mb-4">
                    <strong>ODS 2 – Fome Zero e Agricultura Sustentável:</strong> Garantir sistemas sustentáveis de produção de alimentos e implementar práticas agrícolas resilientes.
                </div>
                <p className="text-gray-700 mb-6">
                    Este site apresenta os principais desafios e soluções para a produção sustentável de alimentos,
                    com foco nos pequenos produtores e na importância da integração de tecnologia acessível ao campo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                        <img src="/img/plantacao.png" alt="Plantação sustentável" className="w-full h-32 object-cover mb-2 rounded" />
                        <p className="text-center">🌱 Plantação sustentável</p>
                    </div>
                    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                        <img src="/img/solo.png" alt="Solo fértil" className="w-full h-32 object-cover mb-2 rounded" />
                        <p className="text-center">🌾 Solo fértil</p>
                    </div>
                    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                        <img src="/img/agricultor.png" alt="Pequeno agricultor" className="w-full h-32 object-cover mb-2 rounded" />
                        <p className="text-center">👨‍🌾 Pequeno agricultor</p>
                    </div>
                </div>
            </section>

            {/* Desafios */ }
            <section id="desafios" className="mb-10">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">Desafios</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Pouca tecnologia no campo</li>
                    <li>Irrigação ineficiente</li>
                    <li>Uso excessivo de fertilizantes</li>
                    <li>Altos custos e perdas de produção</li>
                    <li>Falta de previsibilidade na produção</li>
                </ul>
            </section>

            {/* Público-Alvo */ }
            <section id="publico-alvo" className="mb-10">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">Público-Alvo</h2>
                <p>
                    Pequenos produtores rurais, cooperativas agrícolas, estudantes, técnicos agrícolas e organizações que atuam com sustentabilidade e inovação no campo.
                </p>
            </section>

            {/* Solução */ }
            <section id="solucao" className="mb-10">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">Solução</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Dispositivo com sensores de umidade, temperatura e luminosidade</li>
                    <li>Monitoramento automatizado com câmeras</li>
                    <li>Sistemas de irrigação programáveis</li>
                    <li>Plataforma com análise preditiva e simulações de cultivo</li>
                    <li>Integração com APIs meteorológicas</li>
                </ul>
                <p className="mt-4">
                    O produtor ganha mais tempo, controle e produtividade através de tecnologia aplicada de forma prática e acessível.
                </p>
            </section>
        </main>
    </div>
}