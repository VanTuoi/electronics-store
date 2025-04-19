import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";
import OrderTable from "../../components/orsers/order-table";

export default function Schedules() {
    return (
        <>
            <PageMeta title="Đơn hàng" description="" />
            <PageBreadcrumb pageTitle="Đơn hàng" />
            <div className="space-y-6">
                <OrderTable />
            </div>
        </>
    );
}
