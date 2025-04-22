import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LoadingBox } from "~/components/common";
import { useGetRandomProducts } from "~/hooks/products/use-products";
import { ProductCard } from "../products/product-card";

export const TopProducts = () => {
    const { data: products, loading: isLoading } = useGetRandomProducts();

    if (!products || products.length === 0) return null;

    return isLoading ? (
        <LoadingBox height={"500px"} />
    ) : (
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
                                    <div className="mb-5">
                                        <ProductCard product={product} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};
