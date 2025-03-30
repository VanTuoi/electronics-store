import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCurrency } from "~/utils/priceUtils";

const products = [
    {
        id: 1,
        name: "Tủ điện công nghiệp",
        category: "Điện lực",
        price: 500000,
        image: "imgs/product.png"
    },
    {
        id: 2,
        name: "Tủ điện điều khiển",
        category: "Tự động hóa",
        price: 600000,
        image: "imgs/product.png"
    },
    {
        id: 3,
        name: "Tủ điện dân dụng",
        category: "Gia đình",
        price: 400000,
        image: "imgs/product.png"
    },
    {
        id: 4,
        name: "Tủ điện ngoài trời",
        category: "Môi trường",
        price: 550000,
        image: "imgs/product.png"
    }
];

export const TopProducts = () => (
    <section className="ftco-section ftco-no-pt bg-light">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 heading-section text-center mb-5">
                    <span className="subheading">Chúng tôi cung cấp</span>
                    <h2 className="mb-2">Các loại tủ điện như</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="car-wrap rounded shadow p-3 bg-white">
                                    <div
                                        className="img-container rounded d-flex align-items-center justify-content-center"
                                        style={{ height: "200px" }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain"
                                            }}
                                        />
                                    </div>
                                    <div className="text text-center mt-3">
                                        <h2 className="mb-0">
                                            <a href="#">{product.name}</a>
                                        </h2>
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            <span className="cat">{product.category}</span>
                                            <p className="price ml-3">
                                                {formatCurrency(product.price, "VI")} <span>/chiếc</span>
                                            </p>
                                        </div>
                                        <p className="d-flex justify-content-center mb-0">
                                            <a href="#" className="btn btn-primary py-2 px-3 mr-2">
                                                Mua ngay
                                            </a>
                                            <a href="#" className="btn btn-secondary py-2 px-3">
                                                Xem chi tiết
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
);
