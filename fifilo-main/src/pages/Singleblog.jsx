import React, { useEffect } from 'react'
import AOS from "aos";
export default function Singleblog() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <div className="blogs__bnr blog__single">
                <div className="container">
                    <div className="bnr__inr">
                        <div className="category" data-aos="fade-up" data-aos-duration="800">
                            <span>Website Development</span>
                        </div>
                        <h2 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur.</h2>
                        <div className="card__ftr" data-aos="fade-up" data-aos-duration="800">
                            <span>By Fifilo Designs</span>
                            <span>•</span>
                            <span>November 11, 2024</span>
                            <span>•</span>
                            <span>5 min Read</span>
                        </div>
                        <div className="single__thumbnails" data-aos="fade-up" data-aos-duration="800">
                            <img src="assets/img/spv-mortgages-bnr.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="single__content rn__section__gapTop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="left__block">
                                <h3 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in suspendisse
                                </h3>

                                <div className="img__block" data-aos="fade-up" data-aos-duration="800">
                                    <img src="assets/img/case-studies-01.png" alt="" />
                                </div>

                                <h6 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur. Nisl morbi habitasse sed vitae est condimentum habitant ornare
                                    lacus. Commodo convallis imperdiet purus nisl quis molestie. Aliquam dui vel quis adipiscing eu lectus.
                                    Aliquam sit sit pretium egestas convallis mauris feugiat erat. Eu id augue tempor lectus laoreet penatibus
                                    accumsan pellentesque in. Vulputate eget amet lacus varius in nullam enim id arcu. Magna eget id nunc
                                    pellentesque dolor eu. Egestas ultrices eu dictumst eu pulvinar malesuada sit malesuada a.</h6>

                                <h3 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in suspendisse
                                </h3>

                                <h6 data-aos="fade-up" data-aos-duration="800">Tortor ullamcorper velit massa tellus tempor suscipit. Amet aliquet urna lacinia vitae aliquet tempus
                                    malesuada. Ante in non facilisis id arcu pellentesque euismod sed. Id eget vitae sed faucibus aliquam
                                    commodo dignissim interdum. Facilisi posuere diam sem eget posuere fringilla vulputate sit. Pellentesque
                                    adipiscing eget sit libero. Fermentum ac fermentum sed sed donec lobortis risus consectetur pretium. Ipsum
                                    egestas leo faucibus libero sit. Ullamcorper et malesuada pulvinar nam condimentum egestas commodo.
                                    Dignissim volutpat varius ac sed tortor mi mattis libero eros. Nisi venenatis aliquam mauris ultricies sit
                                    id lorem leo a. Vivamus commodo malesuada nisl lobortis vitae quam et ut nulla. Hac nunc arcu nisi
                                    adipiscing amet sed cras magna. Pellentesque fermentum velit sit fermentum tellus.</h6>

                                <ul data-aos="fade-up" data-aos-duration="800">
                                    <li>A magna vulputate mauris pellentesque vel dictumst senectus tempor. Natoque pellentesque neque
                                        scelerisque pharetra.</li>
                                    <li>Eget felis duis imperdiet in nisi tincidunt imperdiet. Sit ut nisl sapien nisi cras aenean erat sed
                                        sapien. Sit quam nisl elementum eget morbi ut odio a vitae.</li>
                                    <li>Semper praesent tincidunt feugiat ultricies mi tristique sed pretium. Sed vulputate magna morbi elit.
                                        Nibh cursus venenatis massa sed. Sit sit eu nec facilisis pharetra ac in risus.</li>
                                    <li>Nec libero facilisi curabitur quam tincidunt dictumst phasellus sed cursus. Cras mattis eget elit sed
                                        viverra.</li>
                                    <li>Arcu nibh ultricies et sed nunc. Justo amet ut non blandit orci egestas commodo ipsum. Proin at cras
                                        odio a eget. Commodo id diam nulla habitant lobortis quam amet in.</li>
                                    <li>Nisl scelerisque habitasse leo libero tellus. Elit aenean pellentesque facilisis leo posuere. Enim
                                        elit egestas lectus amet. Quis leo odio pellentesque duis et pretium.</li>
                                    <li>Gravida pharetra sagittis mi purus adipiscing fames. Molestie blandit hac gravida tempor mollis dui
                                        quam dignissim</li>
                                </ul>

                                <h3 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis in mattis in suspendisse
                                </h3>

                                <h6 data-aos="fade-up" data-aos-duration="800">Lorem ipsum dolor sit amet consectetur. Venenatis congue curabitur mi enim eu nisi pellentesque at.
                                    Molestie nulla tempus id fermentum a pellentesque. Suscipit in cursus turpis scelerisque. Placerat
                                    sagittis magna egestas nec praesent. Dolor ac sollicitudin quis massa quis nec molestie tristique. At
                                    fermentum ultricies amet odio quam egestas. At varius egestas rhoncus egestas vel elit. Dignissim
                                    vulputate duis arcu justo at aliquet sed. Sed sed in sit auctor. Dignissim convallis volutpat nibh tempus
                                    dictum eget. Facilisi sit donec libero morbi augue viverra odio. Sit tincidunt eu quis congue amet
                                    facilisi enim at. Ultrices aliquet amet pellentesque massa hendrerit ante tincidunt dignissim venenatis.
                                    Iaculis porttitor luctus venenatis odio.</h6>

                                <h6 data-aos="fade-up" data-aos-duration="800">Egestas aenean elit quam et dui. Tempus mi mi nibh integer nulla tincidunt egestas et. Non nisl
                                    convallis orci enim urna etiam eu libero. Venenatis dolor vitae euismod consectetur. Maecenas in amet
                                    pulvinar sed. Amet mollis tellus nibh quam odio maecenas molestie lectus integer. Pulvinar vitae lectus
                                    convallis morbi habitant. Sed viverra in placerat hendrerit quis varius semper rhoncus phasellus. Cras
                                    ut bibendum at lacus diam. Erat consectetur aliquet leo pretium.</h6>

                                <div className="img__block" data-aos="fade-up" data-aos-duration="800">
                                    <img src="assets/img/case-studies-01.png" alt="" />
                                </div>

                                <div className="social__share" data-aos="fade-up" data-aos-duration="800">
                                    <h6>Social Share</h6>

                                    <div className="social__icons">
                                        <a href="" className="btn"><img src="assets/img/facebook-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/twitter-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/imgs/instagram-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/linkedIn-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/youtube-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/whatsapp-s.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/share.svg" alt="" /></a>
                                        <a href="" className="btn"><img src="assets/img/copy.svg" alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="right__block">
                                <div className="table__card" data-aos="fade-up" data-aos-duration="800">
                                    <h5>Table of Contents</h5>
                                    <ul>
                                        <li className="active"><a href="">1. Lorem ipsum dolor sit amet</a></li>
                                        <li><a href="">2. Consectetur. Turpis ut tempor at placerat.</a></li>
                                        <li><a href="">3. Magnis in mattis in suspendisse viverra</a></li>
                                        <li><a href="">4. Sed nisl pharetra morbi.</a></li>
                                        <li><a href="">5. Et amet rhoncus at tincidunt</a></li>
                                        <li><a href="">6. A dolor in turpis leo.</a></li>
                                    </ul>
                                </div>

                                <div className="releted__blog" data-aos="fade-up" data-aos-duration="800">
                                    <h5>Related Blogs</h5>

                                    <div className="blogs__cards">
                                        <div className="card__blog">
                                            <a href="">
                                                <div className="title">
                                                    <h6>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h6>
                                                    <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                </div>
                                            </a>
                                            <span className="description">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis
                                                in mattis in suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in
                                                turpis leo.</span>
                                        </div>

                                        <div className="card__blog">
                                            <a href="">
                                                <div className="title">
                                                    <h6>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h6>
                                                    <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                </div>
                                            </a>
                                            <span className="description">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis
                                                in mattis in suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in
                                                turpis leo.</span>
                                        </div>

                                        <div className="card__blog">
                                            <a href="">
                                                <div className="title">
                                                    <h6>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h6>
                                                    <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                </div>
                                            </a>
                                            <span className="description">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis
                                                in mattis in suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in
                                                turpis leo.</span>
                                        </div>

                                        <div className="card__blog">
                                            <a href="">
                                                <div className="title">
                                                    <h6>Lorem ipsum dolor sit amet consectetur. Mus purus morbi ullamcorper nulla ac massa.</h6>
                                                    <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                </div>
                                            </a>
                                            <span className="description">Lorem ipsum dolor sit amet consectetur. Turpis ut tempor at placerat. Magnis
                                                in mattis in suspendisse viverra sed nisl pharetra morbi. Et amet rhoncus at tincidunt a dolor in
                                                turpis leo.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
