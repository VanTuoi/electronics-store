import { PageBreadcrumb, PageMeta, ProductsTable } from "~/components/admin";

const Products = () => (
  <>
    <PageMeta title="Tủ điện" description="Quản lý sản phẩm trong hệ thống." />
    <PageBreadcrumb pageTitle="Danh sách tủ điện" />
    <div className="space-y-6">
      <ProductsTable />
    </div>
  </>
);

export default Products;
