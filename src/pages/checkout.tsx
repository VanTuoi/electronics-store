import { Helmet } from "react-helmet";

import { Breadcrumbs } from "~/components/common";
import { Checkout } from "~/components/pages";

const CheckoutPage = () => (
  <>
    <Helmet>
      <title>Thanh toán | Electronics Store</title>
      <meta name="description" content="Hoàn tất quá trình thanh toán đơn hàng của bạn tại Electronics Store." />
    </Helmet>

    <Breadcrumbs
      breadcrumbs={[
        ["Giỏ hàng", "/cart"],
        ["Thanh toán", "/check-out"]
      ]}
      title="Thanh toán đơn hàng"
    />
    <Checkout />
  </>
);

export default CheckoutPage;
