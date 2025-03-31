import { Breadcrumbs } from "~/components/breadcrumbs";
import { ProductDetails } from "~/components/pages";

const Detail = () => (
    <>
        <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Chi tiết sản phẩm" />
        <ProductDetails />
    </>
);

export default Detail;
