import React, { useState } from "react";
import { Product } from "~/types";
import { ProductGrid } from "./ProductGrid";

const ITEMS_PER_PAGE = 9;

type ProductListWithPaginationProps = {
    products: Product[] | undefined;
};

const ProductListWithPagination: React.FC<ProductListWithPaginationProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (!products) {
        return null;
    }

    const totalPages = Math.ceil(products?.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedProducts = products?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="container">
            <ProductGrid products={paginatedProducts} itemsPerRow={3} maxRows={3} />
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
