import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "~/styles/style.scss";

import { memo } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "~/components/common";

const Layout = memo(() => (
  <div className="layout-scope">
    <Header />
    <main className="main-layout">
      <Outlet />
    </main>
    <Footer />
  </div>
));

export default Layout;
