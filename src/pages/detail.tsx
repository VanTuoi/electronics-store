import { memo } from "react";
import { Helmet } from "react-helmet";

import { Breadcrumbs } from "~/components/common";
import { ProductDetails } from "~/components/pages";

const Detail = memo(() => (
  <>
    <Helmet>
      <title>Chi tiết sản phẩm | Electronics Store</title>
      <meta name="description" content="Chi tiết sản phẩm của chúng tôi tại Electronics Store." />
    </Helmet>
    <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Chi tiết sản phẩm" />
    <ProductDetails />
  </>
));

export default Detail;
