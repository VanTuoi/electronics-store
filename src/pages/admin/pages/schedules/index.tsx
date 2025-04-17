import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";
import ScheduleTable from "../../components/schedule/schedule-table";

export default function Schedules() {
    return (
        <>
            <PageMeta title="Yêu cầu tư vấn hỗ trợ" description="" />
            <PageBreadcrumb pageTitle="Yêu cầu tư vấn hỗ trợ" />
            <div className="space-y-6">
                <ScheduleTable />
            </div>
        </>
    );
}
