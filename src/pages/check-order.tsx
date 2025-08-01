import { memo } from "react";

import { Breadcrumbs } from "~/components/common";
import { CheckOrder } from "~/components/pages";

const CheckOrderPage = memo(() => (
  <>
    <Breadcrumbs breadcrumbs={[["Kiểm tra đơn hàng", "/check"]]} title="Kiểm tra đơn hàng" />
    <CheckOrder />
  </>
));

export default CheckOrderPage;
