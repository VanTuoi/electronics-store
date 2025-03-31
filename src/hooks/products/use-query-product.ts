import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";
import { fakeProducts } from "./fake-data";

const getProductById = async (id: string): Promise<Product | undefined> =>
    new Promise(resolve => {
        setTimeout(() => {
            const product = fakeProducts.find(p => p.id === id);
            resolve(product);
        }, 200);
    });

export const useProductById = (id: string) =>
    useQuery<Product | undefined>({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5
    });
