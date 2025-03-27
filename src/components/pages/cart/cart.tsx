import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { cartAtom } from "~/stores/cart";
import { formatCurrency } from "~/utils/formatCurrency";

export const Cart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.map(item =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter(item => item.product.id !== productId);
        setCart(updatedCart);
    };

    const calculateTotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="text-center py-5">
                <h3 className="mb-3">Giỏ hàng trống</h3>
                <Link to="/" className="btn btn-primary">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container bg-white py-5">
            <div className="row">
                <div className="col-lg-8">
                    {cart.map(item => (
                        <div key={item.product.id} className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img
                                        src={item.product.imageUrl}
                                        className="img-fluid rounded-start mx-3"
                                        alt={item.product.nameProduct}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <Link
                                            to={`/product/${item.product.id}`}
                                            className="card-title h5 text-decoration-none"
                                        >
                                            {item.product.nameProduct}
                                        </Link>
                                        <p className="card-text text-danger fw-bold">
                                            {formatCurrency(item.product.price)}
                                        </p>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="input-group quantity-input">
                                                <button
                                                    data-testid="minus"
                                                    name="minus"
                                                    className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                    type="button"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    className="form-control text-center quantity-input-input"
                                                    value={item.quantity}
                                                    onChange={e =>
                                                        updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                                                    }
                                                />
                                                <button
                                                    data-testid="plus"
                                                    name="plus"
                                                    className="btn btn-outline-secondary btn-sm px-2 quantity-input-button"
                                                    type="button"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-danger"
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
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tổng đơn hàng</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tạm tính:</span>
                                <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Phí vận chuyển:</span>
                                <span>Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold text-dark">Tổng cộng:</span>
                                <span className="fw-bold text-danger" data-testid="total">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>
                            <button className="btn btn-primary w-100">Tiến hành thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
