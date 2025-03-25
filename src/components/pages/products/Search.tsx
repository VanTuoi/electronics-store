import { useEffect, useState } from "react";
import { useSearch } from "~/hooks/products/useSearch";
import ProductListWithPagination from "./ProductListWithPagination";

export const Search = () => {
    const { loading, products, handleSearch } = useSearch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const filterOptions = ["Tủ điện công nghiệp", "Tủ điện dân dụng", "Tủ điện hạ thế"];

    const filterRangeOptions = ["Dưới 5 triệu", "5 - 10 triệu", "Trên 10 triệu"];

    useEffect(() => {
        console.log("products", products);
    }, [products]);

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prevFilters =>
            prevFilters.includes(filter) ? prevFilters.filter(item => item !== filter) : [...prevFilters, filter]
        );
    };

    const removeFilter = (filter: string) => {
        if (filter === "all") {
            setSelectedFilters([]);
        } else {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        }
    };

    return (
        <section className="ftco-section ftco-no-pt bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 heading-section text-center mb-2 mt-5">
                        <span className="subheading"></span>
                        <h2 className="">Tìm kiếm tủ điện phù hợp với nhu cầu của bạn</h2>
                    </div>
                </div>
                <div className="row justify-content-left mt-3">
                    <div className="col-md-8 text-left d-flex ">
                        <div className="dropdown">
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
                                            className={`btn dropdown-item ${
                                                selectedFilters.includes(filter) ? "active" : ""
                                            }`}
                                            onClick={() => toggleFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dropdown ml-1">
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
                                            className={`btn dropdown-item ${
                                                selectedFilters.includes(filter) ? "active" : ""
                                            }`}
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
                                <div> Lọc theo:</div>
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
                                    <button className="btn" onClick={() => removeFilter("all")}>
                                        Xóa tất cả
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-8">
                        <div className="input-group custom-input-group">
                            <input
                                type="text"
                                className="form-control custom-input"
                                placeholder="Tìm tủ điện phù hợp..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSearch(searchTerm)}
                            />
                            <button
                                className="btn btn-secondary custom-button"
                                onClick={() => handleSearch(searchTerm)}
                            >
                                {!loading ? "Tìm kiếm" : "Đang tìm..."}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-left mt-5">
                    <div className="col-md-12 text-left d-flex ">
                        <ProductListWithPagination />
                    </div>
                    {/* <div className="col-md-8 text-left d-flex ">abc</div> */}
                </div>
            </div>
        </section>
    );
};
