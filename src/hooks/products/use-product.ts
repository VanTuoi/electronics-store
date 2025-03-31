import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";
import { fakeProducts } from "./fake-data";

const getProducts = async (): Promise<Product[]> =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(fakeProducts);
        }, 200);
    });

export const useProduct = () =>
    useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5
    });
