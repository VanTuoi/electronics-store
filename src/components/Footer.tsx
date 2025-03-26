import { Link } from "react-router-dom";
import { CONTACT_INFO, NEWSLETTER, QUICK_LINKS, SOCIAL_LINKS, STORE_DESCRIPTION, STORE_NAME } from "../constant";

const Footer = () => {
    const handleEmailClick = () => {
        window.open(`mailto:${CONTACT_INFO.email}`);
    };

    const handlePhoneClick = () => {
        window.open(`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}`);
    };

    return (
        <footer className="bg-dark py-5">
            <div className="container">
                <div className="row g-4 ">
                    <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center">
                        <Link className="navbar-brand pt-0 mb-2" to="/">
                            {STORE_NAME.split(" ")[0]}
                            <span> {STORE_NAME.split(" ")[1]}</span>
                        </Link>
                        <p className="mb-4 text-light">{STORE_DESCRIPTION}</p>
                        <div className="social-links d-flex gap-4">
                            <a href={SOCIAL_LINKS.facebook} className="text-light" aria-label="Facebook">
                                <i className="bi bi-facebook fs-3"></i>
                            </a>
                            <a href={SOCIAL_LINKS.twitter} className="text-light" aria-label="Twitter">
                                <i className="bi bi-twitter fs-3"></i>
                            </a>
                            <a href={SOCIAL_LINKS.instagram} className="text-light" aria-label="Instagram">
                                <i className="bi bi-instagram fs-3"></i>
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} className="text-light" aria-label="LinkedIn">
                                <i className="bi bi-linkedin fs-3"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className="mb-3 text-light">Liên Kết Nhanh</h5>
                        <ul className="list-unstyled">
                            {QUICK_LINKS.map(link => (
                                <li key={link.path} className="mb-2">
                                    <Link to={link.path} className="text-light text-decoration-none">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="mb-3 text-light">Thông Tin Liên Hệ</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2 text-light">
                                <i className="bi bi-geo-alt me-2 mr-1"></i>
                                {CONTACT_INFO.address}
                            </li>
                            <li className="mb-2 text-light">
                                <i className="bi bi-building me-2 mr-1"></i>
                                {CONTACT_INFO.city}
                            </li>
                            <li className="mb-2 text-light">
                                <i className="bi bi-telephone me-2 mr-1"></i>
                                <button
                                    onClick={handlePhoneClick}
                                    className="btn btn-link text-light text-decoration-none p-0 border-0"
                                    aria-label={`Gọi điện thoại ${CONTACT_INFO.phone}`}
                                >
                                    {CONTACT_INFO.phone}
                                </button>
                            </li>
                            <li className="mb-2 text-light">
                                <i className="bi bi-envelope me-2 mr-1"></i>
                                <button
                                    onClick={handleEmailClick}
                                    className="btn btn-link text-light text-decoration-none p-0 border-0"
                                    aria-label={`Gửi email đến ${CONTACT_INFO.email}`}
                                >
                                    {CONTACT_INFO.email}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3 text-light">{NEWSLETTER.title}</h5>
                        <p className="mb-3 text-light">{NEWSLETTER.description}</p>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder={NEWSLETTER.placeholder} />
                            <button className="btn btn-primary">
                                <i className="bi bi-send me-2 mr-1"></i>
                                {NEWSLETTER.buttonText}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <hr className="bg-light" />
                        <div className="text-center">
                            <p className="mb-0">
                                &copy; {new Date().getFullYear()}{" "}
                                <Link to="/" className="text-primary text-decoration-none">
                                    {STORE_NAME}
                                </Link>
                                . Bản quyền được bảo vệ.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
