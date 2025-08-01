import { memo } from "react";
import { Helmet } from "react-helmet";

import { CategoriesTable, PageBreadcrumb, PageMeta } from "~/components/admin";

const Categories = memo(() => (
  <>
    <Helmet>
      <title>Danh mục tủ điện | Admin</title>
      <meta name="description" content="Quản lý danh mục các loại tủ điện trong hệ thống." />
    </Helmet>

    <PageMeta title="Danh mục tủ điện" description="" />
    <PageBreadcrumb pageTitle="Danh mục tủ điện" />
    <div className="space-y-6">
      <CategoriesTable />
    </div>
  </>
));

export default Categories;
