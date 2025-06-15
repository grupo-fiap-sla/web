import Navbar from '@/components/navbar';
import '@/app/globals.css';

export default function RootLayout ( { children }: Readonly<{ children: React.ReactNode }> ) {
    return (
        <div className="min-h-screen bg-green-50">
            <header className="bg-gradient-to-r from-green-700 to-[#f9c970] text-white text-center py-4">
                <h1 className="text-xl font-semibold">Desenvolvimento Sustentável na Produção de Alimentos</h1>
            </header>

            <Navbar />

            { children }

            <p className='text-sm text-center py-4'>&copy; Terrabyte - 2025</p>
        </div>
    );
}
