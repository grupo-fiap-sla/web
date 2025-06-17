import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Terrabyte',
    description: 'Desenvolvido para o pequeno agricultor',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${poppins.className} antialiased min-h-full`}>
                {children}
            </body>
        </html>
    );
}
