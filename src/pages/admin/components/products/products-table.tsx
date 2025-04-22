import { format } from "date-fns";
import { useState } from "react";
import { Option, Product } from "~/types";
import { formatCurrency, getMainImage } from "~/utils/price-utils";
import { useDeleteProducts, useGetProductsForAdmin } from "../../../../hooks/products/use-products";
import { useGetCategories } from "../../hooks/use-categories";
import Input from "../form/input/input-field";
import Select from "../form/select";
import Button from "../ui/button/button";
import { Modal } from "../ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";
import { ProductForm } from "./create-product";

const visibilityOptions = [
    { value: "false", label: "Đang hiển thị" },
    { value: "true", label: "Đã ẩn" },
    { value: "all", label: "Tất cả" }
];

export default function ProductsTable() {
    const [filters, setFilters] = useState({
        showHidden: "all",
        categoryId: "",
        search: "",
        quantityFrom: "",
        quantityTo: ""
    });

    const { data: dataProducts } = useGetProductsForAdmin(filters);
    const { data: categories } = useGetCategories();
    const { deleteProduct } = useDeleteProducts();
    const [isFullScreen, setIsFullScreen] = useState(false);
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

    const categoryOptions: Option[] = [
        { value: "", label: "Tất cả" },
        ...(categories?.map(category => ({
            value: category.id,
            label: category.name
        })) || [])
    ];

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 w-full">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Danh sách tủ điện</h2>
                        <Button
                            className="h-[42px] bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                            onClick={openCreateModal}
                        >
                            Thêm tủ điện
                        </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-start items-end gap-2">
                        <div className="flex items-end gap-2 w-full sm:w-auto">
                            <div className="flex max-w-[250px] sm:max-w-full">
                                <Input
                                    label="Tên sản phẩm"
                                    value={filters.search}
                                    onChange={e => handleFilterChange({ search: e.target.value })}
                                ></Input>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 w-full sm:w-auto">
                            <div className="min-w-[200px]">
                                <Select
                                    options={categoryOptions}
                                    placeholder="Chọn danh mục"
                                    onValueChange={categoryId => handleFilterChange({ categoryId })}
                                    value={filters.categoryId}
                                    label="Danh mục sản phẩm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="min-w-[100px]">
                                <Select
                                    options={visibilityOptions}
                                    placeholder="Trạng thái hiển thị"
                                    onValueChange={showHidden => handleFilterChange({ showHidden })}
                                    value={filters.showHidden}
                                    label="Trạng thái"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="w-[100px]">
                                <Input
                                    label="Số lượng từ"
                                    type="number"
                                    value={filters.quantityFrom}
                                    onChange={e => handleFilterChange({ quantityFrom: e.target.value })}
                                />
                            </div>
                            <div className="w-[100px]">
                                <Input
                                    label="Đến"
                                    type="number"
                                    value={filters.quantityTo}
                                    onChange={e => handleFilterChange({ quantityTo: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-200 dark:border-gray-700">
                            <TableRow className="bg-gray-50 dark:bg-gray-700">
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white min-w-[120px]"
                                >
                                    Ảnh tủ điện
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white"
                                >
                                    Tên tủ điện
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white"
                                >
                                    Số lượng còn
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white"
                                >
                                    Giá gốc
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white min-w-[120px]"
                                >
                                    Khuyến mãi
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white"
                                >
                                    Trạng thái hiển thị
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white"
                                >
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
                                    <TableCell className="px-5 py-4 text-center items-center text-theme-sm">
                                        <img
                                            src={getMainImage(product.images || [])}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm max-w-[200px]">
                                        <TooltipText maxWidth="max-w-xs">{product.name || "—"}</TooltipText>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start min-w-[130px]">
                                        {typeof product.quantity === "number" ? (
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    product.quantity === 0
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                        : product.quantity < 5
                                                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                }`}
                                            >
                                                {product.quantity === 0 ? "Hết hàng" : `${product.quantity} sản phẩm`}
                                            </span>
                                        ) : (
                                            <TooltipText maxWidth="max-w-xs">Không xác định</TooltipText>
                                        )}
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
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                !product.isHidden
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            }`}
                                        >
                                            {!product.isHidden ? "Hiển thị" : "Đã ẩn"}
                                        </span>
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

            <Modal
                size={isFullScreen ? "full" : "xl"}
                isOpen={!!editedProduct || isCreateMode}
                isFullscreen={isFullScreen}
                onClose={handleCloseModal}
                setIsFullScreen={setIsFullScreen}
            >
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
        </div>
    );
}
