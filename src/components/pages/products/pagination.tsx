import React, { memo } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    setCurrentLimit: (limit: number) => void;
    currentLimit: number;
}

export const ProductPagination: React.FC<PaginationProps> = memo(
    ({ currentPage, totalPages, onPageChange, setCurrentLimit, currentLimit }) => {
        const maxVisiblePages = 5;
        const limitOptions = [5, 10, 20, 50];

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newLimit = Number(e.target.value);
            setCurrentLimit(newLimit);
            onPageChange(1);
        };

        return (
            <div className="d-flex justify-content-center align-items-center mt-4">
                <div className="d-flex align-items-center me-3">
                    <label htmlFor="itemsPerPage" className="me-2 mb-0">
                        Hiển thị:
                    </label>
                    <select
                        id="itemsPerPage"
                        className="form-select form-select-sm"
                        style={{ width: "80px" }}
                        value={currentLimit}
                        onChange={handleLimitChange}
                    >
                        {limitOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => onPageChange(1)} aria-label="First">
                                <span aria-hidden="true">Đầu</span>
                            </button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => onPageChange(currentPage - 1)}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <li
                                key={startPage + i}
                                className={`page-item ${currentPage === startPage + i ? "active" : ""}`}
                            >
                                <button className="page-link" onClick={() => onPageChange(startPage + i)}>
                                    {startPage + i}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => onPageChange(currentPage + 1)}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => onPageChange(totalPages)} aria-label="Last">
                                <span aria-hidden="true">Cuối</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
);
