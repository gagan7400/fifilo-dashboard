import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FreqentlyAsk from "./FreqentlyAsk";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import Loader from "../layout/Loader";
import useCursorPosition from "../layout/useCursorPosition";
import { getpublishHomePage } from "../redux/actions/homeAction";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from 'dompurify';

export default function Home() {
  useCursorPosition('dark__bnr');
  let dispatch = useDispatch();
  let { publishedhomepage, homeloading } = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getpublishHomePage());
  }, [dispatch])

  useEffect(() => {
    $(document).ready(function () {
      // Initial setup
      $('.service__inr').css({ height: '0', overflow: 'hidden' });
      $('.services__img').css({ width: '102px', transition: 'width 0.5s ease' });

      // Event handling for mouse enter
      $('.services__card').on('mouseenter', function () {
        $('.services__card').removeClass('active');
        $(this).addClass('active');

        $('.service__inr').not($(this).find('.service__inr')).stop().animate({ height: '0' }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'hidden' });
        });

        var serviceInr = $(this).find('.service__inr');
        var newHeight = serviceInr.get(0).scrollHeight;
        serviceInr.css({ 'will-change': 'height', overflow: 'hidden' });
        serviceInr.stop().animate({ height: newHeight }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'visible' });
        });

        $('.services__img').css({ width: '102px' });
        $(this).find('.services__img').css({ width: '100%' });

        // Refresh AOS
        AOS.refresh();
      });

      // Event handling for mouse leave
      $('.services__card').on('mouseleave', function () {
        $(this).removeClass('active');

        var serviceInr = $(this).find('.service__inr');
        serviceInr.stop().animate({ height: '0' }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'hidden' });
        });

        $(this).find('.services__img').css({ width: '102px' });
      });

      // Initialize AOS
      AOS.init();
    });

    $(document).ready(function () {
      var h2Tag = $(".about__section h2");
      var hasClass = false;

      $(window).scroll(function () {
        var aboutSection = $(".about__section h2");
        var offset = aboutSection.offset();

        if (offset) {
          var windowHeight = $(window).height();
          var scrollPos = $(window).scrollTop();

          if (scrollPos + windowHeight > offset.top) {
            if (!hasClass) {
              h2Tag.addClass("color-change");
              hasClass = true;
            }
          } else {
            if (hasClass) {
              h2Tag.removeClass("color-change");
              hasClass = false;
            }
          }
        }
      });
    });
  }, [publishedhomepage]);

  useEffect(() => {
    const handleScroll = () => {
      const $video = $("#testimonialsVideo");

      if ($video.length) {
        const rect = $video[0].getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          $video[0].play().catch((error) => {
            console.error("Error playing video:", error);
          });
        } else {
          $video[0].pause();
        }
      }
    };

    const handleUserInteraction = () => {
      $(document).on("scroll", handleScroll);
      $(document).off("click keydown", handleUserInteraction);
    };
    $(document).on("click keydown", handleUserInteraction);

    return () => {
      $(document).off("scroll", handleScroll);
      $(document).off("click keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    AOS.init();
  }, [publishedhomepage]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./assets/js/custom.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);
    };

    loadData();
    return () => {
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{(!loading && publishedhomepage) && publishedhomepage.seoSection.title.trim()}</title>
        {(!loading && publishedhomepage) ? publishedhomepage.seoSection.meta.map((v, i) => {
          return <meta key={i} name={v.name.trim()} content={v.content.trim()} />
        }) : ""}

      </Helmet>
      <div className="hero__bnr dark__bnr">
        {loading && <Loader />}
        <div className="container">
          <div className="bnr__content">
            <h1 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.heroSection.heading : `Designing Intuitive <br /><span>Digital Interfaces</span>`)
            }} />
            <h6 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.heroSection.subHeading : `Crafting immersive digital experiences that resonate with users, fueling engagement, and accelerating growth for your business`)
            }} />

            <NavLink to="/services/" className="button first">
              Services<span></span>
            </NavLink>
            <NavLink to="/contact-us/" className="button second">
              Lets Talk<span></span>
            </NavLink>
            <NavLink to="/case-studies/" className="button third">
              Case Studies<span></span>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="about__section rn__section__gapTop">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.aboutSection : `We’re a dedicated team of UI UX professionals, committed to delivering research-driven, user-centered solutions that transform businesses and inspire users. Our tailored design process, aligns with your goals and industry needs, ensuring a perfect balance of aesthetics and functionality.
                Let’s build something amazing together!`)
              }} />
            </div>
          </div>
        </div>
      </div>

      <div className="our__work rn__section__gapTop dark__bnr">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p>Our work</p>
            <h2>
              Featured <span>Case Studies</span>
            </h2>
          </div>
          <div className="inner__gapTop row">
            <div className="col-12" data-aos="fade-right" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>Development</span>
                  <span>UI/UX Design</span>
                </div>
                <h4>
                  <NavLink to="/tribe-stays/">
                    TribeStays{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Creating a new hub for vital research & resources</p>
                <div className="img__box">
                  <NavLink to="/tribe-stays/">
                    <img src="assets/img/case-studies-01.png" alt="case-studies" />
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-12" data-aos="fade-left" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>Branding</span>
                  <span>UI/UX Design</span>
                </div>
                <h4>
                  <NavLink to="/curehub/">
                    Cure Hub{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Make hitting the GYM a habit you will love the App.</p>
                <div className="img__box">
                  <NavLink to="/curehub/">
                    <img src="assets/img/case-studies-02.png" alt="case-studies" />
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-12" data-aos="fade-right" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>UI/UX Design</span>
                  <span>Website Development</span>
                </div>
                <h4>
                  <NavLink to="/spv-mortgages/">
                    SPV Mortgages{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Maximizing Tax Efficiency with SPV Limited Company Mortgages</p>
                <div className="img__box">
                  <NavLink to="/spv-mortgages/">
                    <img src="assets/img/case-studies-03.png" alt="case-studies" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="inner__gapTop" data-aos="fade-up" data-aos-duration="800">
            <NavLink to="/case-studies/" className="btn btn__primary m-auto">
              VIEW ALL <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="our__services rn__section__gapTop">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.servicesSection.preHeading : `Our Services`)
            }} />
            <h2 dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.servicesSection.heading : `<span>Services</span> we’re Offering`)
            }} />
          </div>
          <div className="inner__gapTop row justify-content-center">
            <div className="col-lg-10">
              {(!homeloading && publishedhomepage) ? publishedhomepage.servicesCardSection.map((service, i) => {
                return <div> <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration={(8 + i) * 100}>
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2>{service.heading}</h2>
                        <div className="service__inr">
                          <h6> {service.description}</h6>
                          <NavLink to={`/services#${service.heading.split(" ").join("-")}`} className="btn btn__primary">
                            Learn more <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src={`http://localhost:5000/images/${service.serviceImgs && service.serviceImgs.filename}`} alt={service.heading} />
                      </div>
                    </div>
                  </div>
                </div>
                  {(i !== publishedhomepage.servicesCardSection.length - 1) && <div className="brdr" data-aos="fade-up" data-aos-duration={(9 + i) * 100}></div>}
                </div>

              }) : <>
                <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration="800">
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2>Branding</h2>
                        <div className="service__inr">
                          <h6>Power up your business with our branding services that command attention. We design standout brand identities that capture the essence of who you are. </h6>
                          <NavLink to="/services#branding" className="btn btn__primary">
                            Learn more <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src="assets/img/service-icon-01.svg" alt="home" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="brdr" data-aos="fade-up" data-aos-duration="900"></div>
                <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration="900">
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2>UI UX Design</h2>
                        <div className="service__inr">
                          <h6>Ignite your digital experience with our UI/UX design services that grab attention and drive engagement.  We create user-centric designs that not only look impressive but also deliver smooth, intuitive interactions.</h6>
                          <NavLink to="/services#uiux-design" className="btn btn__primary">
                            Learn more <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src="assets/img/service-icon-02.svg" alt="home" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="brdr" data-aos="fade-up" data-aos-duration="1000"></div>
                <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration="1000">
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2>Web Development</h2>
                        <div className="service__inr">
                          <h6>Turn your vision into reality with our web development services that excels in both form and function. We blend creativity with cutting-edge technology to build websites and apps that are visually stunning and exceptionally functional.</h6>
                          <NavLink to="/services#development" className="btn btn__primary">
                            Learn more <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src="assets/img/service-icon-03.svg" alt="home" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="brdr" data-aos="fade-up" data-aos-duration="1100"></div>
                <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration="1100">
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2>Digital Marketing</h2>
                        <div className="service__inr">
                          <h6>Supercharge your brand with our digital marketing services that drive real results. Our mission is to enhance your visibility, build meaningful connections, and turn clicks into customers.</h6>
                          <NavLink to="/services#digital-marketing" className="btn btn__primary">
                            Learn more <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src="assets/img/service-icon-04.svg" alt="home" />
                      </div>
                    </div>
                  </div>
                </div>
              </>}
            </div>
          </div>
        </div>
      </div>

      <div className="our__testimonials rn__section__gapTop">
        <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.testimonialSection.preHeading : `Testimonials`)
          }} />
          <h2 dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.testimonialSection.heading : `Reviews from our <br />
                            Satisfied <span>Customers</span>`)
          }} />
        </div>

        <div className="inner__gapTop" data-aos="fade-up" data-aos-duration="800">
          <div className="slider__card">
            {/* <div className="testimonials__slide owl-carousel"> */}
            {!homeloading && publishedhomepage && publishedhomepage.reviewsSection.length > 0 && (
              <div className="testimonials__slide owl-carousel">
                {publishedhomepage.reviewsSection.map((item, index) => (
                  <div className="item__slide" key={index}>
                    <div className="img__bx">
                      <img src={`http://localhost:4000/images/${item.clientImgs && item.clientImgs.filename}`} alt="clients" />
                    </div>
                    <div className="content__box">
                      <h6>{item.clientName ? item.clientName : "Bob Cooper"}</h6>
                      <h6>{item.description ? item.description :
                        `I had an opportunity to work with Fifilo Design Studio Team. One of the best UI UX designers team I have ever worked with. They know UX process in depth and have problem solving
                          skills. With the help of Fifilo Team my business growth is now exponential and they did a fantastic job for me. I will highly recommend them for any project.`}
                      </h6>
                      <p>{item.company ? item.company : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="our__clients rn__section__gapTop">
        <div className="container">
          <div className="main__heading">
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.clientSection.heading : `Trust they show`)
            }} />
            <h2 dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.clientSection.subHeading : `Our <span>Clients</span>`)
            }} />
          </div>
          <div className="row inner__gapTop gx-0">
            {!homeloading && publishedhomepage && publishedhomepage.clientSection.clientLogos.length > 0 && (
              <>
                {!homeloading && publishedhomepage.clientSection.clientLogos.map((card, index) => {
                  return <div className="col-lg-2 col-md-2 col-6">
                    <div className="card__logo">
                      <img src={card ? `http://localhost:4000/images/${card && card.filename}` : "assets/img/clients-logo-01.png"} data-aos="zoom-in" data-aos-duration="1200" alt="clients-logo" />
                    </div>
                  </div>
                })
                }
              </>
            )}
          </div>
        </div>
      </div>

      <FreqentlyAsk />
    </>
  );
}
