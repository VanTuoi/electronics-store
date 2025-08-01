import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "~/styles/style.scss";

import { memo, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MinLayout = memo(() => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Electronics Storee";

    switch (path) {
      case "/login":
        title = "Đăng nhập";
        break;
      case "/register":
        title = "Đăng ký";
        break;
      case "/terms":
        title = "Điều Khoản và Điều Kiện";
        break;
      case "/privacy":
        title = "Chính Sách Bảo Mật";
        break;
      default:
        title = "Electronics Store";
    }

    document.title = title;
  }, [location]);

  return (
    <div className="layout-scope">
      <main>
        <Outlet />
      </main>
    </div>
  );
});

export default MinLayout;
