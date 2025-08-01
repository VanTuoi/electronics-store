import { memo } from "react";

const Privacy = memo(() => (
  <div className="container py-5">
    <div className="p-4 rounded-3">
      <h1 className="text-primary mb-4">Chính Sách Bảo Mật</h1>

      <section className="mb-4">
        <h2 className="h4 text-secondary mb-3">1. Thông Tin Chúng Tôi Thu Thập</h2>
        <p>Chúng tôi chỉ thu thập những thông tin cần thiết để phục vụ việc đặt hàng và hỗ trợ khách hàng:</p>
        <ul className="text-muted">
          <li>Họ tên và thông tin liên hệ</li>
          <li>Địa chỉ giao hàng</li>
          <li>Thông tin đơn hàng</li>
          <li>Lịch sử mua hàng</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 text-secondary mb-3">2. Mục Đích Sử Dụng Thông Tin</h2>
        <p>Thông tin của khách hàng được sử dụng để:</p>
        <ul className="text-muted">
          <li>Xử lý và giao hàng</li>
          <li>Hỗ trợ khách hàng</li>
          <li>Thông báo về tình trạng đơn hàng</li>
          <li>Gửi thông tin khuyến mãi (nếu được cho phép)</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 text-secondary mb-3">3. Bảo Mật Thông Tin</h2>
        <p className="text-muted">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng bằng các biện pháp bảo mật phù hợp và không chia sẻ
          thông tin với bên thứ ba khi chưa được sự đồng ý.
        </p>
      </section>

      <section>
        <h2 className="h4 text-secondary mb-3">4. Liên Hệ</h2>
        <p className="text-muted">
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ qua email hoặc số điện
          thoại được cung cấp trong phần liên hệ.
        </p>
      </section>
    </div>
  </div>
));

export default Privacy;
