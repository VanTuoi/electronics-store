import { Link } from "react-router-dom";

export const Logo = () => (
    <>
        <img className="logo-img" src="/logo.svg" alt="logo" />
        <Link className="navbar-brand" to="/">
            Electronics<span> Store</span>
        </Link>
    </>
);
