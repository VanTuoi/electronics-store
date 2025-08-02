import gsap from "gsap";
import { memo, useEffect, useRef } from "react";

export const Introduce = memo(() => {
  const text = "Bán & Hỗ trợ thiết kế tủ điện theo yêu cầu";
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const descRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      lettersRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 }
    );

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 2
        }
      );
    }
  }, []);

  const handleMouseEnter = (index: number) => {
    gsap.to(lettersRef.current[index], {
      color: "#01d28e",
      textShadow: `
      0 0 8px rgba(1, 210, 142, 0.8),
      0 0 12px rgba(1, 210, 142, 0.6)
    `,
      duration: 0.3
    });

    [index - 2, index - 1, index + 1, index + 2].forEach(i => {
      if (lettersRef.current[i]) {
        gsap.to(lettersRef.current[i], {
          color: "#01d28e",
          textShadow: "0 0 5px rgba(1, 210, 142, 0.4)",
          duration: 0.3
        });
      }
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lettersRef.current, {
      color: "#ffffff",
      textShadow: "none",
      duration: 0.3
    });
  };

  return (
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
              <h1
                className="mb-4 text-4xl md:text-7xl font-extrabold drop-shadow-lg cursor-default"
                style={{ color: "#ffffff", userSelect: "none" }}
              >
                {text.split("").map((char, i) => (
                  <span
                    key={i}
                    ref={el => {
                      lettersRef.current[i] = el;
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      display: "inline-block",
                      transition: "color 0.3s",
                      transformOrigin: "center center",
                      cursor: "pointer"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
              <h2 className="content fs-4 text-light" ref={descRef}>
                &quot;Chúng tôi cung cấp và thiết kế tủ điện theo yêu cầu, đảm bảo an toàn, tối ưu và phù hợp với mọi
                nhu cầu công nghiệp, dân dụng, và học tập.&quot;
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
