import React from "react";
import { useSidebar } from "../hooks/use-sidebar";

const Backdrop: React.FC = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar();

    if (!isMobileOpen) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            toggleMobileSidebar();
        }
    };

    return (
        <div
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
            onClick={toggleMobileSidebar}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        />
    );
};

export default Backdrop;
