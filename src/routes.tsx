import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const HomePage = lazy(() => import("./pages/Home.tsx"));
const CartPage = lazy(() => import("./pages/Cart.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const DetailPage = lazy(() => import("./pages/Detail.tsx"));
const PrivacyPage = lazy(() => import("./pages/Privacy.tsx"));
const TermsPage = lazy(() => import("./pages/Terms.tsx"));
const ProductPage = lazy(() => import("./pages/Product.tsx"));
const PaymentPage = lazy(() => import("./pages/Payment.tsx"));
const FAQPage = lazy(() => import("./pages/FAQ.tsx"));
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
                    },
                    { path: "privacy", element: <PrivacyPage /> },
                    { path: "terms", element: <TermsPage /> },
                    { path: "faq", element: <FAQPage /> },
                    { path: "payment", element: <PaymentPage /> }
                ]
            },
            {
                path: "",
                element: <Layout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "cart", element: <CartPage /> },
                    { path: "products", element: <ProductPage /> },
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
