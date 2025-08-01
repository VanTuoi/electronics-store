import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

import { productsApi } from "~/services/products";
import { cartAtom } from "~/stores/cart";
import { CartItem, Product } from "~/types";

export const useSyncProductById = () => {
  const setCart = useSetAtom(cartAtom);
  const cart = useAtomValue(cartAtom);

  const syncProduct = useCallback(
    async (productId: string) => {
      try {
        const res = await productsApi("private").getProduct(productId);
        const updatedProduct: Product | null = res.data?.data ?? null;

        if (!updatedProduct) return;

        const newCart: CartItem[] = cart.map(item =>
          item.product.id === productId ? { ...item, product: updatedProduct } : item
        );

        setCart(newCart);
      } catch (error) {
        console.error("Lỗi khi đồng bộ sản phẩm:", error);
      }
    },
    [cart, setCart]
  );

  return syncProduct;
};
