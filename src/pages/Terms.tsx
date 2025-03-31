const Terms = () => (
    <div className="container py-5">
        <div className="bg-light p-4 rounded-3 shadow-sm">
            <h1 className="text-primary mb-4">Điều Khoản và Điều Kiện</h1>

            <section className="mb-4">
                <h2 className="h4 text-secondary mb-3">1. Điều Khoản Sử Dụng</h2>
                <p className="text-muted">
                    Bằng việc truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ và chịu ràng buộc bởi các
                    điều khoản và điều kiện được quy định dưới đây.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="h4 text-secondary mb-3">2. Đặt Hàng và Thanh Toán</h2>
                <ul className="text-muted">
                    <li>Giá sản phẩm đã bao gồm thuế VAT</li>
                    <li>Đơn hàng chỉ được xác nhận sau khi thanh toán đặt cọc</li>
                    <li>Chúng tôi chấp nhận thanh toán qua chuyển khoản và tiền mặt</li>
                    <li>Thời gian giao hàng có thể thay đổi tùy theo khu vực</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="h4 text-secondary mb-3">3. Chính Sách Bảo Hành</h2>
                <ul className="text-muted">
                    <li>Thời gian bảo hành tùy thuộc vào từng sản phẩm</li>
                    <li>Bảo hành không áp dụng cho các trường hợp sử dụng sai mục đích</li>
                    <li>Khách hàng cần giữ hóa đơn và phiếu bảo hành</li>
                    <li>Liên hệ trực tiếp để được hỗ trợ bảo hành</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="h4 text-secondary mb-3">4. Chính Sách Đổi Trả</h2>
                <p className="text-muted">Sản phẩm được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu:</p>
                <ul className="text-muted">
                    <li>Sản phẩm bị lỗi kỹ thuật</li>
                    <li>Sản phẩm không đúng với đơn đặt hàng</li>
                    <li>Sản phẩm còn nguyên vẹn, không có dấu hiệu đã sử dụng</li>
                </ul>
            </section>

            <section>
                <h2 className="h4 text-secondary mb-3">5. Thay Đổi Điều Khoản</h2>
                <p className="text-muted">
                    Chúng tôi có quyền thay đổi các điều khoản này mà không cần thông báo trước. Việc tiếp tục sử dụng
                    website sau khi thay đổi đồng nghĩa với việc bạn chấp nhận những thay đổi đó.
                </p>
            </section>
        </div>
    </div>
);

export default Terms;
