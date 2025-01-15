import React, { useEffect } from 'react'
import $ from 'jquery';
import AOS from "aos";
import { NavLink } from 'react-router-dom';
export default function Blog() {
    useEffect(() => {
        $(function () {
            $(".blogs__list .col-12").slice(0, 3).show();
            $("body").on("click touchstart", ".load-more", function (e) {
                e.preventDefault();
                $(".col-12:hidden").slice(0, 3).slideDown();
                if ($(".col-12:hidden").length == 0) {
                    $(".load-more").css("display", "none");
                }
            });
        });
    }, []);
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <div className="blogs__bnr">
                <div className="container" data-aos="fade-up" data-aos-duration="800">
                    <h2>Insights & Ideas<br /><span>Your Gateway to Digital Excellence</span></h2>
                </div>
            </div>

            <div className="blogs__list rn__section__gapTop">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-10 col-md-12">
                            <div className="card__blog comn__blog" data-aos="fade-up" data-aos-duration="800">
                                <div className="thumb__img">
                                    <NavLink to="/blogs/first-blog">
                                        <img src="assets/img/case-studies-01.png" alt="" />
                                    </NavLink>
                                </div>
                                <div className="cntnt__bx">
                                    <span className="category">Website Development</span>
                                    <NavLink to="/blogs/first-blog">
                                        <div className="title">
                                            <h5>Lorem ipsum dolor sit amet consectetur.</h5>
                                            <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                        </div>
                                    </NavLink>
                                    <h6>Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices.</h6>

                                    <div className="card__ftr">
                                        <span>By Fifilo Designs</span>
                                        <span>•</span>
                                        <span>November 11, 2024</span>
                                        <span>•</span>
                                        <span>5 min Read</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-10 col-md-12">
                            <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
                                <h2>Must Read Articles</h2>
                            </div>

                            <div className="row inner__gapTop">
                                <div className="col-12">
                                    <div className="arti__card comn__blog" data-aos="fade-up" data-aos-duration="800">
                                        <div className="img__box">
                                            <a href="">
                                                <img src="assets/img/case-studies-01.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="cntnt__bx">
                                            <span className="category">Website Development</span>
                                            <a href="">
                                                <div className="title">
                                                    <h5>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h5>
                                                    <img src="assets/img/arrow-up-right.svg" alt="" />
                                                </div>
                                            </a>
                                            <h6>Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in
                                                suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in turpis leo.
                                            </h6>

                                            <div className="card__ftr">
                                                <span>By Fifilo Designs</span>
                                                <span>•</span>
                                                <span>November 11, 2024</span>
                                                <span>•</span>
                                                <span>5 min Read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="arti__card comn__blog" data-aos="fade-up" data-aos-duration="800">
                                        <div className="img__box">
                                            <a href="">
                                                <img src="assets/img/case-studies-01.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="cntnt__bx">
                                            <span className="category">Website Development</span>
                                            <a href="">
                                                <div className="title">
                                                    <h5>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h5>
                                                    <img src="assets/img/arrow-up-right.svg" alt="" />
                                                </div>
                                            </a>
                                            <h6>Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in
                                                suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in turpis leo.
                                            </h6>

                                            <div className="card__ftr">
                                                <span>By Fifilo Designs</span>
                                                <span>•</span>
                                                <span>November 11, 2024</span>
                                                <span>•</span>
                                                <span>5 min Read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="arti__card comn__blog" data-aos="fade-up" data-aos-duration="800">
                                        <div className="img__box">
                                            <a href="">
                                                <img src="assets/img/case-studies-01.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="cntnt__bx">
                                            <span className="category">Website Development</span>
                                            <a href="">
                                                <div className="title">
                                                    <h5>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h5>
                                                    <img src="assets/img/arrow-up-right.svg" alt="" />
                                                </div>
                                            </a>
                                            <h6>Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in
                                                suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in turpis leo.
                                            </h6>

                                            <div className="card__ftr">
                                                <span>By Fifilo Designs</span>
                                                <span>•</span>
                                                <span>November 11, 2024</span>
                                                <span>•</span>
                                                <span>5 min Read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12" style={{ display: "none" }} data-aos="fade-up" data-aos-duration="800">
                                    <div className="arti__card comn__blog">
                                        <div className="img__box">
                                            <a href="">
                                                <img src="assets/img/case-studies-01.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="cntnt__bx">
                                            <span className="category">Website Development</span>
                                            <a href="">
                                                <div className="title">
                                                    <h5>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h5>
                                                    <img src="assets/img/arrow-up-right.svg" alt="" />
                                                </div>
                                            </a>
                                            <h6>Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in
                                                suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in turpis leo.
                                            </h6>

                                            <div className="card__ftr">
                                                <span>By Fifilo Designs</span>
                                                <span>•</span>
                                                <span>November 11, 2024</span>
                                                <span>•</span>
                                                <span>5 min Read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-10 col-md-12" data-aos="fade-up" data-aos-duration="800">
                            <button className="btn btn__primary m-auto load-more">View more blogs <img src="assets/img/arrow-up-right.svg"
                                alt="img" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
