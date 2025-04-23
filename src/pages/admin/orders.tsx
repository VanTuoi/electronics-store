import { memo } from "react";
import PageBreadcrumb from "~/components/admin/common/page-bread-crumb";
import PageMeta from "~/components/admin/common/page-meta";
import OrderTable from "~/components/admin/orsers/order-table";

const Schedules = memo(() => (
    <>
        <PageMeta title="Đơn hàng" description="" />
        <PageBreadcrumb pageTitle="Đơn hàng" />
        <div className="space-y-6">
            <OrderTable />
        </div>
    </>
));

export default Schedules;
