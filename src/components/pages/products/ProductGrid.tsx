import React from "react";
import { Product } from "~/types";
import { ProductCard } from "./ProductCard";
type ProductGridProps = {
    products: Product[];
    maxRows?: number;
    itemsPerRow?: number;
};

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export const ProductGrid: React.FC<ProductGridProps> = ({ products, maxRows = 2, itemsPerRow = 4 }) => {
    const limited = products.slice(0, maxRows * itemsPerRow);
    const rows = chunkArray(limited, itemsPerRow);

    return (
        <div className="">
            {rows.map((row, rowIndex) => (
                <div className="row justify-content-center" key={rowIndex}>
                    {row.map(product => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
