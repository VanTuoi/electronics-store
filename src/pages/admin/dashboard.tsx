import { EcommerceMetrics, PageMeta } from "~/components/admin";

const Home = () => (
  <>
    <PageMeta title="Electronic Store" description="Trang quản trị chính của cửa hàng" />

    <div className="grid grid-cols-12 gap-2 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <EcommerceMetrics />
        {/* <MonthlySalesChart /> */}
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}
    </div>
  </>
);

export default Home;
