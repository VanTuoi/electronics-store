import { memo } from "react";

const FAQ = memo(() => (
    <div className="container py-5">
        <div className="bg-light p-4 rounded-3 shadow-sm">
            <h1 className="text-primary mb-4">Câu Hỏi Thường Gặp (FAQ)</h1>

            <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                        >
                            1. Làm thế nào để đặt hàng?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted">
                            <p>Quy trình đặt hàng gồm các bước sau:</p>
                            <ul>
                                <li>Chọn sản phẩm và thêm vào giỏ hàng</li>
                                <li>Kiểm tra giỏ hàng và tiến hành thanh toán</li>
                                <li>Điền thông tin giao hàng</li>
                                <li>Chọn phương thức thanh toán</li>
                                <li>Xác nhận đơn hàng</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                        >
                            2. Thời gian giao hàng là bao lâu?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted">
                            <p>Thời gian giao hàng phụ thuộc vào khu vực:</p>
                            <ul>
                                <li>Nội thành: 2-3 ngày làm việc</li>
                                <li>Ngoại thành: 3-5 ngày làm việc</li>
                                <li>Tỉnh thành khác: trong vòng 5 - 7 ngày làm việc</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                        >
                            3. Chính sách bảo hành như thế nào?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted">
                            <ul>
                                <li>Bảo hành 12 tháng cho các sản phẩm chính hãng</li>
                                <li>Đổi mới trong 7 ngày đầu nếu có lỗi từ nhà sản xuất</li>
                                <li>Hỗ trợ kỹ thuật trọn đời sản phẩm</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                        >
                            4. Làm sao để theo dõi đơn hàng?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted">
                            <p>Bạn có thể theo dõi đơn hàng bằng các cách sau:</p>
                            <ul>
                                <li>Đăng nhập vào tài khoản và xem trong mục Đơn hàng của tôi</li>
                                <li>Sử dụng mã đơn hàng được gửi qua email</li>
                                <li>Liên hệ trực tiếp với bộ phận CSKH</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

export default FAQ;
