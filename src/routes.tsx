import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./app.tsx"));

const Layout = lazy(() => import("./layouts/layout.tsx"));
const ErrorPage = lazy(() => import("./pages/error.tsx"));
const HomePage = lazy(() => import("./pages/home.tsx"));
const CartPage = lazy(() => import("./pages/cart.tsx"));
const AboutPage = lazy(() => import("./pages/about.tsx"));
const DetailPage = lazy(() => import("./pages/detail.tsx"));
const CheckoutPage = lazy(() => import("./pages/checkout.tsx"));
const CheckOrderPage = lazy(() => import("./pages/check-order.tsx"));
const ProductPage = lazy(() => import("./pages/product.tsx"));
const MinLayout = lazy(() => import("./layouts/min-layout.tsx"));

const LoginPage = lazy(() => import("./pages/login.tsx"));
const FAQPage = lazy(() => import("./pages/faq.tsx"));
const PaymentPage = lazy(() => import("./pages/payment.tsx"));
const TermsPage = lazy(() => import("./pages/terms.tsx"));
const PrivacyPage = lazy(() => import("./pages/privacy.tsx"));

const AdminLayout = lazy(() => import("./pages/admin/admin.tsx"));
const AdminHomePage = lazy(() => import("./pages/admin/dashboard.tsx"));
const ProductsPage = lazy(() => import("./pages/admin/products.tsx"));
const CategoriesPage = lazy(() => import("./pages/admin/categories.tsx"));
const SchedulesPage = lazy(() => import("./pages/admin/schedules.tsx"));
const OrdersPage = lazy(() => import("./pages/admin/orders.tsx"));

const NotFoundPage = lazy(() => import("./pages/not-found.tsx"));
const HelloPage = lazy(() => import("./pages/hello.tsx"));

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
                    { path: "payment", element: <PaymentPage /> },
                    { path: "hello", element: <HelloPage /> }
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
                    { path: "check", element: <CheckOrderPage /> }
                ]
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminHomePage /> },
                    { path: "categories", element: <CategoriesPage /> },
                    { path: "products", element: <ProductsPage /> },
                    { path: "schedules", element: <SchedulesPage /> },
                    { path: "orders", element: <OrdersPage /> }
                ]
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ],
        errorElement: <ErrorPage />
    }
]);

export default routers;
