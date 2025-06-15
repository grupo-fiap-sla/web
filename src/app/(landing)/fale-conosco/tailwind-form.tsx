export function TailwindForm () {
    return <form action="" className="space-y-5 was-validated">
        {/* Nome */ }
        <div>
            <label htmlFor="nome" className="block text-green-700 font-semibold mb-1">
                Nome<span className="text-amber-500">*</span>
            </label>
            <input
                required
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md outline-none text-black focus:ring-2 focus:ring-green-500"
            />
        </div>

        {/* Email */ }
        <div>
            <label htmlFor="email" className="block text-green-700 font-semibold mb-1">
                E-mail<span className="text-amber-500">*</span>
            </label>
            <input
                required
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md outline-none text-black focus:ring-2 focus:ring-green-500"
            />
        </div>

        {/* Assunto */ }
        <div>
            <label htmlFor="assunto" className="block text-green-700 font-semibold mb-1">
                Assunto
            </label>
            <input
                name="assunto"
                type="text"
                placeholder="Assunto da mensagem"
                className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md text-black outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        {/* Mensagem */ }
        <div>
            <label htmlFor="mensagem" className="block text-green-700 font-semibold mb-1">
                Descrição da mensagem<span className="text-amber-500">*</span>
            </label>
            <textarea
                required
                rows={ 5 }
                name="mensagem"
                minLength={ 30 }
                maxLength={ 500 }
                placeholder="Digite sua mensagem"
                className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md resize-none outline-none text-black focus:ring-2 focus:ring-green-500"
            />
        </div>

        <p className="text-black text-xs"><i>* Campos Obrigatórios</i></p>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-md cursor-pointer hover:bg-green-700 transition">Enviar</button>
    </form>
}
