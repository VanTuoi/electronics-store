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

const AdminLayout = lazy(() => import("./pages/admin/index.tsx"));
const AdminHomePage = lazy(() => import("./pages/admin/pages/dashboard/home.tsx"));
const FormElementsPage = lazy(() => import("./pages/admin/pages/forms/form-elements.tsx"));
const ProductsPage = lazy(() => import("./pages/admin/pages/products/index.tsx"));
const BasicTablesPage = lazy(() => import("./pages/admin/pages/tables/basic-tables.tsx"));
const CategoriesPage = lazy(() => import("./pages/admin/pages/categories/index.tsx"));
const SchedulesPage = lazy(() => import("./pages/admin/pages/schedules/index.tsx"));
const OrdersPage = lazy(() => import("./pages/admin/pages/orders/index.tsx"));
const LineChartPage = lazy(() => import("./pages/admin/pages/charts/line-chart.tsx"));
const BarChartPage = lazy(() => import("./pages/admin/pages/charts/bar-chart.tsx"));

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
                    { path: "form-elements", element: <FormElementsPage /> },
                    { path: "basic-tables", element: <BasicTablesPage /> },
                    { path: "orders", element: <OrdersPage /> },
                    { path: "line-chart", element: <LineChartPage /> },
                    { path: "bar-chart", element: <BarChartPage /> }
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
