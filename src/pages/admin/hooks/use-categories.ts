import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { categoriesApi } from "~/services/categories";
import { Category } from "~/types";

export const useGetCategories = () => {
    const {
        data,
        isPending: loading,
        error
    } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async (): Promise<Category[]> => {
            const res = await categoriesApi("private").getCategories();
            return res.data.data ?? [];
        },
        staleTime: 5 * 60 * 1000
    });

    if (error) {
        console.error("Error fetching categories:", error);
        toast.error("Lỗi khi lấy tất cả danh mục");
    }

    return {
        data,
        loading,
        error: error as Error | null
    };
};

export const useCreateCategories = () => {
    const queryClient = useQueryClient();

    const {
        mutate: createCategories,
        isPending,
        error
    } = useMutation({
        mutationFn: async (category: Category): Promise<Category | null> => {
            const res = await categoriesApi("private").createCategory(category);
            return res.data.data;
        },
        onSuccess: newCategory => {
            if (newCategory) {
                queryClient.setQueryData<Category[]>(["categories"], oldData =>
                    oldData ? [...oldData, newCategory] : [newCategory]
                );
            }
            toast.success(`Đã tạo danh mục ${newCategory?.name}`);
        },
        onError: err => {
            console.error("Error creating category:", err);
            toast.error(`Lỗi khi tạo danh mục`);
        }
    });

    const data = queryClient.getQueryData<Category[]>(["categories"]);

    return {
        data,
        createCategories,
        loading: isPending,
        error: error as Error | null
    };
};

export const useDeleteCategories = () => {
    const queryClient = useQueryClient();

    const {
        mutate: deleteCategory,
        isPending,
        error
    } = useMutation({
        mutationFn: async (category: Category): Promise<void> => {
            await categoriesApi("private").deleteCategory(category.id);
        },
        onSuccess: (_data, category) => {
            queryClient.setQueryData<Category[]>(["categories"], oldData =>
                oldData?.filter(item => item.id !== category.id)
            );
            toast.success(`Đã xóa danh mục ${category?.name}`);
        },
        onError: err => {
            console.error("Error deleting category:", err);
            toast.error(`Lỗi khi xóa danh mục`);
        }
    });

    return {
        deleteCategory,
        loading: isPending,
        error: error as Error | null
    };
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    const {
        mutate: updateCategory,
        isPending,
        error
    } = useMutation({
        mutationFn: async (category: Category): Promise<void> => {
            await categoriesApi("private").updateCategory(category);
        },
        onSuccess: (_data, updatedCategory) => {
            queryClient.setQueryData<Category[]>(["categories"], oldData =>
                oldData?.map(item => (item.id === updatedCategory.id ? updatedCategory : item))
            );
            toast.success(`Đã cập nhật danh mục ${updatedCategory?.name}`);
        },
        onError: err => {
            console.error("Error updating category:", err);
            toast.error(`Lỗi khi cập nhật danh mục`);
        }
    });

    return {
        updateCategory,
        loading: isPending,
        error: error as Error | null
    };
};
