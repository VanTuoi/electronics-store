import { memo } from "react";

export const Services = memo(() => (
    <section className="ftco-section bg-light">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-md-7 text-center heading-section ">
                    <span className="subheading">Dịch vụ</span>
                    <h3 className="mb-3">Dịch vụ của chúng tôi</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="services services-2 w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                            <i className="fa fa-archive fa-3x text-light" aria-hidden="true"></i>
                        </div>
                        <div className="text w-100">
                            <h3 className="heading mb-2">Kinh doanh sản phẩm tủ điện</h3>
                            <p>Các sản phẩm tủ điện của chúng tôi đa dạng về chủng loại, chất lượng và giá cả.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="services services-2 w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                            <i className="fa fa-cogs fa-3x text-light" aria-hidden="true"></i>
                        </div>
                        <div className="text w-100">
                            <h3 className="heading mb-2">Hỗ trợ thiết kế tủ điện</h3>
                            <p>
                                Chúng tôi hỗ trợ thiết kế tủ điện theo yêu cầu của khách hàng, đảm bảo đáp ứng đầy đủ
                                các yêu cầu kỹ thuật và an toàn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
));
