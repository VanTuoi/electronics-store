import { memo } from "react";
import { Helmet } from "react-helmet";

import { PageBreadcrumb, PageMeta, ScheduleTable } from "~/components/admin";

const Schedules = memo(() => (
  <>
    <Helmet>
      <title>Quản lý lịch tư vấn hỗ trợ | Admin</title>
      <meta name="description" content="Quản lý lịch tư vấn hỗ trợ trong hệ thống." />
    </Helmet>
    <PageMeta title="Yêu cầu tư vấn hỗ trợ" description="" />
    <PageBreadcrumb pageTitle="Yêu cầu tư vấn hỗ trợ" />
    <div className="space-y-6">
      <ScheduleTable />
    </div>
  </>
));

export default Schedules;
