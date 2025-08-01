import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { memo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorPage = memo(({ error, resetError }: ErrorPageProps) => (
  <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <Helmet>
      <title>Lỗi hệ thống | Electronics Store</title>
    </Helmet>
    <div className="text-center">
      <h1 className="display-1 fw-bold text-danger">500</h1>
      <div className="mt-4">
        <h2 className="h2 text-dark">Oops! Đã xảy ra lỗi</h2>
        <p className="text-muted">{error?.message || "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau."}</p>
      </div>
      <div className="mt-5">
        <button onClick={() => resetError?.()} className="btn btn-outline-danger me-3">
          <i className="bi bi-arrow-clockwise me-2"></i>
          Thử lại
        </button>
        <Link to="/" className="btn btn-primary">
          <i className="bi bi-house-door me-2"></i>
          Quay về trang chủ
        </Link>
      </div>
    </div>
  </div>
));

export default ErrorPage;
