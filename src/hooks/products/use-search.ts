import { useQuery } from "@tanstack/react-query";
import { Product } from "~/types";
import { fakeProducts } from "./fake-data";

const fetchSearchResults = async (searchTerm: string): Promise<Product[]> =>
    new Promise(resolve => {
        setTimeout(() => {
            console.warn("searchTerm", searchTerm);
            resolve(fakeProducts);
        }, 200);
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
