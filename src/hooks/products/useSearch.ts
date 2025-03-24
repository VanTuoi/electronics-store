import { useState } from "react";
import { Product } from "~/types";

export const useSearch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    const searchHandler = async (searchTerm: string) => {
        try {
            if (!searchTerm) return;

            setLoading(true);
            setTimeout(() => {
                setProducts([
                    {
                        id: "1",
                        nameProduct: "Tủ A",
                        price: 2000
                    }
                ]);
                setLoading(false);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleSearch = useCallback(debounce(searchHandler, 500), []);
    const handleSearch = searchHandler;

    return {
        loading,
        products,
        handleSearch
    };
};
