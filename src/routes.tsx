import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const HomePage = lazy(() => import("./pages/Home.tsx"));
const CartPage = lazy(() => import("./pages/Cart.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const DetailPage = lazy(() => import("./pages/Detail.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const LoginPage = lazy(() => import("./pages/Login.tsx"));
const MinLayout = lazy(() => import("./layouts/MinLayout.tsx"));
const Layout = lazy(() => import("./layouts/Layout.tsx"));

const AdminLayout = lazy(() => import("./layouts/AdminLayout.tsx"));
const AdminHomePage = lazy(() => import("./pages/AdminPage.tsx"));

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MinLayout />,
                children: [
                    {
                        path: "auth",
                        children: [{ path: "login", element: <LoginPage /> }]
                    }
                ]
            },
            {
                path: "",
                element: <Layout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "contact", element: <ContactPage /> },
                    { path: "cart", element: <CartPage /> },
                    { path: "products", element: <Product /> },
                    { path: "product/:id", element: <DetailPage /> },
                    {
                        path: "admin",
                        element: <AdminLayout />,
                        children: [{ index: true, element: <AdminHomePage /> }]
                    }
                ]
            }
        ],
        errorElement: <ErrorPage />
    }
]);

export default routers;
