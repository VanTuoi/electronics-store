import { memo } from "react";

import { CategoriesTable, PageBreadcrumb, PageMeta } from "~/components/admin";

const Categories = memo(() => (
  <>
    <PageMeta title="Danh mục tủ điện" description="" />
    <PageBreadcrumb pageTitle="Danh mục tủ điện" />
    <div className="space-y-6">
      <CategoriesTable />
    </div>
  </>
));

export default Categories;
