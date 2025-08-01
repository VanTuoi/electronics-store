import { OrderTable, PageBreadcrumb, PageMeta } from "~/components/admin";

const Schedules = () => (
  <>
    <PageMeta title="Đơn hàng" description="Quản lý đơn hàng trong hệ thống." />
    <PageBreadcrumb pageTitle="Đơn hàng" />
    <div className="space-y-6">
      <OrderTable />
    </div>
  </>
);

export default Schedules;
