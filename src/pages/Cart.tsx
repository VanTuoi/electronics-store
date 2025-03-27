import { Breadcrumbs } from "~/components/Breadcrumbs";
import { Cart } from "~/components/pages/cart/cart";

const CartPage = () => (
    <>
        <Breadcrumbs breadcrumbs={[["Giỏ hàng", "/cart"]]} title="Giỏ hàng của bạn" />
        <Cart />
    </>
);

export default CartPage;
