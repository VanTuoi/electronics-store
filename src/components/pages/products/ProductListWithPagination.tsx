import React, { useState } from "react";
import { ProductCardProps } from "~/types";
import ProductCard from "./ProductCard";

const products: ProductCardProps[] = Array.from({ length: 23 }, (_, index) => ({
    id: `TD-${index + 1}`,
    name: `Tủ điện số ${index + 1}`,
    price: `${(index + 1) * 1000000}đ`,
    category: index % 2 === 0 ? "Tủ điều khiển" : "Tủ phân phối",
    imageUrl: `./imgs/product.png`
}));

const ITEMS_PER_PAGE = 8;

const ProductListWithPagination: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="row g-4">
                {paginatedProducts.map(product => (
                    <div key={product.id} className="col-md-3">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>

            <nav className="mt-4 d-flex justify-content-center">
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ProductListWithPagination;
