import { Category, ResponseData } from "~/types";

import { getApi } from "~/utils/api-selector";

export const categoriesApi = (type: "public" | "private" = "public") => {
    const api = getApi(type);

    return {
        getCategories: () => api.get<ResponseData<Category[] | null>>("/categories"),
        createCategory: (category: Partial<Category>) =>
            api.post<ResponseData<Category | null>>("/categories", category),
        updateCategory: (category: Partial<Category>) =>
            api.put<ResponseData<Category | null>>(`/categories/${category.id}`, category),
        deleteCategory: (id: string) => api.delete<ResponseData<null>>(`/categories/${id}`)
    };
};
