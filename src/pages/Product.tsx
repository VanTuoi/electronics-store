import { Link } from "react-router-dom";

const Product = () => (
    <>
        <section
            className="hero-wrap hero-wrap-2 js-fullheight"
            style={{ backgroundImage: "url('imgs/bg/bg.jpg')" }}
            data-stellar-background-ratio="0.5"
        >
            <div className="overlay"></div>
            <div className="container">
                <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                    <div className="col-md-9 pb-5">
                        <p className="breadcrumbs">
                            <span className="mr-2">
                                <Link to="/">
                                    Trang chủ <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                </Link>
                            </span>
                            <span>
                                Tủ điện <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </span>
                        </p>
                        <h1 className="mb-3 bread">Lựa chọn tủ điện</h1>
                    </div>
                </div>
            </div>
        </section>
    </>
);

export default Product;
