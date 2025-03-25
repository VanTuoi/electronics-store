import { Breadcrumbs } from "~/components/Breadcrumbs";
import { Search } from "~/components/pages";

const Product = () => (
    <>
        <Breadcrumbs breadcrumbs={[["Tủ điện", "/products"]]} title="Lựa chọn tủ điện" />
        <Search />
    </>
);

export default Product;
