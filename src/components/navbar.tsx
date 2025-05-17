import Link from 'next/link';

export default function Navbar () {
    const links = [
        { href: '/', label: 'Início' },
        { href: '/dashboard', label: 'Dashboard' },
        // { href: '/desafios', label: 'Desafios' },
        // { href: '/publico-alvo', label: 'Público-Alvo' },
        // { href: '/solucao', label: 'Solução' },
        { href: '/fale-conosco', label: 'Fale Conosco' },
    ];

    return (
        <nav className="flex justify-center gap-8 bg-[#f0e3d0] text-green-700 border-b-2 border-green-700 font-semibold py-4">
            { links.map( ( { href, label } ) => (
                <Link
                    key={ href }
                    href={ href }
                    className="px-3 py-1 rounded text-brown-800 hover:bg-[#e5cfa7] hover:text-[#a18c65] transition"
                >
                    { label }
                </Link>
            ) ) }
        </nav>
    );
}
