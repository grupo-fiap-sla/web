import React from "react";

export default function FaleConosco () {
    return <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">

            <h1 className="text-3xl font-bold text-green-700 mb-6">Fale Conosco</h1>

            <form className="space-y-5">

                {/* Nome */ }
                <div>
                    <label className="block text-green-700 font-semibold mb-1">
                        Nome<span className="text-amber-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Seu nome completo"
                        className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md outline-none text-black focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Email */ }
                <div>
                    <label className="block text-green-700 font-semibold mb-1">
                        E-mail<span className="text-amber-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md outline-none text-black focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Assunto */ }
                <div>
                    <label className="block text-green-700 font-semibold mb-1">
                        Assunto<span className="text-amber-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Assunto da mensagem"
                        className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md text-black outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Mensagem */ }
                <div>
                    <label className="block text-green-700 font-semibold mb-1">
                        Mensagem<span className="text-amber-500">*</span>
                    </label>
                    <textarea
                        rows={ 5 }
                        placeholder="Digite sua mensagem"
                        className="w-full border border-amber-300 bg-amber-100 p-3 rounded-md resize-none outline-none text-black focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <p className="text-black text-xs"><i>* Campos Obrigatórios</i></p>

                <button
                    type="submit"
                    disabled
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-md cursor-not-allowed hover:bg-green-700 transition"
                >
                    Enviar (em breve)
                </button>

            </form>
        </div>
    </div>
}
