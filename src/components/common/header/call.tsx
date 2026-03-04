import React, { memo } from "react";

import { PHONE_NUMBER } from "~/constant";

export const CallIcon: React.FC = memo(() => {
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
      aria-label={`Call phone number ${PHONE_NUMBER}`}
    >
      <p>Liên hệ</p>
      <i className="bi bi-telephone-fill d-none d-lg-inline ms-2" role="img" aria-label="Phone icon"></i>
    </div>
  );
});
