import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { updateCareerPageAction } from '../redux/actions/careeraction';
import CareerCardSection from './CareerCardSection';
import { NavLink } from 'react-router-dom';
import SeoImg from './SeoImg';
const Careerpage = () => {
    const { pageData } = useSelector((state) => state.page);
    let dispatch = useDispatch();
    //  career page states 
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : "",
        heroButtons: pageData ? { ...pageData.heroSection.heroButtons } : { CTA1: { url: "", name: "" } }

    });
    const [jobSection, setJobSection] = useState({
        heading: pageData ? pageData.jobSection.heading : "",
        subHeading: pageData ? pageData.jobSection.subHeading : ""
    });
    const [cardsSection, setCardsSection] = useState(
        pageData ? pageData.cardsSection.map(card => ({ ...card, cardImg: { ...card.cardImg } }))
            : [{ cardHeading: '', cardDescription: '', cardImg: { filename: "", path: "" } }]
    );
    //seo handlers

    const [seoSection, setSeoSection] = useState(pageData ? { ...pageData.seoSection } :
        {
            title: "",
            keywords: "",
            description: "",
            seoImg: { filename: "", path: "" }
        });
        const handleCardChange = (index, event, data) => {
        const values = cardsSection.map((card) => ({ ...card, }));
        // const values = [...cardsSection];
        if (event === 'cardImg') {
            values[index]['cardImg'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setCardsSection(values);
    };

    const handleAddCard = () => {
        setCardsSection([
            ...cardsSection,
            { cardHeading: '', cardDescription: '', cardImg: { filename: "", path: "" } }
        ]);
    };
    const handleRemoveCard = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const values = [...cardsSection];
            values.splice(index, 1); // Remove the card at the given index
            setCardsSection(values);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateCareerPageAction({ careerdata: { heroSection, jobSection, seoSection, cardsSection }, id: pageData._id }));
        alert("careerPage updated successfully");
    };


    return (
        <>
            <Sidebar titles="Career Page" />
            <div className="main__content" >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="/assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Career Page</li>
                        </ol>
                    </nav>

                    <div className="page__title">
                        <h5>Career Page</h5>
                    </div>

                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-cards-tab" data-bs-toggle="pill" data-bs-target="#pills-cards" type="button" role="tab" aria-controls="pills-cards"
                                    aria-selected="false">What Sets Us Apart</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-job-tab" data-bs-toggle="pill" data-bs-target="#pills-job" type="button" role="tab" aria-controls="pills-job"
                                    aria-selected="false">Job</button>
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
                                                    <label htmlFor="herosubHeading">Sub Text</label>
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
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA1name">CTA Button 01</label>
                                                    <input required type="text"
                                                        id="CTA1name"
                                                        name="CTA1name"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA1.name}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA1: { ...heroSection.heroButtons.CTA1, name: e.target.value } } })}
                                                        placeholder="Enter Button Text" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA1url">CTA Button Url</label>
                                                    <input required type="text"
                                                        id="CTA1url"
                                                        name="CTA1url"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA1.url}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA1: { ...heroSection.heroButtons.CTA1, url: e.target.value } } })}
                                                        placeholder="Enter Button Url"
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
                                    {cardsSection.map((card, index) => (
                                        <div className="card__block" key={index}>
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Card {index + 1}</p>
                                                    <button className="btn" onClick={() => handleRemoveCard(index)}><img src="/assets/imgs/trash.svg" alt="" />Delete</button>
                                                </div>
                                                <div className="row">
                                                    <CareerCardSection handleCardChange={handleCardChange} card={card} index={index} />
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor="cardHeading">Heading</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="cardHeading"
                                                                value={card.cardHeading}
                                                                onChange={(event) => handleCardChange(index, event)}
                                                                placeholder="Enter Heading"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor="cardDescription">Description</label>
                                                            <textarea rows={4}
                                                                name="cardDescription"
                                                                value={card.cardDescription}
                                                                onChange={(event) => handleCardChange(index, event)}
                                                                placeholder="Enter Description"
                                                                className="form-control"
                                                                required
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={handleAddCard}><img src="/assets/imgs/plus.svg" alt="" />Add New Section</button>
                                    </div>
                                    <div className="update__block">
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-job" role="tabpanel" aria-labelledby="pills-job-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="Jobheading">Main Heading</label>
                                                    <input required type="text"
                                                        id="Jobheading"
                                                        name="jobSection.heading"
                                                        className="form-control"
                                                        value={jobSection.heading}
                                                        onChange={(e) => setJobSection({ ...jobSection, heading: e.target.value })}
                                                        placeholder="Enter Main Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="jobSectionsubHeading">Sub Heading</label>
                                                    <textarea required
                                                        rows={4}
                                                        id="jobSectionsubHeading"
                                                        name="jobSection.subHeading"
                                                        className="form-control"
                                                        value={jobSection.subHeading}
                                                        onChange={(e) => setJobSection({ ...jobSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Heading"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
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

export default Careerpage;