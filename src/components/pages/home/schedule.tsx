import { memo } from "react";
import { ScheduleForm } from "./schedule-form";

export const Schedule = memo(() => (
    <section className="ftco-section ftco-no-pt bg-light">
        <div className="container">
            <div className="row no-gutters">
                <div className="col-md-12 featured-top">
                    <div className="row no-gutters">
                        <div className="col-md-4 d-flex align-items-center">
                            <ScheduleForm />
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                            <div className="services-wrap rounded-3 w-100">
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
                                    <div className="col-md-4 d-flex align-self-stretch">
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
                                    <div className="col-md-4 d-flex align-self-stretch">
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
));
