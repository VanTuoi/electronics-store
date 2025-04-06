import BarChartOne from "../../components/charts/bar/bar-chart-one";
import ComponentCard from "../../components/common/component-card";
import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";

export default function BarChart() {
    return (
        <div>
            <PageMeta
                title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Bar Chart" />
            <div className="space-y-6">
                <ComponentCard title="Bar Chart 1">
                    <BarChartOne />
                </ComponentCard>
            </div>
        </div>
    );
}
