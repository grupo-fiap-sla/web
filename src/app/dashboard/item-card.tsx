

export function ItemCardP () {
    return <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Plantações</h3>

        <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center text-xl font-bold text-green-600">R$4.862</div>

        <ul className="text-sm text-gray-700">
            <li className="flex justify-between">Trigo <span className="text-green-600">+12.6%</span></li>
            <li className="flex justify-between">Milho <span className="text-red-500">-8.3%</span></li>
            <li className="flex justify-between">Cevada <span className="text-red-500">-5.7%</span></li>
            <li className="flex justify-between">Soja <span className="text-red-500">-4.4%</span></li>
        </ul>
    </div>
}

export function ItemCardS () {
    return <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Solo</h3>

        <div className="w-24 h-24 rounded-full bg-yellow-100 mx-auto flex items-center justify-center text-xl font-bold text-yellow-600">
            6.2 pH
        </div>

        <ul className="text-sm text-gray-700">
            <li className="flex justify-between">Nitrogênio <span className="text-green-600">+15%</span></li>
            <li className="flex justify-between">Fósforo <span className="text-yellow-600">Estável</span></li>
            <li className="flex justify-between">Potássio <span className="text-red-500">-7%</span></li>
            <li className="flex justify-between">Umidade <span className="text-green-600">Adequada</span></li>
        </ul>
    </div>
}

export function ItemCardC () {
    return <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Clima</h3>

        <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-xl font-bold text-blue-600">
            24°C
        </div>

        <ul className="text-sm text-gray-700">
            <li className="flex justify-between">Temperatura <span className="text-blue-600">24°C</span></li>
            <li className="flex justify-between">Umidade <span className="text-green-600">68%</span></li>
            <li className="flex justify-between">Precipitação <span className="text-blue-600">12mm</span></li>
            <li className="flex justify-between">Vento <span className="text-yellow-600">9 km/h</span></li>
        </ul>
    </div>

}