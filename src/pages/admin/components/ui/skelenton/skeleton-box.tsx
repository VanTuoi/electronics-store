import React from "react";

type SkeletonBoxProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
};

export const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width = "100%", height = "1rem", className = "" }) => {
    const style: React.CSSProperties = {
        width,
        height
    };

    return <div className={`bg-gray-200 rounded animate-pulse ${className}`} style={style}></div>;
};
