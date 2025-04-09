import { ReactNode } from "react";

interface TooltipTextProps {
    children: ReactNode;
    maxWidth?: string;
}

export const TooltipText = ({ children, maxWidth = "max-w-xs" }: TooltipTextProps) => (
    <div className={`relative group`}>
        <div className={`truncate ${maxWidth} cursor-default`}>{children}</div>
        <div className="absolute z-50 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded shadow-md whitespace-normal max-w-sm left-1/2 -translate-x-1/2 bottom-full mb-1">
            {children}
        </div>
    </div>
);
