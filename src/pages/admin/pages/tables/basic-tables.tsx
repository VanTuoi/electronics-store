import ComponentCard from "../../components/common/component-card";
import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";
import BasicTableOne from "../../components/tables/basic-tables/btasic-table-one";

export default function BasicTables() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Basic Tables" />
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">
                    <BasicTableOne />
                </ComponentCard>
            </div>
        </>
    );
}
