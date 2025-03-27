import { useMutation } from "@tanstack/react-query";
import { User } from "~/types";

interface LoginCredentials {
    email: string;
    password: string;
}

const defaultAdmin = {
    email: "admin@gmail.com",
    password: "123456"
};

const fakeLogin = async (credentials: LoginCredentials): Promise<User> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.email === defaultAdmin.email && credentials.password === defaultAdmin.password) {
                resolve({
                    id: "1",
                    email: credentials.email,
                    name: "Admin"
                });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });

export const useLogin = () => {
    const { mutate, isPending, error } = useMutation({
        mutationFn: fakeLogin,
        onSuccess: data => {
            localStorage.setItem("user", JSON.stringify(data));
        }
    });

    return {
        login: mutate,
        loading: isPending,
        error: error as Error | null
    };
};
