import { memo } from "react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { CheckOrder } from "~/components/pages/check-order";

const CheckOrderPage = memo(() => (
    <>
        <Breadcrumbs breadcrumbs={[["Kiểm tra đơn hàng", "/check"]]} title="Kiểm tra đơn hàng" />
        <CheckOrder />
    </>
));

export default CheckOrderPage;
