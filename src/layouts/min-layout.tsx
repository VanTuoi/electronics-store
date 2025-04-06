import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { loadSCSS, unloadScopedStyles } from "~/utils/stylesheet-manager";

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

        const unloadLayoutStyles = loadSCSS("/src/styles/style.scss");

        return () => {
            unloadLayoutStyles();
            unloadScopedStyles();
        };
    }, [location]);

    return (
        <div className="layout-scope">
            <main>
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
};

export default MinLayout;
