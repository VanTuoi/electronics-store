import { memo, useEffect } from "react";
import { Link } from "react-router-dom";

interface IntroduceProps {
  breadcrumbs: [string, string][];
  title: string;
}

export const Breadcrumbs = memo(({ breadcrumbs, title }: IntroduceProps) => {
  useEffect(() => {
    const scrollPosition = window.innerWidth <= 768 ? 0 : 385;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  }, []);

  return (
    <section
      className="hero-wrap hero-wrap-2"
      style={{ backgroundImage: "url('/imgs/bg/bg.webp')" }}
      data-stellar-background-ratio="0.7"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text breadcrumb-container d-flex flex-column-reverse align-items-end justify-content-start">
          <div className="col-md-10 pb-5">
            <p className="breadcrumbs">
              <span className="mr-2">
                <Link to="/">
                  Trang chủ <i className="bi bi-chevron-right"></i>
                </Link>
              </span>
              {breadcrumbs.map(([text, url], index) => (
                <span key={index} className="mr-2">
                  <Link to={url}>
                    {text} <i className="bi bi-chevron-right"></i>
                  </Link>
                </span>
              ))}
            </p>
            <h1 className="mb-3 bread breadcrumbs-content">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
});
