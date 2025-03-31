import { Product, ProductImage } from "~/types";

export const formatCurrency = (amount: number | string, locale = "VI") =>
    new Intl.NumberFormat(locale === "VI" ? "vi-VN" : "en-US", {
        style: "currency",
        currency: locale === "VI" ? "VND" : "USD",
        minimumFractionDigits: 0
    }).format(typeof amount !== "number" ? parseFloat(amount) : amount);

export const getMainImage = (images: ProductImage[], fallbackUrl = "/imgs/no-image.png"): string => {
    const mainImage = images.find(img => img.isMain);
    return mainImage?.url || fallbackUrl;
};

type DisplayPriceResult = {
    display: string;
    isDiscounted?: boolean;
    original?: number;
    discounted?: number;
};

export const getDisplayPrice = (product: Product): DisplayPriceResult => {
    if (product.priceText?.trim()) {
        return { display: product.priceText };
    }

    if (product.discountPrice && product.discountPrice < product.price!) {
        return {
            display: formatCurrency(product.discountPrice),
            isDiscounted: true,
            original: product.price,
            discounted: product.discountPrice
        };
    }

    if (product.price) {
        return {
            display: formatCurrency(product.price)
        };
    }

    return { display: "Liên hệ" };
};
