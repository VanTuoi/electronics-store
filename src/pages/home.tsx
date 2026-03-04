import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import { About, Introduce, Schedule, Services, TopProducts } from "~/components/pages";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Trang chủ | Electronics Store</title>
        <meta
          name="description"
          content="Khám phá các sản phẩm điện tử hàng đầu, lịch làm việc, dịch vụ và thông tin về Electronics Store."
        />
      </Helmet>

      <Introduce />
      <Schedule />
      <TopProducts />
      <About />
      <Services />
    </>
  );
};

export default Home;
