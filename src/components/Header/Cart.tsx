import React from "react";

type CartIconProps = {
    count: number;
};

const CartIcon: React.FC<CartIconProps> = ({ count }) => (
    <div className="cart-icon-wrapper position-relative" role="img">
        <i className="bi bi-cart-fill fs-5"></i>
        {count > 0 && <span className="cart-badge">{count > 99 ? "99+" : count}</span>}
    </div>
);

export default CartIcon;
