import PageMeta from "../../components/common/page-meta";
import EcommerceMetrics from "../../components/ecommerce/ecommerce-metrics";
import MonthlySalesChart from "../../components/ecommerce/monthly-sales-chart";
import MonthlyTarget from "../../components/ecommerce/monthly-target";
import RecentOrders from "../../components/ecommerce/recent-orders";
import StatisticsChart from "../../components/ecommerce/statistics-chart";

export default function Home() {
    return (
        <>
            <PageMeta
                title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics />

                    <MonthlySalesChart />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <MonthlyTarget />
                </div>

                <div className="col-span-12">
                    <StatisticsChart />
                </div>

                <div className="col-span-12">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
}
