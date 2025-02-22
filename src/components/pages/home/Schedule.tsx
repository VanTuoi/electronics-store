export const Schedule = () => (
    <section className="ftco-section ftco-no-pt bg-light">
        <div className="container">
            <div className="row no-gutters">
                <div className="col-md-12	featured-top">
                    <div className="row no-gutters">
                        <div className="col-md-4 d-flex align-items-center">
                            <form action="#" className="request-form bg-primary wow fadeInUp" data-wow-delay="0.1s">
                                <h2>Đặt lịch hẹn tư vấn hỗ trợ</h2>
                                <div className="form-group">
                                    <label htmlFor="fullname" className="label">
                                        Họ và tên
                                    </label>
                                    <input
                                        id="fullname"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nguyễn Trần Thủy Tiên"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="label">
                                        Số điện thoại (Có sử dụng Zalo)
                                    </label>
                                    <input id="phone" type="text" className="form-control" placeholder="0369369369" />
                                </div>
                                <div className="d-flex">
                                    <div className="form-group mr-2">
                                        <label htmlFor="book_pick_date" className="label">
                                            Ghi chú
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="book_pick_date"
                                            placeholder="Loại đồ án,..."
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Đặt lịch hẹn" className="btn btn-secondary py-3 px-3" />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                            <div className="services-wrap rounded-right w-100">
                                <h3 className="heading-section mb-4">Làm cho đồ án của bạn trở nên dễ dàng hơn</h3>
                                <div className="row d-flex mb-4">
                                    <div className="col-md-4 d-flex align-self-stretch">
                                        <div className="services w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i
                                                    className="fa fa-address-card fa-3x text-primary"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <div className="text w-100">
                                                <h3 className="heading mb-2">
                                                    Nhập thông tin liên hệ và mô tả yêu cầu
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex align-self-stretch ">
                                        <div className="services w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i
                                                    className="fa fa-paper-plane fa-3x text-primary"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <div className="text w-100">
                                                <h3 className="heading mb-2">Gửi thông tin liên hệ</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex align-self-stretch ">
                                        <div className="services w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i className="fa fa-phone fa-3x text-primary" aria-hidden="true"></i>
                                            </div>
                                            <div className="text w-100">
                                                <h3 className="heading mb-2">Bên mình sẽ liên hệ lại sớm nhất</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
