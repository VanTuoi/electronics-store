import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "~/components/footer";
import Header from "~/components/header/header";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = "Electronics Store";

        switch (path) {
            case "/about":
                title = "Giới thiệu";
                break;
            case "/products":
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
            <Footer />
            <Toaster />
        </>
    );
};

export default Layout;
