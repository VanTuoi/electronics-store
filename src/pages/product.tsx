import { memo } from "react";
import { Helmet } from "react-helmet";

import { Breadcrumbs } from "~/components/common";
import { Search } from "~/components/pages";

const Product = memo(() => (
  <>
    <Helmet>
      <title>Lựa chọn tủ điện | Electronics Store</title>
      <meta name="description" content="Xem danh sách sản phẩm của chúng tôi" />
    </Helmet>
    <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Lựa chọn tủ điện" />
    <Search />
  </>
));

export default Product;
