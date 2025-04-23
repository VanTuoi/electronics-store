import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { memo, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "~/components/footer";
import Header from "~/components/header/header";
import "~/styles/style.scss";

const Layout = memo(() => {
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
        <div className="layout-scope">
            <Header />
            <main className="main-layout">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
});

export default Layout;
