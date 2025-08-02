import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "~/services";
import { Product, ProductInput } from "~/types";
import { formDataToObject } from "~/utils";

export const useGetProductById = (id?: string) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      if (!id) return null;
      const res = await productsApi("public").getProduct(id);
      return res.data.data ?? null;
    },
    enabled: !!id,
    staleTime: 1000
  });

  return {
    data,
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useGetProducts = (params?: {
  search?: string;
  categoryId?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const res = await productsApi("public").getProducts({
        ...params,
        categoryId: params?.categoryId?.join(","),
        page: params?.page || 1,
        limit: params?.limit || 9
      });

      return {
        products: res.data.data || [],
        meta: res.data.meta || {
          total: 0,
          page: 1,
          pages: 1,
          limit: params?.limit || 9
        }
      };
    },
    staleTime: 1000
  });

  return {
    data: data?.products || [],
    meta: data?.meta,
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useGetRandomProducts = (params?: { limit?: number }) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["products-random", params],
    queryFn: async () => {
      const res = await productsApi("public").getRandomProducts({
        ...params,
        limit: params?.limit || 5
      });

      return {
        products: res.data.data || []
      };
    },
    staleTime: 1000
  });

  return {
    data: data?.products || [],
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useGetProductsForAdmin = (params?: { search?: string; categoryId?: string; showHidden?: string }) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["products", params],
    queryFn: async (): Promise<Product[] | null> => {
      const res = await productsApi("private").getProductsForAdmin(params);
      return res.data.data;
    },
    staleTime: 1000
  });

  return {
    data,
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useCreateProducts = (onClose: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: createProducts,
    isPending,
    error
  } = useMutation({
    mutationFn: async (formData: FormData): Promise<Product | null> => {
      const data = formDataToObject(formData);

      const productData = {
        ...data,
        price: data.price ? Number(data.price) : undefined,
        discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
        discountPercent: data.discountPercent ? Number(data.discountPercent) : undefined,
        weightKg: data.weightKg ? Number(data.weightKg) : undefined,
        dimensions: data.dimensions ? JSON.parse(data.dimensions as string) : undefined,
        features: data.features ? JSON.parse(data.features as string) : undefined,
        specs: data.specs ? JSON.parse(data.specs as string) : undefined
      } as Partial<ProductInput>;

      const res = await productsApi("private").createProduct(productData);
      return res.data.data;
    },
    onSuccess: newProduct => {
      if (newProduct) {
        onClose();
        toast.success(`Đã tạo sản phẩm ${newProduct?.name}`);
        queryClient.setQueryData<Product[]>(["products"], oldData =>
          oldData ? [...oldData, newProduct] : [newProduct]
        );
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
    onError: err => {
      console.error("Error creating product:", err);
      toast.error(`Lỗi khi tạo sản phẩm`);
    }
  });

  const data = queryClient.getQueryData<Product[]>(["products"]);

  return {
    data,
    createProducts,
    loading: isPending,
    error: error as Error | null
  };
};

export const useUpdateProduct = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    error
  } = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }): Promise<void> => {
      const data = formDataToObject(formData);

      const productData = {
        ...data,
        id,
        price: data.price ? Number(data.price) : undefined,
        discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
        discountPercent: data.discountPercent ? Number(data.discountPercent) : undefined,
        weightKg: data.weightKg ? Number(data.weightKg) : undefined,
        dimensions: data.dimensions ? JSON.parse(data.dimensions as string) : undefined,
        features: data.features ? JSON.parse(data.features as string) : undefined,
        specs: data.specs ? JSON.parse(data.specs as string) : undefined
      } as { id: string } & Partial<ProductInput>;

      await productsApi("private").updateProduct(productData);
    },
    onSuccess: (_data, { formData }) => {
      const name = formData.get("name");
      onClose?.();
      toast.success(`Đã cập nhật sản phẩm ${name}`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: err => {
      console.error("Error updating product:", err);
      toast.error(`Lỗi khi cập nhật sản phẩm`);
    }
  });

  return {
    updateProduct,
    loading: isPending,
    error: error as Error | null
  };
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    error
  } = useMutation({
    mutationFn: async (product: Product): Promise<void> => {
      await productsApi("private").deleteProduct(product.id);
    },
    onSuccess: (_data, product) => {
      toast.success(`Đã xóa sản phẩm ${product?.name}`);
      queryClient.setQueryData<Product[]>(["products"], oldData => oldData?.filter(item => item.id !== product.id));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: err => {
      console.error("Error deleting product:", err);
      toast.error(`Lỗi khi xóa sản phẩm`);
    }
  });

  return {
    deleteProduct,
    loading: isPending,
    error: error as Error | null
  };
};
