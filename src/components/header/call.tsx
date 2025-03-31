import React from "react";
import { PHONE_NUMBER } from "~/constant";

const CallIcon: React.FC = () => {
    const handleClick = () => window.open(`tel:${PHONE_NUMBER}`);

    return (
        <div
            className="call-icon-wrapper position-relative"
            onClick={handleClick}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleClick();
            }}
            tabIndex={0}
            role="button"
        >
            <p>Liên hệ</p>
            <i className="bi bi-telephone-fill"></i>
        </div>
    );
};

export default CallIcon;
