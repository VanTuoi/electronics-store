import { memo } from "react";
import { Link } from "react-router-dom";

export const Logo = memo(() => (
  <div className="logo-component mt-lg-2">
    <img className="logo-img" src="/logo.svg" alt="logo" />
    <Link className="navbar-brand" to="/">
      Electronics<span> Store</span>
    </Link>
  </div>
));
