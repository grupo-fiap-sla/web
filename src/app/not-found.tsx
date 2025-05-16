import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function NotFound () {
    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
            <Icon
                icon="garden:face-very-sad-fill-12"
                className="text-red-500 text-9xl"
            />

            <div className="text-center">
                <h2 className="text-xl text-red-500 font-bold uppercase">
                    Página Não Encontrada
                </h2>
                <p>Não encontramos esta página.</p>
            </div>

            <Link
                href="/"
                className="m-4 bg-green-800 text-white px-4 py-2 rounded-xl flex gap-2 items-center"
            >
                <Icon icon="mdi:home" />
                Voltar a home
            </Link>
        </section>
    );
}
