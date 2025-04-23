import { memo } from "react";
import PageBreadcrumb from "~/components/admin/common/page-bread-crumb";
import PageMeta from "~/components/admin/common/page-meta";
import { ScheduleTable } from "~/components/admin/schedule/schedule-table";

const Schedules = memo(() => (
    <>
        <PageMeta title="Yêu cầu tư vấn hỗ trợ" description="" />
        <PageBreadcrumb pageTitle="Yêu cầu tư vấn hỗ trợ" />
        <div className="space-y-6">
            <ScheduleTable />
        </div>
    </>
));

export default Schedules;
