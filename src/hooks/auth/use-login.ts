import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { authApi } from "~/services/auth";
import { userAtom } from "~/stores/auth";
import { LoginData } from "~/types";

interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = (onSuccessCallback?: () => void) => {
    const setUser = useSetAtom(userAtom);

    const {
        mutate: login,
        isPending: loading,
        error
    } = useMutation<LoginData | null, AxiosError<{ message: string }>, LoginCredentials>({
        mutationFn: async credentials => {
            const res = await authApi("public").login(credentials);
            return res.data.data;
        },
        onSuccess: data => {
            if (!data) return;
            const { user, token } = data;

            localStorage.setItem("token", JSON.stringify({ token }));
            setUser({ user });

            toast.success("Đăng nhập thành công");

            if (onSuccessCallback) {
                onSuccessCallback();
            }
        }
    });

    return {
        login,
        loading,
        errorMessage: error?.response?.data?.message ?? error?.message ?? null
    };
};
