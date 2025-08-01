import { memo } from "react";
import { Helmet } from "react-helmet";

import { OrderTable, PageBreadcrumb, PageMeta } from "~/components/admin";

const Schedules = memo(() => (
  <>
    <Helmet>
      <title>Quản lý đơn hàng | Admin</title>
      <meta name="description" content="Quản lý đơn hàng trong hệ thống." />
    </Helmet>
    <PageMeta title="Đơn hàng" description="" />
    <PageBreadcrumb pageTitle="Đơn hàng" />
    <div className="space-y-6">
      <OrderTable />
    </div>
  </>
));

export default Schedules;
