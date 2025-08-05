import "yet-another-react-lightbox/styles.css";

import { useAtom } from "jotai";
import { memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lightbox } from "yet-another-react-lightbox";

import { LoadingBox } from "~/components/common";
import { PHONE_NUMBER } from "~/constant";
import { useGetProductById } from "~/hooks";
import { cartAtom } from "~/stores";
import { formatCurrency, getDisplayPrice, getMainImage } from "~/utils";

import ProductDescription from "./product-description";

export const ProductDetails = memo(() => {
  const [cart, setCart] = useAtom(cartAtom);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { id: urlParam } = useParams<{ id: string }>();
  const productId = urlParam?.split("-").pop();

  const { data: product, loading: isLoading, error: isError } = useGetProductById(productId);

  useEffect(() => {
    if (product?.images) {
      setMainImage(getMainImage(product.images));
    }
  }, [product]);

  if (isLoading) {
    return <LoadingBox height={"50vh"} />;
  }

  if (!product || isError) {
    return (
      <div className="container py-5 text-center mt-5 mb-5">
        <p className="text-muted fs-3">Lỗi khi tải sản phẩm! Không thể hiển thị thông tin sản phẩm.</p>
        <Link to="/products" className="btn btn-link btn-primary">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const goToCheckOut = () => {
    if (product.priceText !== "") {
      window.open(`tel:${PHONE_NUMBER}`);
    } else {
      navigate("/check-out", {
        state: {
          cart: [{ product, quantity }],
          totalPrice: getDisplayPrice(product).rawDisplay
        }
      });
    }
  };

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  const handleAdd = () => {
    if (!product) return;
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    setCart([
      ...cart,
      {
        product,
        quantity
      }
    ]);
  };

  const handleDelete = (id: string) => {
    toast.success("Đã xoá sản phẩm khỏi giỏ hàng");
    setCart(cart.filter(item => item.product.id !== id));
  };

  const { display, isDiscounted, original } = getDisplayPrice(product);

  return (
    <div className="container">
      {product && (
        <Helmet>
          <title>{product.name} | Electronics Store</title>
          <meta name="description" content={`Thông tin chi tiết sản phẩm ${product.name}.`} />
        </Helmet>
      )}

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7 order-2 order-md-1 mb-4">
            <button
              className="p-0 border-0 bg-transparent w-100 d-none d-md-flex"
              onClick={() => setLightboxOpen(true)}
              aria-label="Open image in fullscreen view"
            >
              <img
                src={mainImage}
                loading="eager"
                alt="Product"
                className="img-fluid rounded mb-3 product-image"
                id="mainImage"
              />
            </button>
            <div className="d-flex justify-content-flex-start gap-2 mt-2 d-none d-md-flex">
              {product?.images?.map((img, index) => {
                const src = img.url;
                const isActive = mainImage === src;
                return (
                  <button
                    key={`thumb-${index}`}
                    className="p-0 border-0 bg-transparent"
                    onClick={() => handleThumbnailClick(src)}
                    style={{ width: "22%" }}
                  >
                    <img
                      src={src}
                      alt={`Thumb ${index + 1}`}
                      className={`thumbnail rounded ${isActive ? "active" : ""}`}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-5 text-dark">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="description-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#description"
                    type="button"
                    role="tab"
                    aria-controls="description"
                    aria-selected="true"
                  >
                    Mô tả chi tiết
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="comments-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#comments"
                    type="button"
                    role="tab"
                    aria-controls="comments"
                    aria-selected="false"
                  >
                    Bình luận
                  </button>
                </li>
              </ul>
              <div className="tab-content pt-3">
                <div
                  className="tab-pane fade show active"
                  id="description"
                  role="tabpanel"
                  aria-labelledby="description-tab"
                >
                  <ProductDescription product={product} />
                </div>
                <div className="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                  <p className="text-muted">Chưa có bình luận nào.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 order-1 order-md-2 text-dark">
            <button className="p-0 border-0 bg-transparent w-100 d-md-none" onClick={() => setLightboxOpen(true)}>
              <img src={mainImage} alt="Product" className="img-fluid rounded mb-3 product-image" id="mainImage" />
            </button>
            <div className="d-flex justify-content-flex-start gap-2 mt-2 d-md-none">
              {product?.images?.map((img, index) => {
                const src = img.url;
                const isActive = mainImage === src;
                return (
                  <button
                    key={`thumb-${index}`}
                    className="p-0 border-0 bg-transparent"
                    onClick={() => handleThumbnailClick(src)}
                    style={{ width: "22%" }}
                  >
                    <img
                      src={src}
                      alt={`Thumb ${index + 1}`}
                      className={`thumbnail rounded ${isActive ? "active" : ""}`}
                      style={{ width: "100%" }}
                    />
                  </button>
                );
              })}
            </div>
            <h1 className="mb-1 text-bold h4">{product.name}</h1>
            <p className="mb-1 text-bold">
              <strong>Mã: </strong>
              {product?.code}
            </p>

            {product?.category?.name && (
              <p className="fs-6 mb-2">
                <strong>Loại tủ: </strong>
                {product.category.name}
              </p>
            )}

            {product?.inputVoltage && (
              <p className="fs-6 mb-2">
                <strong>Điện áp vào: </strong>
                {product.inputVoltage}
              </p>
            )}

            {product?.outputVoltage && (
              <p className="fs-6 mb-2">
                <strong>Điện áp ra: </strong>
                {product.outputVoltage}
              </p>
            )}

            {product?.usage && (
              <p className="fs-6 mb-2">
                <strong>Ứng dụng: </strong>
                {product.usage}
              </p>
            )}

            <div className="mb-2">
              {isDiscounted ? (
                <div>
                  <strong>Giá bán: </strong>
                  <span className="badge text-danger fs-4 me-2">{display}</span>
                  <span className="badge text-decoration-line-through text-black fs-5">
                    {formatCurrency(original!)}
                  </span>
                </div>
              ) : (
                <span className="badge text-danger fs-4 me-2">{display}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label">
                Số lượng:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control mb-2"
                value={quantity}
                min={1}
                onChange={e => setQuantity(Number(e.target.value))}
                style={{ width: "80px" }}
                aria-label="Quantity"
              />
            </div>

            <div className="mb-4 d-flex gap-2">
              <button className="btn btn-primary flex-grow-1 py-3" onClick={goToCheckOut} aria-label="Buy now">
                <i className="bi bi-bag me-2" aria-hidden="true"></i>
                Mua ngay
              </button>

              <button
                className={`btn py-3 px-3 ${
                  cart.some(item => item.product.id === product.id) ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => {
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

            <div className="mb-4">
              <h2 className="fs-4">Thông số kỹ thuật:</h2>
              <ul>
                {product?.dimensions?.height && product?.dimensions?.width && product?.dimensions?.depth && (
                  <li>
                    <strong>Kích thước:</strong> H{product.dimensions.height} × W{product.dimensions.width} × D
                    {product.dimensions.depth} mm
                  </li>
                )}
                {product?.material && (
                  <li>
                    <strong>Vật liệu:</strong> {product.material}
                  </li>
                )}
                {product?.protectionLevel && (
                  <li>
                    <strong>Cấp bảo vệ:</strong> {product.protectionLevel}
                  </li>
                )}
                {product?.inputVoltage && (
                  <li>
                    <strong>Điện áp đầu vào:</strong> {product.inputVoltage}
                  </li>
                )}
                {product?.outputVoltage && (
                  <li>
                    <strong>Điện áp đầu ra:</strong> {product.outputVoltage}
                  </li>
                )}
                {product?.weightKg && (
                  <li>
                    <strong>Trọng lượng:</strong> {product.weightKg} kg
                  </li>
                )}
                {product?.origin && (
                  <li>
                    <strong>Xuất xứ:</strong> {product.origin}
                  </li>
                )}
              </ul>
            </div>

            {product?.features && product?.features?.length > 0 && (
              <div className="mb-4">
                <h2 className="fs-4">Tính năng:</h2>
                <ul>
                  {product.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={product?.images?.map(i => ({ src: i.url }))}
        index={product?.images?.findIndex(img => img.url === mainImage)}
      />
    </div>
  );
});
