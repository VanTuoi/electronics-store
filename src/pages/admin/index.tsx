import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AppLayout from "./layout/app-layout";
import { userAtom } from "./stores/auth";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (user?.user?.role !== "admin") {
            setErrorMessage("Bạn không có quyền truy cập chức năng này !!!");
        }
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        let removedStyle: HTMLStyleElement | null = null;

        const styles = document.querySelectorAll("style[data-vite-dev-id]");
        styles.forEach(style => {
            const devId = style.getAttribute("data-vite-dev-id");
            if (devId?.includes("style.scss")) {
                removedStyle = style.cloneNode(true) as HTMLStyleElement;
                style.remove();
            }
        });

        return () => {
            if (removedStyle) {
                document.head.appendChild(removedStyle);
            }
        };
    }, []);

    const handleLoginRedirect = () => {
        navigate("/auth/login");
    };

    if (isLoading || errorMessage) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <div className="text-lg">{errorMessage}</div>
                <p className="mt-4 text-sm">
                    Đăng nhập để tiếp tục{" "}
                    <button className="text-blue-500 underline" onClick={handleLoginRedirect}>
                        tại đây
                    </button>
                </p>
            </div>
        );
    }

    return (
        <>
            <AppLayout />
            <Toaster />
        </>
    );
};

export default AdminHomePage;
