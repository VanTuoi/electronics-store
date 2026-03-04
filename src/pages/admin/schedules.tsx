import { PageBreadcrumb, PageMeta, ScheduleTable } from "~/components/admin";

const Schedules = () => (
  <>
    <PageMeta title="Yêu cầu tư vấn hỗ trợ" description="Quản lý lịch tư vấn hỗ trợ trong hệ thống." />
    <PageBreadcrumb pageTitle="Yêu cầu tư vấn hỗ trợ" />
    <div className="space-y-6">
      <ScheduleTable />
    </div>
  </>
);

export default Schedules;
