import { format } from "date-fns";
import { memo, useState } from "react";

import { useCreateCategories, useDeleteCategories, useGetCategories, useUpdateCategory } from "~/hooks";
import { Category } from "~/types";

import Button from "../ui/button/button";
import ConfirmDeleteButton from "../ui/button/delete-button";
import { Modal } from "../ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";

export const CategoriesTable = memo(() => {
  const { data: categories } = useGetCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteCategory } = useDeleteCategories(() => setIsModalOpen(false));
  const { createCategories, loading: isCreating } = useCreateCategories(() => setIsModalOpen(false));
  const { updateCategory, loading: isUpdating } = useUpdateCategory(() => setIsModalOpen(false));

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const [errors, setErrors] = useState({ name: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "" };

    if (!editingCategory?.name?.trim()) {
      newErrors.name = "Tên danh mục không được để trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const openCreateModal = () => {
    setEditingCategory({ id: "", name: "", description: "" });
    setIsCreateMode(true);
    setIsModalOpen(true);
    setErrors({ name: "" });
  };

  const handleRowClick = (category: Category) => {
    setEditingCategory({ ...category });
    setIsCreateMode(false);
    setIsModalOpen(true);
    setErrors({ name: "" });
  };

  const handleSave = () => {
    if (!editingCategory || !validateForm()) return;

    if (isCreateMode) {
      createCategories(editingCategory);
    } else {
      updateCategory(editingCategory);
    }
  };

  const handleDelete = () => {
    if (!editingCategory) return;
    deleteCategory(editingCategory);
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
    setErrors({ name: "" });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh mục tủ điện</h2>
            <Button
              className="h-[42px] bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              onClick={openCreateModal}
            >
              Thêm danh mục
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-200 dark:border-gray-700">
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Tên danh mục
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Mô tả danh mục
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Ngày tạo
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Ngày cập nhật
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {categories?.map(category => (
                <TableRow
                  key={category.id}
                  onClick={() => handleRowClick(category)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4 text-start text-theme-sm">
                    <TooltipText maxWidth="max-w-xs">{category.name || "—"}</TooltipText>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm">
                    <TooltipText maxWidth="max-w-xs">{category.description || "—"}</TooltipText>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm">
                    {category?.createdAt ? format(new Date(category.createdAt), "HH:mm dd/MM/yyyy") : "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm">
                    {category?.updatedAt ? format(new Date(category.updatedAt), "HH:mm dd/MM/yyyy") : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal size="lg" isOpen={isModalOpen} onClose={handleCloseModal}>
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
                value={editingCategory?.id || ""}
                disabled
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="category-name" className="text-sm font-medium">
              Tên danh mục *
            </label>
            <input
              id="category-name"
              className={`rounded border px-3 py-2 dark:bg-gray-800 dark:text-white ${
                errors.name ? "border-red-500" : ""
              }`}
              value={editingCategory?.name || ""}
              onChange={e => setEditingCategory(prev => prev && { ...prev, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category-description" className="text-sm font-medium">
              Mô tả danh mục
            </label>
            <textarea
              id="category-description"
              className="rounded border px-3 py-2 dark:bg-gray-800 dark:text-white"
              value={editingCategory?.description || ""}
              onChange={e => setEditingCategory(prev => prev && { ...prev, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              loading={isCreating || isUpdating}
              disabled={isCreating || isUpdating}
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {isCreateMode ? "Tạo mới" : "Cập nhật"}
            </Button>
            {!isCreateMode && (
              <ConfirmDeleteButton
                title="Bạn chắc chắn muốn xóa danh mục này không?"
                name="Xóa danh mục"
                onConfirm={handleDelete}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
});
