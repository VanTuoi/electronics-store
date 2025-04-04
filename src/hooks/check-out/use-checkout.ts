import { useMutation } from "@tanstack/react-query";
import { Product } from "~/types";

export const fakeCheckoutApi = async (checkoutData: {
    cart: { cart: Product[]; quantity: number };
    totalPrice: number;
}) =>
    new Promise<{ status: string }>((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;

            if (isSuccess) {
                resolve({ status: "success" });
            } else {
                console.error("❌ Checkout thất bại:", checkoutData);
                reject(new Error("Thanh toán thất bại do kết nối đến máy chủ 👻"));
            }
        }, 1500);
    });

export const useCheckout = () =>
    useMutation({
        mutationFn: fakeCheckoutApi
    });
