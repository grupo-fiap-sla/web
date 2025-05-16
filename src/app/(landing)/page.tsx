import Card from "@/components/card"

export default function Inicio () {
    return <main className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Bem-vindo</h2>

        <div className="bg-beige text-gray-800 italic border-l-4 border-green-600 px-4 py-3 mb-4">
            <strong>ODS 2 – Fome Zero e Agricultura Sustentável:</strong>{ ' ' }
            Garantir sistemas sustentáveis de produção de alimentos e
            implementar práticas agrícolas resilientes.
        </div>

        <p className="text-gray-700 mb-6">
            Este site apresenta os principais desafios e soluções para a
            produção sustentável de alimentos, com foco nos pequenos
            produtores e na importância da integração de tecnologia
            acessível ao campo.
        </p>

        {/* Cards */ }
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
                src="/img/plantacao.jpg"
                cardText="Plantação sustentável"
            />

            <Card
                src="/img/solofertil.jpg"
                cardText="🌾 Solo fértil"
            />

            <Card
                src="/img/agricultor.jpg"
                cardText="👨‍🌾 Pequeno agricultor"
            />
        </div>

    </main >
}
