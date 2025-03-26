import React from "react";

type LoadingBoxProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
};

export const LoadingBox: React.FC<LoadingBoxProps> = ({ width = "100%", height = "200px", className }) => {
    const style: React.CSSProperties = {
        width,
        height
    };

    return (
        <div
            className={`d-flex justify-content-center align-items-center bg-light rounded ${className || ""}`}
            style={style}
        >
            <div className="spinner-border text-secondary" role="status" />
        </div>
    );
};
