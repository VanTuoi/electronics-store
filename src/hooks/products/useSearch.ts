import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";

const fakeProducts: Product[] = Array.from({ length: 0 }, (_, index) => ({
    id: `TD-${index + 1}`,
    nameProduct: `Tủ điện số ${index + 1}`,
    price: (index + 1) * 1000000,
    category: index % 2 === 0 ? "Tủ điều khiển" : "Tủ phân phối",
    imageUrl: `./imgs/product.png`
}));

const fetchSearchResults = async (searchTerm: string): Promise<Product[]> =>
    new Promise(resolve => {
        setTimeout(() => {
            console.log("searchTerm", searchTerm);
            resolve(fakeProducts);
        }, 2000);
    });

export const useSearch = (searchTerm: string) => {
    const enabled = searchTerm.trim() !== "";

    const { data, isLoading } = useQuery({
        queryKey: ["search", searchTerm],
        queryFn: () => fetchSearchResults(searchTerm),
        enabled,
        staleTime: 1000 * 60 * 5
    });

    return {
        loading: isLoading,
        products: data ?? []
    };
};
