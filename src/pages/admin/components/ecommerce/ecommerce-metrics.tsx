import { useNavigate } from "react-router-dom";
import { useGetSchedules } from "~/hooks/schedules/use-schedule";
import { useGetCategories } from "../../hooks/use-categories";
import { useGetProducts } from "../../hooks/use-products";
import { BoxIconLine, GroupIcon } from "../../icons";
import Badge from "../ui/badge/badge";

export default function EcommerceMetrics() {
    const navigate = useNavigate();
    const { data: dataSchedules } = useGetSchedules();
    const { data: dataCategories } = useGetCategories();
    const { data: dataProducts } = useGetProducts();

    const pendingSchedules = dataSchedules?.filter(item => item.status === "pending");

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                    navigate(`schedules?status=${pendingSchedules && pendingSchedules?.length > 0 ? "pending" : ""}`)
                }
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ")
                        navigate(
                            `schedules?status=${pendingSchedules && pendingSchedules?.length > 0 ? "pending" : ""}`
                        );
                }}
            >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-md text-gray-800 dark:text-gray-400">Hẹn tư vấn hỗ trợ</span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {dataSchedules?.length ? dataSchedules.length : 0}
                        </h4>
                    </div>
                    {pendingSchedules && pendingSchedules.length > 0 ? (
                        <Badge color="warning">{pendingSchedules.length} chờ xử lý</Badge>
                    ) : pendingSchedules && pendingSchedules.length === 0 ? (
                        <Badge color="success">Đã xử lý tất cả</Badge>
                    ) : (
                        <Badge color="warning">Chưa có lịch hẹn</Badge>
                    )}
                </div>
            </div>

            {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-md text-gray-800 dark:text-gray-400">Đơn hàng</span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">52</h4>
                    </div>

                    <Badge color="error">
                        <ArrowDownIcon />
                        9%
                    </Badge>
                </div>
            </div> */}
            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => navigate("products")}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") navigate("products");
                }}
            >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-md text-gray-800 dark:text-gray-400">Sản phẩm</span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {dataProducts && dataProducts?.length ? dataProducts?.length : 0}
                        </h4>
                    </div>
                    {dataProducts && dataProducts?.length ? (
                        <Badge color="error">2 hết hàng</Badge>
                    ) : (
                        <Badge color="warning">Không có dữ liệu</Badge>
                    )}
                </div>
            </div>
            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => navigate("categories")}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") navigate("categories");
                }}
            >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-md text-gray-800 dark:text-gray-400">Danh mục sản phẩm</span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {dataCategories && dataCategories?.length ? dataCategories?.length : 0}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
