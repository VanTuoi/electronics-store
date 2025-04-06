import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const canGoBack = window.history.length > 1;

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <div className="mt-4">
                    <h2 className="h2 text-dark">Trang bạn đang tìm không tồn tại</h2>
                </div>
                <div className="mt-5 d-flex gap-3 justify-content-center">
                    {canGoBack && (
                        <button onClick={() => navigate(-1)} className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Quay lại
                        </button>
                    )}

                    <Link to="/" className="btn btn-primary">
                        <i className="bi bi-house-door me-2"></i>
                        Trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
