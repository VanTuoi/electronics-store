import { memo } from "react";
import PageBreadcrumb from "~/components/admin/common/page-bread-crumb";
import PageMeta from "~/components/admin/common/page-meta";
import ProductsTable from "~/components/admin/products/products-table";

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
