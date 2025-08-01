import { memo } from "react";

const Payment = memo(() => (
  <div className="container py-5">
    <div className="p-4">
      <h1 className="text-primary mb-4">Phương Thức Thanh Toán</h1>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5 text-secondary">Chuyển Khoản Ngân Hàng</h3>
              <div className="card-text text-muted">
                <p>Thông tin tài khoản:</p>
                <ul className="list-unstyled">
                  <li>Ngân hàng: Vietcombank</li>
                  <li>Số tài khoản: 1234567890</li>
                  <li>Chủ tài khoản: CÔNG TY TNHH ABC</li>
                  <li>Chi nhánh: Hà Nội</li>
                </ul>
                <p className="small">
                  <i className="bi bi-info-circle me-2"></i>
                  Nội dung chuyển khoản: [Mã đơn hàng] - [Số điện thoại]
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5 text-secondary">Thanh Toán Khi Nhận Hàng (COD)</h3>
              <div className="card-text text-muted">
                <p>Quy trình thanh toán COD:</p>
                <ul>
                  <li>Kiểm tra hàng hóa khi nhận</li>
                  <li>Thanh toán cho nhân viên giao hàng</li>
                  <li>Giữ lại biên nhận thanh toán</li>
                </ul>
                <p className="small">
                  <i className="bi bi-info-circle me-2"></i>
                  Áp dụng cho đơn hàng dưới 20 triệu đồng
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title h5 text-secondary">Lưu Ý Quan Trọng</h3>
              <ul className="card-text text-muted mb-0">
                <li>Đơn hàng sẽ được xác nhận sau khi nhận được thanh toán</li>
                <li>Giữ lại chứng từ thanh toán cho đến khi nhận được hàng</li>
                <li>Liên hệ ngay với chúng tôi nếu có bất kỳ vấn đề về thanh toán</li>
                <li>Không chấp nhận thanh toán qua các tài khoản không được liệt kê</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default Payment;
