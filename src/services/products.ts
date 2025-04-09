import { Product, ProductInput, ResponseData } from "~/types";

import { getApi } from "~/utils/api-selector";

export const productsApi = (type: "public" | "private" = "public") => {
    const api = getApi(type);

    return {
        getProducts: () => api.get<ResponseData<Product[] | null>>("/products"),
        createProduct: (product: Partial<ProductInput>) =>
            api.post<ResponseData<Product | null>>("/products", product, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }),
        updateProduct: (data: { id: string } & Partial<ProductInput>) =>
            api.put<ResponseData<Product | null>>(`/products/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }),
        deleteProduct: (id: string) => api.delete<ResponseData<null>>(`/products/${id}`)
    };
};
