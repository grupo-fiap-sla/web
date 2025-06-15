import 'bootstrap/dist/css/bootstrap.css';

export function BootstrapForm () {
    return <form action="" className="was-validated">
        {/* Nome */ }
        <div className='form-check my-3'>
            <label htmlFor="nome" className="form-label block text-green-700 font-semibold">
                Nome<span className="text-amber-500">*</span>
            </label>
            <input
                required
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                className="form-control"
            />
            <div className="invalid-feedback">Informe o seu nome e sobrenome</div>
        </div>

        {/* Email */ }
        <div className='form-check my-4'>
            <label htmlFor="email" className="form-label block text-green-700 font-semibold">
                E-mail<span className="text-amber-500">*</span>
            </label>
            <input
                required
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="form-control"
            />
            <div className="invalid-feedback">Informe um email válido</div>
        </div>

        {/* Assunto */ }
        <div className='form-check my-4'>
            <label htmlFor="assunto" className="form-label block text-green-700 font-semibold">
                Assunto
            </label>
            <input
                name="assunto"
                type="text"
                placeholder="Assunto da mensagem"
                className="form-control"
            />
        </div>

        {/* Mensagem */ }
        <div className='form-check'>
            <label htmlFor="mensagem" className="form-label block text-green-700 font-semibold">
                Descrição da mensagem<span className="text-amber-500">*</span>
            </label>
            <textarea
                required
                rows={ 5 }
                name="mensagem"
                minLength={ 30 }
                maxLength={ 500 }
                placeholder="Digite sua mensagem"
                className='form-control resize-none'
            />
            <div className="invalid-feedback">Preencha a descrição conforme os requisitos</div>
        </div>

        <button type="submit" className="btn btn-success mt-4 justify-end">Enviar Formulário</button>
    </form>
}
