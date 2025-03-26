import { useNavigate } from "react-router-dom";
import { Product } from "~/types";
import { formatCurrency } from "~/utils/formatCurrency";

export const ProductCard = ({ id, nameProduct, price, category, imageUrl }: Product) => {
    const navigate = useNavigate();

    const goToDetail = () => navigate(`/products/${id}`);
    const goToCart = () => navigate("/checkout");

    return (
        <div
            className="card shadow-sm rounded border-1 mt-3 mt-md-4 product-card"
            onClick={goToDetail}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") goToDetail();
            }}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
        >
            <img src={imageUrl} alt={nameProduct} className="card-img-top" />
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="product-title">
                    <h5 className="card-title fw-bold">{nameProduct}</h5>
                    <p className="card-text text-muted mb-1">Mã sản phẩm: {id}</p>
                    <p className="card-text text-muted mb-1">Loại: {category}</p>
                </div>
                <div className="mt-auto product-title">
                    <span className="badge text-primary fs-5">{formatCurrency(price)}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                        className="btn btn-primary flex-grow-1"
                        onClick={e => {
                            e.stopPropagation();
                            goToCart();
                        }}
                    >
                        <i className="bi bi-bag me-2"></i> Mua ngay
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <i className="bi bi-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
