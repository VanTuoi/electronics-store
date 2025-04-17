import { Outlet } from "react-router";
import { useSidebar } from "../hooks/use-sidebar";
import { SidebarProvider } from "../provider/sidebar-provider";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import Backdrop from "./backdrop";

const LayoutContent = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-900">
            <div className="fixed z-30">
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 ${
                    isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-[--breakpoint-2xl] md:p-6 text-gray-900 dark:text-gray-100">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AppLayout = () => (
    <SidebarProvider>
        <div className="dark:bg-gray-900">
            <LayoutContent />
        </div>
    </SidebarProvider>
);

export default AppLayout;
