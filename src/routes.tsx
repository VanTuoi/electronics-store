import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./app.tsx"));
const ErrorPage = lazy(() => import("./pages/error.tsx"));
const HomePage = lazy(() => import("./pages/home.tsx"));
const CartPage = lazy(() => import("./pages/cart.tsx"));
const AboutPage = lazy(() => import("./pages/about.tsx"));
const DetailPage = lazy(() => import("./pages/detail.tsx"));
const CheckoutPage = lazy(() => import("./pages/checkout.tsx"));
const PrivacyPage = lazy(() => import("./pages/privacy.tsx"));
const TermsPage = lazy(() => import("./pages/terms.tsx"));
const ProductPage = lazy(() => import("./pages/product.tsx"));
const PaymentPage = lazy(() => import("./pages/payment.tsx"));
const FAQPage = lazy(() => import("./pages/faq.tsx"));
const LoginPage = lazy(() => import("./pages/login.tsx"));
const MinLayout = lazy(() => import("./layouts/min-layout.tsx"));
const Layout = lazy(() => import("./layouts/layout.tsx"));

const AdminLayout = lazy(() => import("./layouts/admin-layout.tsx"));
const AdminHomePage = lazy(() => import("./pages/admin.tsx"));

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
                    { path: "check-out", element: <CheckoutPage /> },
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
