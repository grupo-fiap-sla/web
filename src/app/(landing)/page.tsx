import Card from '@/components/card';

export default function Inicio() {
    return (
        <main className="flex flex-col gap-4 max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
                Bem-vindo
            </h2>

            <div className="bg-beige text-gray-800 italic border-l-4 border-green-600 px-4 py-3 mb-4">
                <strong>ODS 2 – Fome Zero e Agricultura Sustentável:</strong>{' '}
                Garantir sistemas sustentáveis de produção de alimentos e
                implementar práticas agrícolas resilientes.
            </div>

            <p className="text-gray-700 mb-6">
                Este site apresenta os principais desafios e soluções para a
                produção sustentável de alimentos, com foco nos pequenos
                produtores e na importância da integração de tecnologia
                acessível ao campo.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card
                    src="/img/plantacao.jpg"
                    cardText="Plantação sustentável"
                />

                <Card src="/img/solofertil.jpg" cardText="🌾 Solo fértil" />

                <Card
                    src="/img/agricultor.jpg"
                    cardText="👨‍🌾 Pequeno agricultor"
                />
            </div>

            {/* Desafios */}
            <section id="desafios">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                    Desafios
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Pouca tecnologia no campo</li>
                    <li>Irrigação ineficiente</li>
                    <li>Uso excessivo de fertilizantes</li>
                    <li>Altos custos e perdas de produção</li>
                    <li>Falta de previsibilidade na produção</li>
                </ul>
            </section>

            {/* Público-Alvo */}
            <section id="publico-alvo">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                    Público-Alvo
                </h2>
                <p>
                    Pequenos produtores rurais, cooperativas agrícolas,
                    estudantes, técnicos agrícolas e organizações que atuam com
                    sustentabilidade e inovação no campo.
                </p>
            </section>

            {/* Solução */}
            <section id="solucao">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                    Solução
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        Dispositivo com sensores de umidade, temperatura e
                        luminosidade
                    </li>
                    <li>Monitoramento automatizado com câmeras</li>
                    <li>Sistemas de irrigação programáveis</li>
                    <li>
                        Plataforma com análise preditiva e simulações de cultivo
                    </li>
                    <li>Integração com APIs meteorológicas</li>
                </ul>
                <p className="mt-4">
                    O produtor ganha mais tempo, controle e produtividade
                    através de tecnologia aplicada de forma prática e acessível.
                </p>
            </section>
        </main>
    );
}
