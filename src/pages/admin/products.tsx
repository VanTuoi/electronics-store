import { memo } from "react";

import { PageBreadcrumb, PageMeta, ProductsTable } from "~/components/admin";

const Products = memo(() => (
  <>
    <PageMeta title="Tủ điện" description="" />
    <PageBreadcrumb pageTitle="Danh sách tủ điện" />
    <div className="space-y-6">
      <ProductsTable />
    </div>
  </>
));

export default Products;
