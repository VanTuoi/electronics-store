import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { PHONE_NUMBER } from "~/constant";
import { cartAtom } from "~/stores/cart";
import { Product } from "~/types";
import { formatCurrency, getDisplayPrice, getMainImage } from "~/utils/price-utils";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();
    const [cart, setCart] = useAtom(cartAtom);
    const { display, isDiscounted, original } = getDisplayPrice(product);

    const goToDetail = () => navigate(`/product/${product.id}`);

    const goToCheckOut = () => {
        if (product.priceText !== "") {
            window.open(`tel:${PHONE_NUMBER}`);
        } else {
            navigate("/check-out", {
                state: {
                    cart: [{ product, quantity: 1 }],
                    totalPrice: getDisplayPrice(product).rawDisplay
                }
            });
        }
    };

    const handleAdd = () => {
        setCart([...cart, { product, quantity: 1 }]);
    };

    const handleDelete = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

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
            <img src={getMainImage(product.images)} alt={product.name} className="card-img-top" />
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="product-title">
                    <h5 className="card-title fw-bold fs-6 text-truncate-hover" title={product.name}>
                        {product.name.length > 30 ? product.name.slice(0, 30) + "..." : product.name}
                    </h5>
                    {product.code && <p className="card-text text-muted mb-1">Mã: {product.code}</p>}
                    <p className="card-text text-muted mb-1">Loại: {product.category}</p>
                    {product.inputVoltage && (
                        <p className="card-text text-muted mb-2">Điện áp vào: {product.inputVoltage}</p>
                    )}
                    {product.dimensions && (
                        <p className="card-text text-muted mb-2">
                            Kích thước: {product.dimensions.width}x{product.dimensions.height}x
                            {product.dimensions.depth}
                            {product.dimensions.unit && ` (${product.dimensions.unit})`}
                        </p>
                    )}
                </div>

                <div className="mt-auto product-title">
                    {isDiscounted ? (
                        <div>
                            <span className="badge text-primary fs-5 me-2">{display}</span>
                            <span className="text-decoration-line-through text-danger fs-6">
                                {formatCurrency(original!)}
                            </span>
                        </div>
                    ) : (
                        <span className="badge text-primary fs-5">{display}</span>
                    )}
                </div>

                <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                        className="btn btn-primary flex-grow-1"
                        onClick={e => {
                            e.stopPropagation();
                            goToCheckOut();
                        }}
                    >
                        <i className="bi bi-bag me-2"></i> Mua ngay
                    </button>
                    <button
                        className={`btn ${cart.some(item => item.product.id === product.id) ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={e => {
                            e.stopPropagation();
                            if (cart.some(item => item.product.id === product.id)) {
                                handleDelete(product.id);
                            } else {
                                handleAdd();
                            }
                        }}
                    >
                        <i className="bi bi-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
