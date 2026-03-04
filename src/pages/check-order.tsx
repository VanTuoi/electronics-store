import { Helmet } from "react-helmet";

import { Breadcrumbs } from "~/components/common";
import { CheckOrder } from "~/components/pages";

const CheckOrderPage = () => (
  <>
    <Helmet>
      <title>Kiểm tra đơn hàng | Electronics Store</title>
      <meta name="description" content="Theo dõi và kiểm tra trạng thái đơn hàng bạn đã đặt tại Electronics Store." />
    </Helmet>

    <Breadcrumbs breadcrumbs={[["Kiểm tra đơn hàng", "/check"]]} title="Kiểm tra đơn hàng" />
    <CheckOrder />
  </>
);

export default CheckOrderPage;
