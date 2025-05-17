import { ItemCardP, ItemCardS, ItemCardC } from './item-card';
import { shortInfo, costData } from './data';
import { Sidebar } from './sidebar';
import { Chart } from './chart';

export default function FarmDashboard () {
    return <div className="h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6 overflow-scroll">
            {/* Header */ }
            <header className="flex gap-8 items-center">
                <h2 className="text-3xl font-bold text-green-600">Dashboard</h2>

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="border px-4 py-2 rounded-md w-64"
                />

                <div className='flex-1' />

                <div className="flex items-center space-x-4">
                    <span className="text-sm">Agricultor</span>
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-center">A</div>
                </div>
            </header>

            {/* Metrics Cards */ }
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    shortInfo.map( ( stat, i ) => (
                        <div key={ i } className="bg-white p-4 rounded-xl shadow text-center">
                            <h3 className="text-lg font-semibold">{ stat.label }</h3>
                            <p className="text-2xl font-bold text-green-600">{ stat.value }</p>
                        </div>
                    ) )
                }
            </section>

            {/* Map & Graph Section */ }
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ItemCardP />
                <ItemCardS />
                <ItemCardC />
            </section>

            {/* Cost Analysis Graph */ }
            <section className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">Análise de Custos</h3>
                <Chart costData={ costData } />
            </section>

            {/* Recent Jobs */ }
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-2">Trabalhos Pendentes</h3>
                    <ul className="text-sm space-y-2">
                        <li className="border p-2 rounded text-gray-700">Colheira</li>
                        <li className="border p-2 rounded text-gray-700">Cultivo</li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Campanha</h3>
                        <p className="text-sm text-gray-600">Lógica personalizada e status do sistema de rastreamento online</p>
                    </div>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Ver Relatórios</button>
                </div>

            </section>
        </main>
    </div>
}
