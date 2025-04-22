import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";
import ProductsTable from "../../components/products/products-table";

export default function Products() {
    return (
        <>
            <PageMeta title="Tủ điện" description="" />
            <PageBreadcrumb pageTitle="Danh sách tủ điện" />
            <div className="space-y-6">
                <ProductsTable />
            </div>
        </>
    );
}
