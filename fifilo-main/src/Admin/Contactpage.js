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
        contactlist: [{
            icon: { filename: "", path: "" },
            value: "",
        }]
    });

    const [seoSection, setSeoSection] = useState(pageData ? { ...pageData.seoSection } :
        {
            title: "",
            keywords: "",
            description: "",
            seoImg: { filename: "", path: "" }
        });
    // Add Contact
    const addContact = () => {
        setCardSection(prevState => ({
            ...prevState, contactlist: [...prevState.contactlist, { icon: { filename: "", path: "" }, value: "" }]
        }));
    };

    // Remove Contact
    const removeContact = (index) => {
        setCardSection(prevState => ({
            ...prevState, contactlist: prevState.contactlist.filter((_, i) => i !== index)
        }));
    };

    // Update Contact List (Icon or Value)
    const updateContact = (index, field, value) => {
        setCardSection(prevState => ({
            ...prevState,
            contactlist: prevState.contactlist.map((contact, i) =>
                i === index ? { ...contact, [field]: value } : contact
            )
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateContactPageAction({ contactPageData: { heroSection, seoSection, cardSection }, id: pageData._id }));
        alert("ContactPage Updated Successfully");
    };
    return (
        <>
            <Sidebar titles="Contact Page" />
            <div className="main__content" >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="/assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Contact Page</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>Contact Page</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-cards-tab" data-bs-toggle="pill" data-bs-target="#pills-cards" type="button" role="tab" aria-controls="pills-cards"
                                    aria-selected="false">Card</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo" type="button" role="tab" aria-controls="pills-seo"
                                    aria-selected="false">SEO</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel" aria-labelledby="pills-hero-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading">Main Heading</label>
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
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="herosubHeading">Sub Heading</label>
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
                                        <div className="update__block">
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-cards" role="tabpanel" aria-labelledby="pills-cards-tab">
                                <div className="edit__tools">
                                    <div className="card__block" >
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="cardHeading">Heading</label>
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
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        <div className="card__block">
                                                            {cardSection.contactlist.map((contact, index) => (
                                                                <div className="row">
                                                                    <SeoImg updateContact={updateContact} index={index} name="icon" data={contact.icon} />
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="value">value</label>
                                                                            <input type="text" id="value" className="form-control"
                                                                                value={contact.value}
                                                                                onChange={(e) => updateContact(index, "value", e.target.value)}
                                                                                placeholder="Enter Value" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
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