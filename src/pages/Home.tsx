import { About, Introduce, Schedule, Services, TopProducts } from "../components/pages";

const Home = () => (
    <>
        <Introduce />
        <Schedule />
        <TopProducts />
        <About />
        <Services />

        {/* <section
        className="ftco-section ftco-intro"
        style={{ backgroundIimage: `url(images/bg_3.jpg)` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 heading-section heading-section-white ">
              <h2 className="mb-3">
                Do You Want To Earn With Us? So Don't Be Late.
              </h2>
              <a href="#" className="btn btn-primary btn-lg">
                Become A Driver
              </a>
            </div>
          </div>
        </div>
      </section> */}

        {/* <section className="ftco-section testimony-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center heading-section ">
              <span className="subheading">Testimonial</span>
              <h2 className="mb-3">Happy Clients</h2>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12">
              <div className="carousel-testimony owl-carousel ftco-owl">
                <div className="item">
                  <div className="testimony-wrap rounded text-center py-4 pb-5">
                    <div
                      className="user-img mb-2"
                      style={{ backgroundImage: `url(images/person_1.jpg)` }}
                    ></div>
                    <div className="text pt-4">
                      <p className="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Roger Scott</p>
                      <span className="position">Marketing Manager</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap rounded text-center py-4 pb-5">
                    <div
                      className="user-img mb-2"
                      style={{ backgroundImage: `url(images/person_2.jpg)` }}
                    ></div>
                    <div className="text pt-4">
                      <p className="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Roger Scott</p>
                      <span className="position">Interface Designer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap rounded text-center py-4 pb-5">
                    <div
                      className="user-img mb-2"
                      style={{ backgroundImage: `url(images/person_3.jpg)` }}
                    ></div>
                    <div className="text pt-4">
                      <p className="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Roger Scott</p>
                      <span className="position">UI Designer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap rounded text-center py-4 pb-5">
                    <div
                      className="user-img mb-2"
                      style={{ backgroundImage: `url(images/person_1.jpg)` }}
                    ></div>
                    <div className="text pt-4">
                      <p className="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Roger Scott</p>
                      <span className="position">Web Developer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap rounded text-center py-4 pb-5">
                    <div
                      className="user-img mb-2"
                      style={{ backgroundImage: `url(images/person_1.jpg)` }}
                    ></div>
                    <div className="text pt-4">
                      <p className="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Roger Scott</p>
                      <span className="position">System Analyst</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 heading-section text-center ">
              <span className="subheading">Blog</span>
              <h2>Recent Blog</h2>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex ">
              <div className="blog-entry justify-content-end">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{ backgroundImage: `url('images/image_1.jpg')` }}
                ></a>
                <div className="text pt-4">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Oct. 29, 2019</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-2">
                    <a href="#">
                      Why Lead Generation is Key for Business Growth
                    </a>
                  </h3>
                  <p>
                    <a href="#" className="btn btn-primary">
                      Read more
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry justify-content-end">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{ backgroundImage: `url('images/image_2.jpg')` }}
                ></a>
                <div className="text pt-4">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Oct. 29, 2019</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-2">
                    <a href="#">
                      Why Lead Generation is Key for Business Growth
                    </a>
                  </h3>
                  <p>
                    <a href="#" className="btn btn-primary">
                      Read more
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ">
              <div className="blog-entry">
                <a
                  href="blog-single.html"
                  className="block-20"
                  style={{ backgroundImage: `url('images/image_3.jpg')` }}
                ></a>
                <div className="text pt-4">
                  <div className="meta mb-3">
                    <div>
                      <a href="#">Oct. 29, 2019</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" className="meta-chat">
                        <span className="icon-chat"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 className="heading mt-2">
                    <a href="#">
                      Why Lead Generation is Key for Business Growth
                    </a>
                  </h3>
                  <p>
                    <a href="#" className="btn btn-primary">
                      Read more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* <section
        className="ftco-counter ftco-section img bg-light"
        id="section-counter"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
              <div className="block-18">
                <div className="text text-border d-flex align-items-center">
                  <strong className="number" data-number="60">
                    0
                  </strong>
                  <span>
                    Year <br />
                    Experienced
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
              <div className="block-18">
                <div className="text text-border d-flex align-items-center">
                  <strong className="number" data-number="1090">
                    0
                  </strong>
                  <span>
                    Total <br />
                    Cars
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
              <div className="block-18">
                <div className="text text-border d-flex align-items-center">
                  <strong className="number" data-number="2590">
                    0
                  </strong>
                  <span>
                    Happy <br />
                    Customers
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
              <div className="block-18">
                <div className="text d-flex align-items-center">
                  <strong className="number" data-number="67">
                    0
                  </strong>
                  <span>
                    Total <br />
                    Branches
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
);

export default Home;
