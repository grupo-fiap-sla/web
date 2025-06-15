"use client"

import 'bootstrap/dist/css/bootstrap.css';
import { FormEvent, useState } from 'react';

export function BootstrapForm () {
    const [ validated, setValidated ] = useState( false );
    const [ validName, setValidName ] = useState( false );

    function handleSubmit ( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        const formData = new FormData( e.target as HTMLFormElement );
        const data = Object.fromEntries( formData.entries() );

        const nameIsValid = data.nome.toString().trim().split( ' ' ).filter( Boolean ).length > 1;
        setValidName( nameIsValid );
        setValidated( true );
    }

    return (
        <form
            onSubmit={ handleSubmit }
            className={ validated ? "was-validated" : "needs-validation" }
            noValidate
            aria-labelledby="form-title"
        >
            <h2 id="form-title" className="visually-hidden">Formulário de Contato</h2>

            {/* Nome */ }
            <div className='form-group my-2'>
                <label htmlFor="nome" className="form-label text-green-700 font-semibold">
                    Nome <span className="text-amber-500">*</span>
                </label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    className={ `form-control ${validated ? ( validName ? 'is-valid' : 'is-invalid' ) : ''}` }
                    aria-required="true"
                    aria-invalid={ validated && !validName }
                    aria-describedby="namefeedback"
                    autoComplete="name"
                    required
                />
                { validated && !validName && (
                    <div id="namefeedback" className="invalid-feedback">
                        Informe o seu nome e sobrenome
                    </div>
                ) }
            </div>

            {/* Email */ }
            <div className='form-group my-2'>
                <label htmlFor="email" className="form-label text-green-700 font-semibold">
                    E-mail <span className="text-amber-500">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="form-control"
                    aria-required="true"
                    aria-describedby="emailfeedback"
                    autoComplete="email"
                    required
                />
                <div id="emailfeedback" className="invalid-feedback">
                    Informe um email válido
                </div>
            </div>

            {/* Assunto */ }
            <div className='form-group my-2'>
                <label htmlFor="assunto" className="form-label text-green-700 font-semibold">
                    Assunto
                </label>
                <input
                    id="assunto"
                    name="assunto"
                    type="text"
                    placeholder="Assunto da mensagem"
                    className="form-control"
                    aria-label="Assunto da mensagem"
                />
            </div>

            {/* Mensagem */ }
            <div className='form-group my-2'>
                <label htmlFor="mensagem" className="form-label text-green-700 font-semibold">
                    Descrição da mensagem <span className="text-amber-500">*</span>
                </label>
                <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={ 5 }
                    placeholder="Digite sua mensagem"
                    style={ { resize: "none" } }
                    className="form-control"
                    aria-required="true"
                    aria-describedby="msgfeedback"
                    maxLength={ 500 }
                    required
                />
                <div id="msgfeedback" className="invalid-feedback">
                    Preencha a descrição conforme os requisitos (até 500 caracteres).
                </div>
            </div>

            {/* Botão */ }
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-success mt-4"
                    style={ { padding: '0.75rem 10rem' } }
                    aria-label="Enviar formulário"
                >
                    Enviar Formulário
                </button>
            </div>
        </form>
    );
}
