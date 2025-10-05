export const DeleteConfirmationModal = ({
    onConfirm,
    onCancel,
}: {
    onConfirm: () => void;
    onCancel: () => void;
}) => (
    <div className="fixed inset-0 bg-[#000000C0] flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">
                    Confirmar Exclusão
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    Você tem certeza que deseja excluir esta plantação? Esta
                    ação não pode ser desfeita.
                </p>

                <div className="px-4 flex justify-end space-x-3 mt-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    </div>
);
