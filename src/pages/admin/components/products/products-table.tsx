import { format } from "date-fns";
import { useState } from "react";
import { Option, Product } from "~/types";
import { formatCurrency } from "~/utils/price-utils";
import { useGetCategories } from "../../hooks/use-categories";
import { useDeleteProducts, useGetProducts } from "../../hooks/use-products";
import Input from "../form/input/input-field";
import Select from "../form/select";
import { Modal } from "../ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";
import { ProductForm } from "./create-product";

export default function ProductsTable() {
    const [filters, setFilters] = useState({
        categoryId: "",
        search: ""
    });
    const { data: dataProducts, refetch } = useGetProducts(filters);
    const { data: categories } = useGetCategories();
    const { deleteProduct } = useDeleteProducts();
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);

    const openCreateModal = () => {
        setEditedProduct(null);
        setIsCreateMode(true);
        setSelectedProduct(null);
    };

    const handleRowClick = (product: Product) => {
        setEditedProduct(product);
        setSelectedProduct(product);
        setIsCreateMode(false);
    };

    const handleDelete = () => {
        if (!selectedProduct) return;
        deleteProduct(selectedProduct);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setEditedProduct(null);
        setSelectedProduct(null);
        setIsCreateMode(false);
    };

    const categoryOptions: Option[] =
        categories?.map(category => ({
            value: category.id,
            label: category.name
        })) || [];

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleSearch = () => {
        refetch();
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl font-semibold">Danh sách tủ điện</h2>
                    <button
                        className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={openCreateModal}
                    >
                        Thêm tủ điện
                    </button>
                </div>
                <div className="flex justify-start items-end p-4 gap-2">
                    <Select
                        options={categoryOptions}
                        placeholder="Chọn danh mục"
                        onValueChange={categoryId => handleFilterChange({ categoryId })}
                        value={filters.categoryId}
                        label="Danh mục sản phẩm"
                    />
                    <Input
                        label="Tên sản phẩm"
                        value={filters.search}
                        onChange={e => handleFilterChange({ search: e.target.value })}
                    ></Input>
                    <button
                        className="px-4 py-3 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => handleSearch()}
                    >
                        Tìm kiếm
                    </button>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Tên tủ điện
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Mô tả tủ điện
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Giá gốc
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Khuyến mãi
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Điện áp vào
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Điện áp ra
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs">
                                    Ngày cập nhật
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {dataProducts?.map(product => (
                                <TableRow
                                    key={product.id}
                                    onClick={() => handleRowClick(product)}
                                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        <TooltipText maxWidth="max-w-xs">{product.name || "—"}</TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        <TooltipText maxWidth="max-w-xs">{product.description || "—"}</TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        <TooltipText maxWidth="max-w-xs">
                                            {formatCurrency(product.price || 0) || "—"}
                                        </TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        {product.priceText}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        {product.inputVoltage}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        {product.outputVoltage}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        {product?.updatedAt
                                            ? format(new Date(product.updatedAt), "HH:mm dd/MM/yyyy")
                                            : "—"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Modal size="xl" isOpen={!!editedProduct || isCreateMode} onClose={handleCloseModal}>
                <div className="space-y-4">
                    <ProductForm
                        key={editedProduct?.id || "create"}
                        defaultValues={editedProduct || undefined}
                        formTitle={isCreateMode ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
                        onCancel={handleCloseModal}
                        isCreateMode={isCreateMode}
                        onDelete={!isCreateMode ? handleDelete : undefined}
                    />
                </div>
            </Modal>
        </>
    );
}
