import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = "Electronics Store";

        switch (path) {
            case "/admin":
                title = "Admin";
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

export default Layout;
