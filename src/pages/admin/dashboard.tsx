import { memo } from "react";

import { EcommerceMetrics, MonthlySalesChart, MonthlyTarget, PageMeta, StatisticsChart } from "~/components/admin";

const Home = memo(() => (
  <>
    <PageMeta title="Electronic Store" description="Trang quản trị chính của cửa hàng" />

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
