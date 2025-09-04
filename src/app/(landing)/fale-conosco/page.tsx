import { TailwindForm } from './tailwind-form';

export default function FaleConosco() {
    return (
        <div className="bg-green-50 flex justify-center p-1">
            <div className="w-full max-w-xl h-fit mt-3 p-4 bg-white rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-green-700 mb-4">
                    Fale Conosco
                </h1>

                <TailwindForm />
            </div>
        </div>
    );
}
