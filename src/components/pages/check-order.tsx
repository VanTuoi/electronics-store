import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetOrderById } from "~/hooks/orders/use-order";
import { formatCurrency } from "~/utils/price-utils";

export const CheckOrder = () => {
    const [searchParams] = useSearchParams();
    const idFromUrl = searchParams.get("id");
    const [orderId, setOrderId] = useState(idFromUrl || "");

    const { data: order, loading, error, refetch } = useGetOrderById(orderId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            refetch();
        }
    };

    const formatDate = (date?: Date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-warning text-dark";
            case "confirmed":
                return "bg-info text-white";
            case "completed":
                return "bg-success text-white";
            case "cancelled":
                return "bg-danger text-white";
            default:
                return "bg-secondary text-white";
        }
    };

    const statusTranslations: Record<string, string> = {
        pending: "Đang chờ xác nhận",
        confirmed: "Đã xác nhận",
        completed: "Đã hoàn thành",
        cancelled: "Đã hủy"
    };

    const translateStatus = (status: string) => statusTranslations[status] || status;

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card rounded-4">
                        <div className="card-header text-white">
                            <h4 className="mb-0">Kiểm tra đơn hàng</h4>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="input-group shadow rounded-pill overflow-hidden">
                                    <input
                                        type="text"
                                        className="form-control border-0 py-3 px-4"
                                        placeholder="Nhập mã đơn hàng..."
                                        value={orderId}
                                        onChange={e => setOrderId(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary px-4 text-nowrap"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang tìm...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-search me-2"></i>
                                                Tìm kiếm
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {order && (
                                <div className="mt-4">
                                    <h4 className="mb-3">Chi tiết</h4>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <h5>Thông tin khách hàng</h5>
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th>Mã đơn</th>
                                                        <td>{order.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tên khách hàng</th>
                                                        <td>{order.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Số điện thoại</th>
                                                        <td>{order.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{order.email || "Không có"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Địa chỉ nhận</th>
                                                        <td>{order.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Trạng thái</th>
                                                        <td>
                                                            <span className={`badge ${getStatusBadge(order.status)}`}>
                                                                {translateStatus(order.status)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Thông tin đơn hàng</h5>
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th>Ngày tạo đơn hàng</th>
                                                        <td>{formatDate(order.createdAt)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Ghi chú của khách hàng</th>
                                                        <td>{order.note || "Không có"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <h5 className="mb-3">Sản phẩm</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th className="text-center">Tên</th>
                                                    <th className="text-center">Đơn giá</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-center">Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.products.map(product => (
                                                    <tr key={product.id}>
                                                        <td>{product.name || `Product ${product.id}`}</td>
                                                        <td className="text-center">
                                                            {formatCurrency(product.price.toFixed(2))}
                                                        </td>
                                                        <td className="text-center">{product.quantity}</td>
                                                        <td className="text-end">
                                                            {formatCurrency(
                                                                (product.price * product.quantity).toFixed(2)
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th colSpan={3} className="text-end">
                                                        Phí vận chuyển
                                                    </th>
                                                    <th className="text-end">{formatCurrency(order.shippingFee)}</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={3} className="text-end">
                                                        Tổng số tiền thanh toán
                                                    </th>
                                                    <th className="text-end">
                                                        {formatCurrency(
                                                            (
                                                                order.products.reduce(
                                                                    (sum, product) =>
                                                                        sum + product.price * product.quantity,
                                                                    0
                                                                ) + order.shippingFee
                                                            ).toFixed(2)
                                                        )}
                                                    </th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {!order && !loading && error && (
                                <div className="text-center text-muted py-4">
                                    <h5>Không có dữ liệu</h5>
                                    <p>Vui lòng nhập mã đơn hàng khác để tìm kiếm</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
