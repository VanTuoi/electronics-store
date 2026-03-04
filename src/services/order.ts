import { Order, ResponseData } from "~/types";
import { getApi } from "~/utils/api-selector";

export const ordersApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    getOrder: (id: string) => api.get<ResponseData<Order | null>>(`/orders/${id}`),
    getOrders: (params?: { search?: string; status?: string }) =>
      api.get<ResponseData<Order[] | null>>("/orders", { params }),
    createOrder: (order: Partial<Order>) => api.post<ResponseData<Order | null>>("/orders", order),
    updateOrder: (order: Partial<Order>) => api.put<ResponseData<Order | null>>(`/orders/${order.id}`, order),
    deleteOrder: (id: string) => api.delete<ResponseData<null>>(`/orders/${id}`)
  };
};
