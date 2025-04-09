import { format } from "date-fns";
import { useState } from "react";
import { Category } from "~/types";
import {
    useCreateCategories,
    useDeleteCategories,
    useGetCategories,
    useUpdateCategory
} from "../../hooks/use-categories";
import { Modal } from "../ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";

export default function CategoriesTable() {
    const { data: dataCategories } = useGetCategories();
    const { createCategories } = useCreateCategories();
    const { updateCategory } = useUpdateCategory();
    const { deleteCategory } = useDeleteCategories();
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [editedCategory, setEditedCategory] = useState<Category | null>(null);

    const openCreateModal = () => {
        setEditedCategory({ id: "", name: "", description: "" });
        setIsCreateMode(true);
        setSelectedCategory(null);
    };

    const handleRowClick = (category: Category) => {
        setEditedCategory({ ...category });
        setSelectedCategory(category);
        setIsCreateMode(false);
    };

    const handleSave = () => {
        if (!editedCategory) return;
        if (isCreateMode) {
            createCategories(editedCategory);
        } else {
            updateCategory(editedCategory);
        }

        setEditedCategory(null);
        setSelectedCategory(null);
        setIsCreateMode(false);
    };

    const handleDelete = () => {
        if (!selectedCategory) return;
        deleteCategory(selectedCategory);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setEditedCategory(null);
        setSelectedCategory(null);
        setIsCreateMode(false);
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl font-semibold">Danh mục tủ điện</h2>
                    <button
                        className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={openCreateModal}
                    >
                        Thêm danh mục
                    </button>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Tên danh mục
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Mô tả danh mục
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Ngày tạo
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Ngày cập nhật
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {dataCategories?.map(category => (
                                <TableRow
                                    key={category.id}
                                    onClick={() => handleRowClick(category)}
                                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <TableCell className="px-5 py-4 text-start">
                                        <TooltipText maxWidth="max-w-xs">{category.name || "—"}</TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <TooltipText maxWidth="max-w-xs">{category.description || "—"}</TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        {category?.createdAt
                                            ? format(new Date(category.createdAt), "HH:mm dd/MM/yyyy")
                                            : "—"}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        {category?.updatedAt
                                            ? format(new Date(category.updatedAt), "HH:mm dd/MM/yyyy")
                                            : "—"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Modal size="lg" isOpen={!!editedCategory} onClose={handleCloseModal}>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{isCreateMode ? "Thêm danh mục" : "Chỉnh sửa danh mục"}</h2>

                    {!isCreateMode && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category-id" className="text-sm font-medium">
                                ID danh mục
                            </label>
                            <input
                                id="category-id"
                                className="rounded border px-3 py-2 dark:bg-gray-800 dark:text-white"
                                value={editedCategory?.id || ""}
                                onChange={e => setEditedCategory(prev => prev && { ...prev, id: e.target.value })}
                                disabled
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="category-name" className="text-sm font-medium">
                            Tên danh mục
                        </label>
                        <input
                            id="category-name"
                            className="rounded border px-3 py-2 dark:bg-gray-800 dark:text-white"
                            value={editedCategory?.name || ""}
                            onChange={e => setEditedCategory(prev => prev && { ...prev, name: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="category-description" className="text-sm font-medium">
                            Mô tả danh mục
                        </label>
                        <textarea
                            id="category-description"
                            className="rounded border px-3 py-2 dark:bg-gray-800 dark:text-white"
                            value={editedCategory?.description || ""}
                            onChange={e => setEditedCategory(prev => prev && { ...prev, description: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        {!isCreateMode && (
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                            >
                                Xóa danh mục
                            </button>
                        )}

                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            {isCreateMode ? "Tạo mới" : "Cập nhật"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
