import "bootstrap-icons/font/bootstrap-icons.css";
import "~/styles/style.scss";

import { memo } from "react";
import { Outlet } from "react-router-dom";

const MinLayout = memo(() => (
  <div className="layout-scope">
    <main>
      <Outlet />
    </main>
  </div>
));

export default MinLayout;
