import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = "Electronics Store";

        switch (path) {
            case "/about":
                title = "Giới thiệu";
                break;
            case "/product":
                title = "Tủ điện";
                break;
            case "/404":
                title = "404";
                break;
            case "/contact":
                title = "Liên hệ";
                break;
            case "/":
                title = "Trang chủ";
                break;
            default:
                title = "Electronics Store";
        }

        document.title = title;
    }, [location]);

    return (
        <>
            <Header />
            <main className="main-layout">
                <Outlet />
            </main>
            <Toaster />
            <Footer />
        </>
    );
};

export default Layout;
