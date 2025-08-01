import { memo } from "react";

import { OrderTable, PageBreadcrumb, PageMeta } from "~/components/admin";

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
