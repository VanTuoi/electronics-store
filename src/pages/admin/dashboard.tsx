import { memo } from "react";
import PageMeta from "~/components/admin/common/page-meta";
import { EcommerceMetrics, MonthlySalesChart, MonthlyTarget, StatisticsChart } from "~/components/admin/ecommerce";

const Home = memo(() => (
    <>
        <PageMeta title="Electronic Store" description="This is admin dashboard of Electronic Store" />
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
        </div>
    </>
));

export default Home;
