import { gsap } from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { ScheduleForm } from "./schedule-form";

export const Schedule = memo(() => {
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" }
    });

    tl.fromTo(formRef.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1 }).fromTo(
      contentRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1 },
      "<"
    );
  }, []);

  return (
    <section className="ftco-section ftco-no-pt bg-light">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-12 featured-top">
            <div className="row no-gutters">
              <div className="col-md-4 d-flex align-items-center" ref={formRef}>
                <ScheduleForm />
              </div>
              <div className="col-md-8 d-flex align-items-center" ref={contentRef}>
                <div className="services-wrap rounded-3 w-100">
                  <h3 className="heading-section mb-4">Làm cho đồ án của bạn trở nên dễ dàng hơn</h3>
                  <div className="row d-flex mb-4">
                    <div className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <i className="bi bi-person-vcard-fill fs-1 text-primary" />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Nhập thông tin liên hệ và mô tả yêu cầu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <i className="bi bi-send-fill fs-1 text-primary" />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Gửi thông tin liên hệ</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <i className="bi bi-telephone-fill fs-1 text-primary" />
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
});
