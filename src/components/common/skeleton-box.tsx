import React, { memo } from "react";

type SkeletonBoxProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const SkeletonBox: React.FC<SkeletonBoxProps> = memo(({ width = "100%", height = "1rem", className }) => {
  const style: React.CSSProperties = {
    width,
    height
  };

  return <span className={`placeholder placeholder-wave d-block rounded ${className || ""}`} style={style}></span>;
});
