import { memo } from "react";
import { Link } from "react-router-dom";

import { CONTACT_INFO, SOCIAL_LINKS, STORE_NAME } from "~/constant";

export const Footer = memo(() => {
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
              <p className="ftco-heading-2 fs-4">
                <Link to="/" className="logo">
                  {STORE_NAME.split(" ")[0]}
                  <span>{STORE_NAME.split(" ")[1]}</span>
                </Link>
              </p>
              <p className="fs-6">
                Chúng tôi cung cấp và thiết kế tủ điện theo yêu cầu, đảm bảo an toàn, tối ưu và phù hợp với mọi nhu cầu
                công nghiệp, dân dụng, và học tập.
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
              <p className="ftco-heading-2">Thông Tin</p>
              <ul className="list-unstyled">
                <li>
                  <Link to="/#about" className="py-2 d-block text-light">
                    Về Chúng Tôi
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="py-2 d-block text-light">
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/terms" target="_blank" className="py-2 d-block text-light">
                    Điều Khoản và Điều Kiện
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" target="_blank" className="py-2 d-block text-light">
                    Chính Sách Bảo Mật
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="ftco-footer-widget mb-4">
              <p className="ftco-heading-2">Hỗ Trợ Khách Hàng</p>
              <ul className="list-unstyled">
                <li>
                  <Link to="/faq" target="_blank" className="py-2 d-block text-light">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/check" className="py-2 d-block text-light">
                    Kiểm tra đơn hàng
                  </Link>
                </li>
                <li>
                  <Link to="/payment" target="_blank" className="py-2 d-block text-light">
                    Phương Thức Thanh Toán
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" target="_blank" className="py-2 d-block text-light">
                    Quản trị
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="ftco-footer-widget mb-4">
              <p className="ftco-heading-2">Thông Tin Liên Hệ</p>
              <div className="block-23 mb-3">
                <ul className="list-unstyled">
                  <li className="py-2">
                    <i className="bi bi-geo-alt mr-3"></i>
                    <span className="text-light">{CONTACT_INFO.address}</span>
                  </li>
                  <li className="py-2">
                    <i className="bi bi-telephone mr-2"></i>
                    <button
                      name="số điện thoại"
                      onClick={handlePhoneClick}
                      className="border-0 bg-transparent text-light"
                    >
                      {CONTACT_INFO.phone}
                    </button>
                  </li>
                  <li className="py-2">
                    <i className="bi bi-envelope mr-2"></i>
                    <button name="email" onClick={handleEmailClick} className="border-0 bg-transparent text-light">
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
});
