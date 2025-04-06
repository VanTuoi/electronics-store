import { Link } from "react-router-dom";
import { CONTACT_INFO, SOCIAL_LINKS, STORE_NAME } from "../constant";

const Footer = () => {
    const handleEmailClick = () => {
        window.open(`mailto:${CONTACT_INFO.email}`);
    };

    const handlePhoneClick = () => {
        window.open(`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}`);
    };

    return (
        <footer className="ftco-footer ftco-bg-dark ftco-section">
            <div className="container">
                <div className="row mb-5 text-light">
                    <div className="col-md-3 col-sm-6">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">
                                <Link to="/" className="logo">
                                    {STORE_NAME.split(" ")[0]}
                                    <span>{STORE_NAME.split(" ")[1]}</span>
                                </Link>
                            </h2>
                            <p>
                                Chúng tôi cung cấp và thiết kế tủ điện theo yêu cầu, đảm bảo an toàn, tối ưu và phù hợp
                                với mọi nhu cầu công nghiệp, dân dụng, và tự động hóa.
                            </p>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                <li className="ftco-animate">
                                    <a href={SOCIAL_LINKS.twitter}>
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                </li>
                                <li className="ftco-animate">
                                    <a href={SOCIAL_LINKS.facebook}>
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                </li>
                                <li className="ftco-animate">
                                    <a href={SOCIAL_LINKS.instagram}>
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="ftco-footer-widget mb-4 ml-md-5">
                            <h2 className="ftco-heading-2">Thông Tin</h2>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/about" className="py-2 d-block">
                                        Về Chúng Tôi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className="py-2 d-block">
                                        Sản Phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" target="_blank" className="py-2 d-block">
                                        Điều Khoản và Điều Kiện
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy" target="_blank" className="py-2 d-block">
                                        Chính Sách Bảo Mật
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Hỗ Trợ Khách Hàng</h2>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/faq" target="_blank" className="py-2 d-block">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/payment" target="_blank" className="py-2 d-block">
                                        Phương Thức Thanh Toán
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" target="_blank" className="py-2 d-block">
                                        Quản trị
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Thông Tin Liên Hệ</h2>
                            <div className="block-23 mb-3">
                                <ul className="list-unstyled">
                                    <li>
                                        <i className="bi bi-geo-alt mr-3"></i>
                                        <span className="text-light">{CONTACT_INFO.address}</span>
                                    </li>
                                    <li>
                                        <i className="bi bi-telephone mr-2"></i>
                                        <button
                                            name="số điện thoại"
                                            onClick={handlePhoneClick}
                                            className="border-0 bg-transparent text-light"
                                        >
                                            {CONTACT_INFO.phone}
                                        </button>
                                    </li>
                                    <li>
                                        <i className="bi bi-envelope mr-2"></i>
                                        <button
                                            name="email"
                                            onClick={handleEmailClick}
                                            className="border-0 bg-transparent text-light"
                                        >
                                            {CONTACT_INFO.email}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>&copy; {new Date().getFullYear()} ElectronicsStore. Bản quyền được bảo vệ</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
