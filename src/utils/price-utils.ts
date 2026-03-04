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
  rawDisplay: number;
  isDiscounted?: boolean;
  original?: number;
  discounted?: number;
};

export const getDisplayPrice = (product: Product): DisplayPriceResult => {
  if (product.priceText?.trim()) {
    return { display: product.priceText, rawDisplay: NaN };
  }

  const price = product.price || 0;
  const discountPrice = product.discountPrice || 0;
  const discountPercent = product.discountPercent ? Number(product.discountPercent) : 0;

  if (discountPrice > 0 && discountPrice < price) {
    return {
      display: formatCurrency(discountPrice),
      rawDisplay: discountPrice,
      isDiscounted: true,
      original: price,
      discounted: discountPrice
    };
  }

  if (discountPercent > 0 && price > 0) {
    const calculatedDiscountPrice = price - (price * discountPercent) / 100;
    return {
      display: formatCurrency(calculatedDiscountPrice),
      rawDisplay: calculatedDiscountPrice,
      isDiscounted: true,
      original: price,
      discounted: calculatedDiscountPrice
    };
  }

  if (price > 0) {
    return {
      display: formatCurrency(price),
      rawDisplay: price
    };
  }

  return { display: "Liên hệ", rawDisplay: NaN };
};
