'use client';

import { toast } from 'react-toastify';

export function showConfirmToast({ message, onConfirm, toastId }) {
    toast.info(
        ({ closeToast }) => (
            <div>
                <p>{message}</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={async () => {
                            await onConfirm();
                            toast.dismiss(toastId);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(toastId)}
                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-sm text-white"
                    >
                        No
                    </button>
                </div>
            </div>
        ),
        {
            autoClose: false,
            closeButton: false,
            position: 'top-center',
            toastId,
        }
    );
}
