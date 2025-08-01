import { LoginData, ResponseData, User } from "~/types";
import { getApi } from "~/utils/api-selector";

export const authApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    login: (user: Partial<User>) => api.post<ResponseData<LoginData | null>>("/auth/login", user)
  };
};
