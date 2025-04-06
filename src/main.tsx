import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { AppWrapper } from "~/pages/admin/components/common/page-meta";

import { ThemeProvider } from "./pages/admin/provider/theme-provider";
import routers from "./routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={routers} />
                </QueryClientProvider>
            </AppWrapper>
        </ThemeProvider>
    </StrictMode>
);
