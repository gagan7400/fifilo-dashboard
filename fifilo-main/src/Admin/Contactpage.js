import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { updateContactPageAction } from '../redux/actions/contactAction';
import { NavLink } from 'react-router-dom';
import SeoImg from './SeoImg'
const Contactpage = () => {
    let dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.page);
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : "",
    });

    const [cardSection, setCardSection] = useState({
        heading: pageData ? pageData.cardSection.heading : "",
        email: pageData ? pageData.cardSection.email : "",
        phoneNumber: pageData ? pageData.cardSection.phoneNumber : ""
    }
    );

    const [seoSection, setSeoSection] = useState(pageData ?{ ...pageData.seoSection} :
        {
            title: "",
            keywords: "",
            description: "",
            seoImg: { filename: "", path: "" }
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateContactPageAction({ contactPageData: { heroSection, seoSection, cardSection }, id: pageData._id }));
        alert("ContactPage Updated Successfully");
    };
    return (
        <>
            <Sidebar titles="Contact Page" />
            <div className="main__content" >
                <div class="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li class="breadcrumb-item"><img src="/assets/imgs/chevron-right.svg" alt="" /></li>
                            <li class="breadcrumb-item active">Contact Page</li>
                        </ol>
                    </nav>
                    <div class="page__title">
                        <h5>Contact Page</h5>
                    </div>

                    <div class="page__editContent">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-cards-tab" data-bs-toggle="pill" data-bs-target="#pills-cards" type="button" role="tab" aria-controls="pills-cards"
                                    aria-selected="false">Card</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo" type="button" role="tab" aria-controls="pills-seo"
                                    aria-selected="false">SEO</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-hero" role="tabpanel" aria-labelledby="pills-hero-tab">
                                <div class="edit__tools">
                                    <div class="card__block">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="input__inr">
                                                    <label for="heroheading">Main Heading</label>
                                                    <input required type="text"
                                                        id="heroheading"
                                                        name="heroSection.heading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                        placeholder="Enter Main Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="input__inr">
                                                    <label for="herosubHeading">Sub Heading</label>
                                                    <input required type="text"
                                                        id="herosubHeading"
                                                        rows="4"
                                                        name="heroSection.subHeading"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Heading"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="update__block">
                                            <button class="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-cards" role="tabpanel" aria-labelledby="pills-cards-tab">
                                <div class="edit__tools">
                                    <div class="card__block" >
                                        <div class="testimonial__box">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="input__inr">
                                                        <label for="cardHeading">Heading</label>
                                                        <input required type="text"
                                                            id="cardheading"
                                                            name="cardSection.heading"
                                                            className="form-control"
                                                            value={cardSection.heading}
                                                            onChange={(e) => setCardSection({ ...cardSection, heading: e.target.value })}
                                                            placeholder="Enter Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input__inr">
                                                        <label for="cardemail">Email</label>
                                                        <input required type="text"
                                                            id="cardemail"
                                                            name="cardSection.email"
                                                            className="form-control"
                                                            value={cardSection.email}
                                                            onChange={(e) => setCardSection({ ...cardSection, email: e.target.value })}
                                                            placeholder="Enter Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input__inr">
                                                        <label for="cardphoneNumber">Phone Number</label>
                                                        <input required type="text"
                                                            id="cardphoneNumber"
                                                            name="cardSection.phoneNumber"
                                                            className="form-control"
                                                            value={cardSection.phoneNumber}
                                                            onChange={(e) => setCardSection({ ...cardSection, phoneNumber: e.target.value })}
                                                            placeholder="Enter phoneNumber"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="update__block">
                                        <button class="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-seo" role="tabpanel" aria-labelledby="pills-seo-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="seotitle">Page Title</label>
                                                    <input required
                                                        type="text"
                                                        name="seotitle"
                                                        id="seotitle"
                                                        value={seoSection.title}
                                                        onChange={(e) => setSeoSection({ ...seoSection, title: e.target.value })}
                                                        placeholder="Enter Page Title"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    <div className="card__block">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="keywords">Keywords</label>
                                                                    <input type="text" id="keywords" className="form-control"
                                                                        value={seoSection.keywords}
                                                                        onChange={(e) => setSeoSection({ ...seoSection, keywords: e.target.value })}
                                                                        placeholder="Enter Keywords" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="Description">Meta Description</label>
                                                                    <textarea rows="4" className="form-control"
                                                                        value={seoSection.description}
                                                                        id="Description"
                                                                        onChange={(e) => setSeoSection({ ...seoSection, description: e.target.value })}
                                                                        placeholder="Enter Meta Description"></textarea>
                                                                </div>
                                                            </div>
                                                            <SeoImg seoSection={seoSection} setSeoSection={setSeoSection} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contactpage;