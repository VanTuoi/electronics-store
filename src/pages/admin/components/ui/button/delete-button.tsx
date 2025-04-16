import React, { useState } from "react";
import DeleteButton from "./button";

interface ConfirmDeleteButtonProps {
    onConfirm: () => void;
    title?: string;
    className?: string;
}

const ConfirmDeleteButton: React.FC<ConfirmDeleteButtonProps> = ({
    onConfirm,
    title = "Bạn có chắc chắn muốn xóa?",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <DeleteButton
                onClick={() => setIsOpen(true)}
                type="button"
                className={`!bg-red-500 hover:!bg-red-600 ${className}`}
            >
                Xóa sản phẩm
            </DeleteButton>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity z-999999">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={() => {
                                    setIsOpen(false);
                                    onConfirm();
                                }}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmDeleteButton;
