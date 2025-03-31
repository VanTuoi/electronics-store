import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";
import { fakeProducts } from "./fake-data";

const getProducts = async (): Promise<Product[]> =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(fakeProducts.slice(0, 5));
        }, 200);
    });

export const useTopProduct = () =>
    useQuery<Product[]>({
        queryKey: ["top-products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5
    });
