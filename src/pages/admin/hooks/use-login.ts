import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { userAtom } from "~/pages/admin/stores/auth";
import { authApi } from "~/services/auth";
import { LoginData } from "~/types";

interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = () => {
    const setUser = useSetAtom(userAtom);

    const {
        mutate: login,
        isPending: loading,
        error
    } = useMutation({
        mutationFn: async (credentials: LoginCredentials): Promise<LoginData | null> => {
            const res = await authApi("public").login(credentials);
            return res.data.data;
        },
        onSuccess: data => {
            if (!data) return;
            const { user, token } = data;

            localStorage.setItem("user-auth", JSON.stringify({ user, token }));

            setUser({ user });
        }
    });

    return {
        login,
        loading,
        error: error as Error | null
    };
};
