import { atom } from "jotai";

import { CartItem } from "~/types";

const CART_STORAGE_KEY = "cart-items";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }
  return [];
};

const cartAtomBase = atom<CartItem[]>(loadCartFromStorage());

export const cartAtom = atom(
  get => get(cartAtomBase),
  (_, set, newCart: CartItem[]) => {
    set(cartAtomBase, newCart);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    }
  }
);
