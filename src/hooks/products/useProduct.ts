import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";

const fakeProducts: Product[] = Array.from({ length: 23 }, (_, index) => ({
    id: `TD-${index + 1}`,
    nameProduct: `Tủ điện số ${index + 1}`,
    price: (index + 1) * 1000000,
    category: index % 2 === 0 ? "Tủ điều khiển" : "Tủ phân phối",
    imageUrl: `./imgs/product.png`
}));

const getProducts = async (): Promise<Product[]> =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(fakeProducts);
        }, 2000);
    });

export const useProduct = () =>
    useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5
    });
