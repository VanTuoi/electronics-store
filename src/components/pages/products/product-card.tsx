import { useAtom } from "jotai";
import { memo } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { PHONE_NUMBER } from "~/constant";
import { cartAtom } from "~/stores";
import { Product } from "~/types";
import { formatCurrency, getDisplayPrice, getMainImage, slugify } from "~/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [cart, setCart] = useAtom(cartAtom);
  const { display, isDiscounted, original } = getDisplayPrice(product);

  const productSlug = slugify(product.name);
  const productLink = `/product/${productSlug}-${product.id}`;

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
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    setCart([...cart, { product, quantity: 1 }]);
  };

  const handleDelete = (productId: string) => {
    toast.success("Đã xoá sản phẩm khỏi giỏ hàng");
    setCart(cart.filter(item => item.product.id !== productId));
  };

  return (
    <div
      className="card shadow-sm rounded border-1 mt-3 mt-md-4 product-card"
      role="region"
      aria-label={`Product card: ${product.name}`}
    >
      <Link to={productLink} className="text-decoration-none text-dark">
        <img
          src={getMainImage(product?.images ?? [])}
          alt={product.name}
          className="card-img-top p-2 rounded-4"
          style={{
            objectFit: "contain",
            height: "200px",
            width: "100%"
          }}
        />
      </Link>

      <div className="card-body d-flex flex-column justify-content-between">
        <div className="product-title">
          <Link to={productLink} className="text-decoration-none text-dark">
            <h5 className="card-title fw-bold fs-6 text-truncate-hover" title={product.name}>
              {product.name.length > 30 ? product.name.slice(0, 30) + "..." : product.name}
            </h5>
          </Link>

          {product.code && <p className="card-text text-muted mb-1">Mã: {product.code}</p>}
          <p className="card-text text-muted mb-1">Loại: {product?.category?.name}</p>
          {product.inputVoltage && <p className="card-text text-muted mb-2">Điện áp vào: {product.inputVoltage}</p>}
          {product.dimensions && (
            <p className="card-text text-muted mb-2">
              Kích thước: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}
              {product.dimensions.unit && ` (${product.dimensions.unit})`}
            </p>
          )}
        </div>

        <div className="mt-auto product-title">
          {isDiscounted ? (
            <div>
              <span className="badge text-danger fs-5 me-2">{display}</span>
              <span className="text-decoration-line-through text-black fs-6">{formatCurrency(original!)}</span>
            </div>
          ) : (
            <span className="badge text-danger fs-5">{display}</span>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 mt-2">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={e => {
              e.stopPropagation();
              goToCheckOut();
            }}
            aria-label="Buy now"
          >
            <i className="bi bi-bag me-2" aria-hidden="true"></i> Mua ngay
          </button>

          <button
            className={`btn ${
              cart.some(item => item.product.id === product.id) ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={e => {
              e.stopPropagation();
              if (cart.some(item => item.product.id === product.id)) {
                handleDelete(product.id);
              } else {
                handleAdd();
              }
            }}
            aria-label={cart.some(item => item.product.id === product.id) ? "Remove from cart" : "Add to cart"}
          >
            <i className="bi bi-cart-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
});
