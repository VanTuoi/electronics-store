import { memo } from "react";
import CategoriesTable from "~/components/admin/categories/categories-table";
import PageBreadcrumb from "~/components/admin/common/page-bread-crumb";
import PageMeta from "~/components/admin/common/page-meta";

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
