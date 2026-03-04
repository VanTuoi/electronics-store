import { CategoriesTable, PageBreadcrumb, PageMeta } from "~/components/admin";

const Categories = () => (
  <>
    <PageMeta title="Danh mục tủ điện" description="Quản lý danh mục các loại tủ điện trong hệ thống" />
    <PageBreadcrumb pageTitle="Danh mục tủ điện" />
    <div className="space-y-6">
      <CategoriesTable />
    </div>
  </>
);

export default Categories;
