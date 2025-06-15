"use client"

import 'bootstrap/dist/css/bootstrap.css';
import { FormEvent, useState } from 'react';

export function BootstrapForm () {
    function handleSubmit ( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault()
        const formData = new FormData( e.target as HTMLFormElement );
        const data = Object.fromEntries( formData.entries() );

        if ( data.nome.toString().trim().split( ' ' ).filter( Boolean ).length > 1 ) setValidName( true )
        setValidated( true )
    }

    const [ validated, setValidated ] = useState<boolean>( false )
    const [ validName, setValidName ] = useState<boolean>( false )

    return <form onSubmit={ handleSubmit } className={ validated ? "was-validated" : "needs-validation" } noValidate>
        {/* Nome */ }
        <div className='form-check my-2'>
            <label htmlFor="nome" className="form-label block text-green-700 font-semibold">
                Nome<span className="text-amber-500">*</span>
            </label>
            <input
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                aria-describedby="namefeedback"
                className={ `form-control ${validated ? ( validName ? 'is-valid' : 'form-control:invalid is-invalid' ) : ''}` }
            />

            {
                validated && !validName && (
                    <div id='namefeedback' className="invalid-feedback">Informe o seu nome e sobrenome</div>
                )
            }
        </div>

        {/* Email */ }
        <div className='form-check my-2'>
            <label htmlFor="email" className="form-label block text-green-700 font-semibold">
                E-mail<span className="text-amber-500">*</span>
            </label>
            <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="form-control"
            />
            <div className="invalid-feedback">Informe um email válido</div>
        </div>

        {/* Assunto */ }
        <div className='form-check my-2'>
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
                rows={ 5 }
                name="mensagem"
                minLength={ 0 }
                maxLength={ 500 }
                placeholder="Digite sua mensagem"
                style={ { resize: "none" } }
                className='form-control'
            />
            <div className="invalid-feedback">Preencha a descrição conforme os requisitos</div>
        </div>

        <div className="text-center">
            <button
                type="submit"
                style={ { padding: '0.75rem 10rem', margin: "auto" } }
                className="btn btn-success mt-4 justify-end"
            >
                Enviar Formulário
            </button>
        </div>
    </form>
}
