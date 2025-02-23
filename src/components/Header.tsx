import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Electronics<span> Store</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="ftco-nav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                            <Link to="/" className="nav-link">
                                Trang chủ
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/product" ? "active" : ""}`}>
                            <Link to="/" className="nav-link">
                                Tủ điện
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>
                            <Link to="/" className="nav-link">
                                Liên hệ
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
                            <Link to="/" className="nav-link">
                                Giới thiệu
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
