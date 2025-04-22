import { useState } from "react";
import { LoadingBox } from "~/components/common";
import { useGetProducts } from "~/hooks/products/use-products";
import { useGetCategories } from "~/pages/admin/hooks/use-categories";
import { ProductPagination } from "./pagination";
import { ProductGrid } from "./product-grid";

const CURRENT_PAGE = 1;
const DEFAULT_LIMIT = 5;

const PRICE_RANGES = [
    { label: "Dưới 5 triệu", min: 0, max: 5000000 },
    { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
    { label: "Trên 10 triệu", min: 10000000, max: undefined }
];

const SORT_OPTIONS = [
    { label: "Giá tăng dần", value: "price-asc" },
    { label: "Giá giảm dần", value: "price-desc" },
    { label: "Mới nhất", value: "newest" },
    { label: "Cũ nhất", value: "oldest" }
];

export const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<{ min?: number; max?: number }>({});
    const [selectedSort, setSelectedSort] = useState("");
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
    const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);

    const { data: categories } = useGetCategories();
    const {
        data: products,
        meta,
        loading
    } = useGetProducts({
        search: searchQuery,
        categoryId: selectedCategories,
        minPrice: selectedPriceRange.min,
        maxPrice: selectedPriceRange.max,
        sortBy: selectedSort,
        page: currentPage,
        limit: currentLimit
    });

    const handleSearch = () => setSearchQuery(inputValue.trim());
    const handlePageChange = (page: number) => setCurrentPage(page);

    const activeFilters = [
        ...selectedCategories.map(id => categories?.find(c => c.id === id)?.name || ""),
        ...(selectedPriceRange.min || selectedPriceRange.max
            ? [`${selectedPriceRange.min || 0} - ${selectedPriceRange.max || "∞"}`]
            : []),
        selectedSort ? SORT_OPTIONS.find(o => o.value === selectedSort)?.label : ""
    ].filter(Boolean);

    return (
        <section className="ftco-section ftco-no-pt bg-light">
            <div className="container">
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
                                {categories?.map(category => (
                                    <li key={category.id}>
                                        <button
                                            className={`dropdown-item ${selectedCategories.includes(category.id) ? "active" : ""}`}
                                            onClick={() =>
                                                setSelectedCategories(prev =>
                                                    prev.includes(category.id)
                                                        ? prev.filter(id => id !== category.id)
                                                        : [...prev, category.id]
                                                )
                                            }
                                        >
                                            {category.name}
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
                                {PRICE_RANGES.map((range, idx) => (
                                    <li key={idx}>
                                        <button
                                            className={`dropdown-item ${
                                                selectedPriceRange.min === range.min &&
                                                selectedPriceRange.max === range.max
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedPriceRange({
                                                    min: range.min,
                                                    max: range.max
                                                })
                                            }
                                        >
                                            {range.label}
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
                                {SORT_OPTIONS.map(option => (
                                    <li key={option.value}>
                                        <button
                                            className={`dropdown-item ${selectedSort === option.value ? "active" : ""}`}
                                            onClick={() => setSelectedSort(option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-left mt-3">
                    <div className="col-md-12 text-left">
                        {activeFilters.length > 0 && (
                            <>
                                <div>Lọc theo:</div>
                                <div className="d-flex flex-wrap gap-2">
                                    {activeFilters.map((filter, idx) => (
                                        <span key={idx} className="badge bg-primary p-2 d-flex align-items-center">
                                            {filter}
                                            <button
                                                className="btn btn-sm text-white ms-2"
                                                onClick={() => {
                                                    if (typeof filter === "string" && filter.includes("-")) {
                                                        setSelectedPriceRange({});
                                                    } else if (categories?.some(c => c.name === filter)) {
                                                        setSelectedCategories(prev =>
                                                            prev.filter(
                                                                id =>
                                                                    id !== categories?.find(c => c.name === filter)?.id
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedSort("");
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </span>
                                    ))}
                                    <button
                                        className="btn text-secondary"
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            setSelectedPriceRange({});
                                            setSelectedSort("");
                                        }}
                                    >
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
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSearch()}
                            />
                            <button
                                className="custom-button bg-secondary"
                                type="button"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "Đang tìm..." : "Tìm kiếm"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    {loading ? (
                        <LoadingBox height="150px" width="100%" />
                    ) : products?.length === 0 ? (
                        <div className="col-md-12 text-center text-secondary mt-3">Không tìm thấy sản phẩm</div>
                    ) : (
                        <>
                            <ProductGrid products={products} />
                            <ProductPagination
                                currentLimit={currentLimit}
                                setCurrentLimit={setCurrentLimit}
                                currentPage={currentPage || meta?.page || 1}
                                totalPages={meta?.pages || 1}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
