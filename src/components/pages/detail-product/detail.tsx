import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LoadingBox } from "~/components/common";
import { PHONE_NUMBER } from "~/constant";
import { useGetProductById } from "~/pages/admin/hooks/use-products";
import { cartAtom } from "~/stores/cart";
import { formatCurrency, getDisplayPrice, getMainImage } from "~/utils/price-utils";
import ProductDescription from "./product-description";

export const ProductDetails = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const { data: product, loading: isLoading, error: isError } = useGetProductById(id);

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
        setCart([
            ...cart,
            {
                product,
                quantity
            }
        ]);
    };

    const handleDelete = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const { display, isDiscounted, original } = getDisplayPrice(product);

    return (
        <div className="container">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <button className="p-0 border-0 bg-transparent w-100" onClick={() => setLightboxOpen(true)}>
                            <img
                                src={mainImage}
                                alt="Product"
                                className="img-fluid rounded mb-3 product-image"
                                id="mainImage"
                            />
                        </button>
                        <div className="d-flex justify-content-flex-start gap-2 mt-2">
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
                        <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            slides={product?.images?.map(i => ({ src: i.url }))}
                            index={product?.images?.findIndex(img => img.url === mainImage)}
                        />
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
                                <div
                                    className="tab-pane fade"
                                    id="comments"
                                    role="tabpanel"
                                    aria-labelledby="comments-tab"
                                >
                                    <p className="text-muted">Chưa có bình luận nào.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-dark">
                        <h2 className="mb-1 text-bold">{product.name}</h2>
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
                                    <span className="badge text-primary fs-3 me-2">{display}</span>
                                    <span className="badge text-decoration-line-through text-danger fs-5">
                                        {formatCurrency(original!)}
                                    </span>
                                </div>
                            ) : (
                                <span className="badge text-primary fs-3 me-2">{display}</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="form-label">
                                Số lượng:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                className="form-control mb-2"
                                value={quantity}
                                min={1}
                                onChange={e => setQuantity(Number(e.target.value))}
                                style={{ width: "80px" }}
                            />
                        </div>

                        <div className="mb-4 d-flex gap-2">
                            <button className="btn btn-primary flex-grow-1 py-3" onClick={goToCheckOut}>
                                <i className="bi bi-bag me-2"></i> Mua ngay
                            </button>
                            <button
                                className={`btn py-3 px-3 ${cart.some(item => item.product.id === product.id) ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => {
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

                        <div className="mb-4">
                            <h5 className="fs-4">Thông số kỹ thuật:</h5>
                            <ul>
                                {product?.dimensions?.height &&
                                    product?.dimensions?.width &&
                                    product?.dimensions?.depth && (
                                        <li>
                                            <strong>Kích thước:</strong> H{product.dimensions.height} × W
                                            {product.dimensions.width} × D{product.dimensions.depth} mm
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

                        {product?.features?.length && product?.features?.length > 0 && (
                            <div className="mb-4">
                                <h5 className="fs-4">Tính năng:</h5>
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
        </div>
    );
};
