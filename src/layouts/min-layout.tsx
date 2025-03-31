import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

const MinLayout = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = "Electronics Storee";

        switch (path) {
            case "/login":
                title = "Đăng nhập";
                break;
            case "/register":
                title = "Đăng ký";
                break;
            case "/terms":
                title = "Điều Khoản và Điều Kiện";
                break;
            case "/privacy":
                title = "Chính Sách Bảo Mật";
                break;
            default:
                title = "Electronics Store";
        }

        document.title = title;
    }, [location]);

    return (
        <>
            <main>
                <Outlet />
            </main>
            <Toaster />
        </>
    );
};

export default MinLayout;
