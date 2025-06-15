import { BootstrapForm } from './bootstrap-form';

export default function FaleConosco () {
    return <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Fale Conosco</h1>

            <BootstrapForm />
        </div>
    </div>
}
