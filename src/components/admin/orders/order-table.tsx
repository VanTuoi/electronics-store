import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useCreateOrders, useDeleteOrders, useGetOrders, useUpdateOrder } from "~/hooks/orders/use-order";
import { Option, Order, OrderFormData, orderSchema } from "~/types";
import { formatCurrency } from "~/utils/price-utils";

import Input from "../form/input/input-field";
import Select from "../form/select";
import Button from "../ui/button/button";
import ConfirmDeleteButton from "../ui/button/delete-button";
import { Modal } from "../ui/modal";
import { SkeletonBox } from "../ui/skelenton/skeleton-box";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";

const statusOptions: Option[] = [
  { label: "Tất cả", value: "" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đã xác nhận", value: "confirmed" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã hủy", value: "cancelled" }
];

export const OrderTable = () => {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    orderId: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const { data: orders, loading: isSearching, refetch } = useGetOrders(filters);
  const { deleteOrder, loading: isDeleting } = useDeleteOrders(() => {
    setIsModalOpen(false);
    reset();
  });
  const { createOrders, loading: isCreating } = useCreateOrders(() => {
    setIsModalOpen(false);
    reset();
  });
  const { updateOrder, loading: isUpdating } = useUpdateOrder(() => {
    setIsModalOpen(false);
    reset();
  });

  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (statusOptions.some(option => option.value === status)) {
      setFilters(prev => ({ ...prev, status: status || "" }));
    }
  }, [status, refetch]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
      note: "",
      status: "pending",
      adminNote: "",
      products: [
        {
          id: "",
          price: 0,
          quantity: 1
        }
      ],
      shippingFee: 0
    }
  });

  // const openCreateModal = () => {
  //     reset({
  //         name: "",
  //         phone: "",
  //         address: "",
  //         email: "",
  //         note: "",
  //         status: "pending",
  //         adminNote: "",
  //         products: [
  //             {
  //                 id: "",
  //                 price: 0,
  //                 quantity: 1
  //             }
  //         ]
  //     });
  //     shippingFee: 0;
  //     setEditingOrder(null);
  //     setIsCreateMode(true);
  //     setIsModalOpen(true);
  // };

  const handleRowClick = (order: Order) => {
    setValue("name", order.name);
    setValue("phone", order.phone);
    setValue("address", order.address);
    setValue("email", order.email || "");
    setValue("note", order.note || "");
    setValue("status", order.status || "pending");
    setValue("adminNote", order.adminNote || "");
    setValue(
      "products",
      order.products.map(p => ({
        id: p.id,
        name: p.name || "",
        price: p.price,
        originalPrice: p.originalPrice || p.price,
        quantity: p.quantity
      }))
    );
    setValue(
      "createdAt",
      order.createdAt
        ? format(new Date(order.createdAt), "yyyy-MM-dd'T'HH:mm:ss")
        : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
    );
    setValue(
      "updatedAt",
      order.updatedAt
        ? format(new Date(order.updatedAt), "yyyy-MM-dd'T'HH:mm:ss")
        : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
    );
    setEditingOrder(order);
    setIsCreateMode(false);
    setIsModalOpen(true);
  };

  const onSubmit = (data: OrderFormData) => {
    if (isCreateMode) {
      createOrders(data);
    } else if (editingOrder) {
      updateOrder({ id: editingOrder.id, ...data });
    }
  };

  const handleDelete = () => {
    if (editingOrder) {
      deleteOrder(editingOrder);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 w-full">
        <div className="flex flex-col gap-4">
          {/* <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Đơn hàng</h2>
                        <Button
                            onClick={openCreateModal}
                            className="h-[42px] bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                        >
                            Thêm đơn hàng
                        </Button>
                    </div> */}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 max-w-[250px]">
              <Input
                label="Tìm kiếm theo tên hoặc SĐT"
                value={filters.search}
                onChange={e => handleFilterChange({ search: e.target.value })}
                className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex-1 max-w-[250px]">
              <Input
                label="Tìm kiếm theo ID đơn hàng"
                value={filters.orderId}
                onChange={e => handleFilterChange({ orderId: e.target.value })}
                className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex-1 max-w-[200px]">
              <Select
                options={statusOptions}
                placeholder="Chọn trạng thái"
                onValueChange={value => handleFilterChange({ status: value })}
                value={filters.status}
                label="Trạng thái đơn hàng"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-200 dark:border-gray-700">
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Họ và tên
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Số điện thoại
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Địa chỉ
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Trạng thái
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Số sản phẩm của đơn
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Ngày tạo
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-sm text-start text-gray-900 dark:text-white">
                  Ngày cập nhật
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isSearching ? (
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell colSpan={8} className="px-5 py-4">
                    <SkeletonBox height="2.5rem" className="bg-gray-200 dark:bg-gray-600" />
                  </TableCell>
                </TableRow>
              ) : (
                orders &&
                orders?.map(order => (
                  <TableRow
                    key={order.id}
                    onClick={() => handleRowClick(order)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                      <TooltipText maxWidth="max-w-[200px]">{order.name || "—"}</TooltipText>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm">{order.phone || "—"}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                      <TooltipText maxWidth="max-w-[200px]">{order.address || "—"}</TooltipText>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start min-w-[130px]">
                      {order.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : order.status === "confirmed"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : order.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {order.status === "pending" && "Chờ xác nhận"}
                          {order.status === "confirmed" && "Đã xác nhận"}
                          {order.status === "completed" && "Hoàn thành"}
                          {order.status === "cancelled" && "Đã hủy"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                      <TooltipText maxWidth="max-w-[200px]">
                        {order.products?.length ? `${order.products.length} sản phẩm` : "—"}
                      </TooltipText>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                      {order?.createdAt ? format(new Date(order.createdAt), "HH:mm dd/MM/yyyy") : "—"}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                      {order?.updatedAt ? format(new Date(order.updatedAt), "HH:mm dd/MM/yyyy") : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal size="xl" isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isCreateMode ? "Thêm đơn hàng mới" : "Chỉnh sửa đơn hàng"}
          </h2>

          {!isCreateMode && (
            <div className="flex flex-col gap-2">
              <label htmlFor="order-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ID đơn hàng
              </label>
              <Input
                id="order-id"
                value={editingOrder?.id || ""}
                disabled
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Họ và tên *
              </label>
              <Input
                id="name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Nhập họ và tên khách hàng"
                disabled={!isCreateMode}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Số điện thoại *
              </label>
              <Input
                id="phone"
                {...register("phone")}
                error={errors.phone?.message}
                placeholder="Nhập số điện thoại"
                disabled={!isCreateMode}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Địa chỉ *
              </label>
              <Input
                id="address"
                {...register("address")}
                error={errors.address?.message}
                placeholder="Nhập địa chỉ"
                disabled={!isCreateMode}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                id="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Nhập email"
                disabled={!isCreateMode}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ghi chú của khách hàng
            </label>
            <textarea
              id="note"
              {...register("note")}
              disabled={!isCreateMode}
              className={`rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 ${!isCreateMode ? "cursor-not-allowed opacity-90 bg-gray-100" : ""}`}
              placeholder="Nhập ghi chú (nếu có)"
              rows={3}
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sản phẩm</h3>
            {editingOrder?.products?.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`product-id-${index}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ID Sản phẩm
                  </label>
                  <Input
                    id={`product-id-${index}`}
                    {...register(`products.${index}.id`)}
                    error={errors.products?.[index]?.id?.message}
                    disabled={!isCreateMode}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`product-id-${index}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tên sản phẩm
                  </label>
                  <Input
                    id={`product-name-${index}`}
                    {...register(`products.${index}.name`)}
                    disabled={!isCreateMode}
                    error={errors.products?.[index]?.name?.message}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`product-price-${index}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Giá
                  </label>
                  <Input
                    id={`product-price-${index}`}
                    type="number"
                    {...register(`products.${index}.price`, { valueAsNumber: true })}
                    error={errors.products?.[index]?.price?.message}
                    disabled={!isCreateMode}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`product-quantity-${index}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Số lượng
                  </label>
                  <Input
                    id={`product-quantity-${index}`}
                    type="number"
                    {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                    error={errors.products?.[index]?.quantity?.message}
                    disabled={!isCreateMode}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            ))}
            <p className="text-right">Phí vận chuyển: {formatCurrency(editingOrder?.shippingFee || 0)}</p>
            <p className="text-right">
              Tổng số tiền:{" "}
              {formatCurrency(
                (editingOrder?.products?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) || 0) +
                  (editingOrder?.shippingFee || 0)
              )}
            </p>
          </div>

          {!isCreateMode && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trạng thái
                  </label>
                  <select
                    id="status"
                    {...register("status")}
                    className="rounded border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="adminNote" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ghi chú của quản trị viên
                </label>
                <textarea
                  id="adminNote"
                  {...register("adminNote")}
                  className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder="Nhập ghi chú quản trị (nếu có)"
                  rows={3}
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="submit"
              loading={isCreating || isUpdating}
              disabled={isCreating || isUpdating}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded"
            >
              {isCreateMode ? "Tạo đơn hàng" : "Cập nhật"}
            </Button>
            {!isCreateMode && (
              <ConfirmDeleteButton
                loading={isDeleting}
                title="Bạn chắc chắn muốn xóa đơn hàng này không?"
                name="Xóa đơn hàng"
                onConfirm={handleDelete}
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              />
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};
