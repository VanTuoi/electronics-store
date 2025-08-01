import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ordersApi } from "~/services/order";
import { Order } from "~/types";

export const useGetOrderById = (id?: string) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async (): Promise<Order | null> => {
      if (!id) return null;
      const res = await ordersApi("private").getOrder(id);
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

export const useGetOrders = (params?: { search?: string; orderId?: string; status?: string }) => {
  const {
    data,
    refetch,
    isPending: loading,
    error
  } = useQuery<Order[]>({
    queryKey: ["orders", params],
    queryFn: async (): Promise<Order[]> => {
      const res = await ordersApi("private").getOrders(params);
      return res.data.data ?? [];
    },
    staleTime: 5 * 60 * 1000
  });

  if (error) {
    console.error("Error fetching orders:", error);
    toast.error("Lỗi khi lấy tất cả đơn hàng");
  }

  return {
    data,
    refetch,
    loading,
    error: error as Error | null
  };
};

export const useCreateOrders = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: createOrders,
    isPending,
    data: mutationData,
    error
  } = useMutation({
    mutationFn: async (scheduleData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order | null> => {
      const res = await ordersApi("private").createOrder(scheduleData);
      return res.data.data;
    },
    onSuccess: newOrder => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onClose?.();
      toast.success(`Đã tạo đơn hàng cho ${newOrder?.name}`);
    },
    onError: err => {
      console.error("Error creating schedule:", err);
      toast.error(`Lỗi khi tạo đơn hàng`);
    }
  });

  return {
    data: mutationData,
    createOrders,
    loading: isPending,
    error: error as Error | null
  };
};

export const useUpdateOrder = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: updateOrder,
    isPending,
    error
  } = useMutation({
    mutationFn: async (schedule: Omit<Order, "createdAt" | "updatedAt">): Promise<void> => {
      await ordersApi("private").updateOrder(schedule);
    },
    onSuccess: (_data, updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onClose?.();
      toast.success(`Đã cập nhật đơn hàng cho ${updatedOrder?.name}`);
    },
    onError: err => {
      console.error("Error updating schedule:", err);
      toast.error(`Lỗi khi cập nhật đơn hàng`);
    }
  });

  return {
    updateOrder,
    loading: isPending,
    error: error as Error | null
  };
};

export const useDeleteOrders = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteOrder,
    isPending,
    error
  } = useMutation({
    mutationFn: async (schedule: Order): Promise<void> => {
      await ordersApi("private").deleteOrder(schedule.id);
    },
    onSuccess: (_data, schedule) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onClose?.();
      toast.success(`Đã xóa đơn hàng cho${schedule?.name}`);
    },
    onError: err => {
      console.error("Error deleting schedule:", err);
      toast.error(`Lỗi khi xóa đơn hàng`);
    }
  });

  return {
    deleteOrder,
    loading: isPending,
    error: error as Error | null
  };
};
