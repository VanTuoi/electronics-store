import { useAtom } from "jotai";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import { cartAtom } from "~/stores/cart";

export const CartIcon: React.FC = memo(() => {
  const [cart] = useAtom(cartAtom);

  const numberItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();

  const goToCart = () => navigate("/cart");

  return (
    <div
      className="cart-component"
      role="button"
      tabIndex={0}
      onClick={goToCart}
      onKeyDown={e => e.key === "Enter" && goToCart()}
      aria-label={`Open cart. ${numberItems} item${numberItems !== 1 ? "s" : ""} in cart.`}
    >
      <div className="cart-icon-wrapper position-relative">
        <i role="img" aria-label="Shopping cart icon" className="bi bi-cart-fill fs-5"></i>
        {numberItems > 0 && <span className="cart-badge">{numberItems > 99 ? "99+" : numberItems}</span>}
      </div>
    </div>
  );
});
