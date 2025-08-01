import { memo } from "react";

export const Introduce = memo(() => (
  <div
    className="hero-wrap hero-wrap-3 ftco-degree-bg"
    style={{ backgroundImage: "url('imgs/bg/bg.webp')" }}
    data-stellar-background-ratio="0.5"
  >
    <div className="overlay"></div>
    <div className="container">
      <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center m-0">
        <div className="col-lg-8">
          <div className="w-100 text-center mb-md-5 pb-md-5">
            <h1 className="mb-4">Bán &amp; Hỗ trợ thiết kế tủ điện theo yêu cầu</h1>
            <h2 className="content fs-4 text-light">
              &quot;Chúng tôi cung cấp và thiết kế tủ điện theo yêu cầu, đảm bảo an toàn, tối ưu và phù hợp với mọi nhu
              cầu công nghiệp, dân dụng, và học tập.&quot;
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
));
