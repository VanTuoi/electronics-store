import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSyncProductById } from "~/hooks/products/use-sync-product-by-id";
import { cartAtom } from "~/stores/cart";
import { Product } from "~/types";
import { formatCurrency, getDisplayPrice, getMainImage } from "~/utils/price-utils";

export const Cart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const syncProduct = useSyncProductById();
    const navigate = useNavigate();

    useEffect(() => {
        cart.forEach(item => syncProduct(item.product.id));
    }, []);

    const goToCheckOut = () =>
        navigate("/check-out", {
            state: {
                cart: cart.filter(item => item.product.priceText === ""),
                totalPrice: calculateTotal()
            }
        });

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            toast.error("Số lượng sản phẩm tối thiểu là 1");
            return;
        }

        const updatedCart = cart.map(item =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter(item => item.product.id !== productId);
        toast.success("Đã xoá sản phẩm khỏi giỏ hàng");
        setCart(updatedCart);
    };

    const calculateTotal = useCallback(
        () =>
            cart
                .filter(item => item.product.priceText === "")
                .reduce((total, item) => {
                    const { price = 0, discountPrice, discountPercent = 0 } = item.product;

                    const finalPrice = discountPrice ? discountPrice : price - (price * Number(discountPercent)) / 100;

                    return total + finalPrice * item.quantity;
                }, 0),
        [cart]
    );

    const handleGetDisplay = (product: Product) => {
        const { display, original, isDiscounted } = getDisplayPrice(product);

        return { display, original, isDiscounted };
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-5">
                <h3 className="py-5">Giỏ hàng trống</h3>
                <Link to="/products" className="btn btn-primary py-2">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container bg-white py-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            {cart
                                .filter(item => item.product.priceText !== "")
                                .map(item => (
                                    <div key={item.product.id} className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-3 d-flex align-items-center justify-content-center">
                                                <div
                                                    className="border rounded overflow-hidden ratio ratio-4x3"
                                                    style={{ width: "200px", maxWidth: "100%" }}
                                                >
                                                    <img
                                                        src={getMainImage(item?.product?.images ?? [])}
                                                        alt={item.product.name}
                                                        className="w-100 h-100"
                                                        style={{ objectFit: "cover", objectPosition: "center" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body">
                                                    <div className="text-truncate">
                                                        <Link
                                                            to={`/product/${item.product.id}`}
                                                            className="card-title h5 text-decoration-none d-block"
                                                            style={{
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                    </div>

                                                    <p className="card-text fw-bold mt-2 fs-5">
                                                        {handleGetDisplay(item.product).isDiscounted ? (
                                                            <>
                                                                <span className="text-danger me-2">
                                                                    {handleGetDisplay(item.product).display}
                                                                </span>
                                                                <span className="text-muted text-decoration-line-through">
                                                                    {formatCurrency(
                                                                        handleGetDisplay(item.product).original!
                                                                    )}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-primary">
                                                                {handleGetDisplay(item.product).display}
                                                            </span>
                                                        )}
                                                    </p>

                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="input-group quantity-input">
                                                            <button
                                                                disabled
                                                                data-testid="minus"
                                                                name="minus"
                                                                className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                                type="button"
                                                            >
                                                                <i className="bi bi-dash"></i>
                                                            </button>
                                                            <input
                                                                readOnly
                                                                type="number"
                                                                className="form-control text-center quantity-input-input"
                                                                value={item.quantity}
                                                            />
                                                            <button
                                                                disabled
                                                                data-testid="plus"
                                                                name="plus"
                                                                className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                                type="button"
                                                            >
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </div>
                                                        <button
                                                            className="btn btn-danger py-2"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="col-lg-12">
                            {cart
                                .filter(item => item.product.priceText === "")
                                .sort((a, b) => (a.product.price || 0) - (b.product.price || 0))
                                .map(item => (
                                    <div key={item.product.id} className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-3">
                                                <div
                                                    className="border rounded overflow-hidden ratio ratio-4x3"
                                                    style={{ width: "200px", maxWidth: "100%" }}
                                                >
                                                    <img
                                                        src={getMainImage(item?.product?.images ?? [])}
                                                        alt={item.product.name}
                                                        className="w-100 h-100"
                                                        style={{ objectFit: "cover", objectPosition: "center" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body">
                                                    <div className="text-truncate">
                                                        <Link
                                                            to={`/product/${item.product.id}`}
                                                            className="card-title h5 text-decoration-none d-block"
                                                            style={{
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                    </div>

                                                    {handleGetDisplay(item.product).isDiscounted ? (
                                                        <div
                                                            className="d-flex align-items-center text-truncate overflow-hidden"
                                                            style={{ whiteSpace: "nowrap" }}
                                                        >
                                                            <span className="fw-bold text-primary fs-5 me-2">
                                                                {handleGetDisplay(item.product).display}
                                                            </span>
                                                            <span className="fw-bold text-decoration-line-through text-danger fs-6">
                                                                {formatCurrency(
                                                                    handleGetDisplay(item.product).original!
                                                                )}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span
                                                            className="fw-bold text-primary fs-5 text-truncate overflow-hidden"
                                                            style={{ whiteSpace: "nowrap" }}
                                                        >
                                                            {handleGetDisplay(item.product).display}
                                                        </span>
                                                    )}

                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="input-group quantity-input">
                                                            <button
                                                                data-testid="minus"
                                                                name="minus"
                                                                className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(item.product.id, item.quantity - 1)
                                                                }
                                                            >
                                                                <i className="bi bi-dash"></i>
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="form-control text-center quantity-input-input"
                                                                value={item.quantity}
                                                                onChange={e =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        parseInt(e.target.value) || 1
                                                                    )
                                                                }
                                                            />
                                                            <button
                                                                data-testid="plus"
                                                                name="plus"
                                                                className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(item.product.id, item.quantity + 1)
                                                                }
                                                            >
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </div>
                                                        <button
                                                            className="btn btn-danger py-2"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card position-sticky top-0">
                        <div className="card-body">
                            <h5 className="card-title">Tổng đơn hàng</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tạm tính:</span>
                                <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Số lượng sản phẩm:</span>
                                <span className="fw-bold">
                                    {cart
                                        .filter(item => item.product.priceText === "")
                                        .reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold text-dark">Tổng cộng:</span>
                                <span className="fw-bold text-danger fs-5" data-testid="total">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>
                            <button className="btn btn-primary w-100" onClick={() => goToCheckOut()}>
                                Tiến hành thanh toán
                            </button>
                        </div>
                        <div className="mt-1 p-2">
                            <span className="fs-6 fst-italic text-gray">
                                Đối với những sản phẩm với &quot;giá liên hệ&quot; vui lòng liên hệ cho chúng tôi và
                                cung cấp mã sản phẩm.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
