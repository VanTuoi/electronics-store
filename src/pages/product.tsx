import { memo } from "react";

import { Breadcrumbs } from "~/components/common";
import { Search } from "~/components/pages";

const Product = memo(() => (
  <>
    <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Lựa chọn tủ điện" />
    <Search />
  </>
));

export default Product;
