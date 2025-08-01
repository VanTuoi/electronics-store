import { memo } from "react";
import { Helmet } from "react-helmet";

import { Breadcrumbs } from "~/components/common";
import { Cart } from "~/components/pages";

const CartPage = memo(() => (
  <>
    <Helmet>
      <title>Giỏ hàng | Electronics Store</title>
      <meta name="description" content="Xem và chỉnh sửa các sản phẩm trong giỏ hàng của bạn." />
    </Helmet>

    <Breadcrumbs breadcrumbs={[["Giỏ hàng", "/cart"]]} title="Giỏ hàng của bạn" />
    <Cart />
  </>
));

export default CartPage;
