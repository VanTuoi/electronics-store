import { atom } from "jotai";
import { User } from "~/types";

const USER_STORAGE_KEY = "user-auth";

const loadUserFromStorage = (): { user: User | null; accessToken: string | null; refreshToken: string | null } => {
    if (typeof window === "undefined") return { user: null, accessToken: null, refreshToken: null };

    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            return {
                user: parsedUser.user || null,
                accessToken: parsedUser.accessToken || null,
                refreshToken: parsedUser.refreshToken || null
            };
        } catch (error) {
            console.error("Error loading user from localStorage:", error);
            return { user: null, accessToken: null, refreshToken: null };
        }
    }
    return { user: null, accessToken: null, refreshToken: null };
};

const userAtomBase = atom<{ user: User | null }>(loadUserFromStorage());

export const userAtom = atom(
    get => get(userAtomBase),
    (_, set, newUserData: { user: User | null }) => {
        set(userAtomBase, newUserData);
        if (typeof window !== "undefined") {
            localStorage.setItem(
                USER_STORAGE_KEY,
                JSON.stringify({
                    user: newUserData.user
                })
            );
        }
    }
);
