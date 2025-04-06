import { Outlet } from "react-router";
import { useSidebar } from "../hooks/use-sidebar";
import { SidebarProvider } from "../provider/sidebar-provider";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import Backdrop from "./backdrop";

const LayoutContent = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AppLayout = () => (
    <SidebarProvider>
        <LayoutContent />
    </SidebarProvider>
);

export default AppLayout;
