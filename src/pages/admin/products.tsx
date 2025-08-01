import { memo } from "react";
import { Helmet } from "react-helmet";

import { PageBreadcrumb, PageMeta, ProductsTable } from "~/components/admin";

const Products = memo(() => (
  <>
    <Helmet>
      <title>Quản lý sản phẩm | Admin</title>
      <meta name="description" content="Quản lý sản phẩm trong hệ thống." />
    </Helmet>
    <PageMeta title="Tủ điện" description="" />
    <PageBreadcrumb pageTitle="Danh sách tủ điện" />
    <div className="space-y-6">
      <ProductsTable />
    </div>
  </>
));

export default Products;
