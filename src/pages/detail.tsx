import { memo } from "react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { ProductDetails } from "~/components/pages";

const Detail = memo(() => (
    <>
        <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Chi tiết sản phẩm" />
        <ProductDetails />
    </>
));

export default Detail;
