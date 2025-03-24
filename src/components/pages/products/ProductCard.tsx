import React from "react";

type ProductCardProps = {
    id: string;
    name: string;
    price: string;
    category: string;
    imageUrl: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, category, imageUrl }) => (
    <div className="card shadow-sm rounded border-1 mt-3 mt-md-4 product-card">
        <img src={imageUrl} alt={name} className="card-img-top" />
        <div className="card-body d-flex flex-column justify-content-between">
            <div className="product-title">
                <h5 className="card-title fw-bold">{name}</h5>
                <p className="card-text text-muted mb-1">Mã sản phẩm: {id}</p>
                <p className="card-text text-muted mb-1">Loại: {category}</p>
            </div>
            <div className="mt-auto product-title">
                <span className="badge text-primary fs-5">{price}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary flex-grow-1">
                    <i className="bi bi-bag me-2"></i> Mua ngay
                </button>
                <button className="btn btn-outline-primary">
                    <i className="bi bi-cart-plus"></i>
                </button>
            </div>
        </div>
    </div>
);

export default ProductCard;
