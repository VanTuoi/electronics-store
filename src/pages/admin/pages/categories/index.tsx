import CategoriesTable from "../../components/categories/categories-table";
import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";

export default function Categories() {
    return (
        <>
            <PageMeta title="Danh mục tủ điện" description="" />
            <PageBreadcrumb pageTitle="Danh mục tủ điện" />
            <div className="space-y-6">
                <CategoriesTable />
            </div>
        </>
    );
}
