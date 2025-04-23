import React, { memo } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = memo(
    ({
        isOpen,
        onClose,
        onConfirm,
        title = "Bạn chắc chắn muốn xóa?",
        description = "Hành động này không thể hoàn tác.",
        confirmText = "Xóa",
        cancelText = "Hủy"
    }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

export default ConfirmModal;
