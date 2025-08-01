import { memo } from "react";

import { Breadcrumbs } from "~/components/common";
import { Cart } from "~/components/pages";

const CartPage = memo(() => (
  <>
    <Breadcrumbs breadcrumbs={[["Giỏ hàng", "/cart"]]} title="Giỏ hàng của bạn" />
    <Cart />
  </>
));

export default CartPage;
