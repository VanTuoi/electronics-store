import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingBox } from "~/components/common";
import { useProduct, useSearch } from "~/hooks";
import ProductListWithPagination from "./product-list-with-pagination";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { loading: loadingSearch, products: searchedProducts } = useSearch(searchTerm);
    const { data: allProducts, isLoading: loadingProducts } = useProduct();

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const filterOptions = ["Tủ điện công nghiệp", "Tủ điện dân dụng", "Tủ điện hạ thế"];
    const filterRangeOptions = ["Dưới 5 triệu", "5 - 10 triệu", "Trên 10 triệu"];
    const sortOptions = ["Giá tăng dần", "Giá giảm dần", "Mới nhất", "Cũ nhất"];

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev => (prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]));
    };

    const removeFilter = (filter: string) => {
        if (filter === "all") {
            setSelectedFilters([]);
        } else {
            setSelectedFilters(selectedFilters.filter(f => f !== filter));
        }
    };

    return (
        <section className="ftco-section ftco-no-pt bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 heading-section text-center mb-2 mt-5">
                        <h3>Tìm kiếm tủ điện phù hợp với nhu cầu của bạn</h3>
                    </div>
                </div>

                <div className="row justify-content-left mt-3">
                    <div className="col-md-8 text-left d-flex">
                        <div className="dropdown me-1">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                Loại tủ điện
                            </button>
                            <ul className="dropdown-menu">
                                {filterOptions.map((filter, index) => (
                                    <li key={index}>
                                        <button
                                            className={`btn dropdown-item ${selectedFilters.includes(filter) ? "active" : ""}`}
                                            onClick={() => toggleFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown me-1">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                Mức giá
                            </button>
                            <ul className="dropdown-menu">
                                {filterRangeOptions.map((filter, index) => (
                                    <li key={index}>
                                        <button
                                            className={`btn dropdown-item ${selectedFilters.includes(filter) ? "active" : ""}`}
                                            onClick={() => toggleFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown me-1">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                Sắp xếp theo
                            </button>
                            <ul className="dropdown-menu">
                                {sortOptions.map((filter, index) => (
                                    <li key={index}>
                                        <button
                                            className={`btn dropdown-item ${selectedFilters.includes(filter) ? "active" : ""}`}
                                            onClick={() => toggleFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-left mt-3">
                    <div className="col-md-12 text-left">
                        {selectedFilters.length > 0 && (
                            <>
                                <div>Lọc theo:</div>
                                <div className="d-flex flex-wrap gap-2">
                                    {selectedFilters.map((filter, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-primary p-1 pl-2 mr-1 mb-1 text-white d-flex align-items-center"
                                        >
                                            {filter}
                                            <button
                                                className="btn btn-sm text-white ms-2"
                                                onClick={() => removeFilter(filter)}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </span>
                                    ))}
                                    <button className="btn text-secondary" onClick={() => removeFilter("all")}>
                                        Xóa tất cả
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-8">
                        <div className="custom-input-group">
                            <input
                                type="text"
                                className="form-control custom-input"
                                placeholder="Tìm tủ điện phù hợp..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && setSearchTerm(searchTerm)}
                            />
                            <button
                                className="custom-button bg-secondary"
                                type="button"
                                onClick={() => setSearchTerm(searchTerm)}
                            >
                                {!loadingSearch ? "Tìm kiếm" : "Đang tìm..."}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    {loadingProducts || loadingSearch ? (
                        <LoadingBox height="150px" width="100%" className="mb-3" />
                    ) : !searchedProducts || (searchedProducts.length === 0 && searchTerm !== "") ? (
                        <div className="col-md-12 text-center text-secondary mt-3 d-flex flex-direction-column align-items-center justify-content-center">
                            Không tìm thấy sản phẩm mong muốn. &nbsp;
                            <Link className="link" to={"/"}>
                                Bạn cần thiết kế riêng ?
                            </Link>
                        </div>
                    ) : (
                        <ProductListWithPagination
                            products={
                                searchedProducts.length !== 0 && searchTerm !== "" ? searchedProducts : allProducts
                            }
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
