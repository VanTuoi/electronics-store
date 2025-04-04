import { Breadcrumbs } from "~/components/breadcrumbs";
import { Checkout } from "~/components/pages";

const CheckoutPage = () => (
    <>
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
