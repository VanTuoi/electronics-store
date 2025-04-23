import React, { memo } from "react";
import { Product } from "~/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
    products: Product[];
    maxRows?: number;
    itemsPerRow?: number;
};

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export const ProductGrid: React.FC<ProductGridProps> = memo(({ products, maxRows = Infinity, itemsPerRow = 3 }) => {
    const limited = maxRows === Infinity ? products : products.slice(0, maxRows * itemsPerRow);
    const rows = chunkArray(limited, itemsPerRow);

    return (
        <div className="">
            {rows.map((row, rowIndex) => (
                <div className="row justify-content-center" key={rowIndex}>
                    {row.map(product => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});
