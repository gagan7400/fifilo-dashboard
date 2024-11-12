import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateHomePageAction } from '../redux/actions/homeAction';
import ReviewCard from './ReviewCard';
import HomepageServiceCard from './HomepageServicecard';
import HomepageClients from './HomepageClients';


const Homepage = () => {
    let dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.page);

    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : ""
    });
    const [aboutSection, setAboutSection] = useState(pageData ? pageData.aboutSection : "");
    const [servicesSection, setServicesSection] = useState({
        preHeading: pageData ? pageData.servicesSection.preHeading : "",
        heading: pageData ? pageData.servicesSection.heading : "",
    });
    const [servicesCardSection, setServicesCardSection] = useState(
        pageData ? pageData.servicesCardSection.map(card => ({ ...card, servicePointList: [...card.servicePointList] }))
            : [{ heading: '', servicePointList: [], description: '', serviceImgs: { filename: "", path: "" } }]
    );
    const [testimonialSection, setTestimonialSection] = useState({
        heading: pageData ? pageData.testimonialSection.heading : "",
        preHeading: pageData ? pageData.testimonialSection.preHeading : "",
    });

    const [reviewsSection, setReviewsSection] = useState(
        pageData ? pageData.reviewsSection.map(review => ({ ...review }))
            : [{ company: '', clientName: '', description: '', clientImgs: { filename: "", path: "" } }]
    );
    const [clientSection, setClientSection] = useState({
        heading: pageData ? pageData.clientSection.heading : "",
        subHeading: pageData ? pageData.clientSection.subHeading : "",
    });
    // console.log(...pageData.clientSection.clientLogos)
    const [clientLogos, setClientLogos] = useState(pageData ?
        [...pageData.clientSection.clientLogos] : [{ filename: '', path: '' }]
    );

    const handleServicesCardChange = (index, event, data) => {
        const values = servicesCardSection.map((card) => ({ ...card, servicePointList: [...card.servicePointList] }));
        if (event === 'serviceImgs') {
            values[index]['serviceImgs'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setServicesCardSection(values);
    };

    const handleAddServicesCard = () => {
        setServicesCardSection([
            ...servicesCardSection,
            { heading: '', servicePointList: [], description: '', serviceImgs: { filename: "", path: "" } }]);
    };
    const handleRemoveServicesCard = (index) => {
        const values = servicesCardSection.slice();
        values.splice(index, 1); // Remove the card at the given index
        setServicesCardSection(values);

    };
    // Handle input for CardList
    const handleCardListChange = (index, listIndex, e) => {
        const { value } = e.target;
        const values = servicesCardSection.map((card) => ({
            ...card,
            servicePointList: [...card.servicePointList], // Copy each servicePointList as well
        }));
        values[index].servicePointList[listIndex] = value;
        setServicesCardSection(values);
    };
    // Add new CardList entry
    const addCardList = (index) => {
        const values = servicesCardSection.map((card, i) =>
            i === index
                ? { ...card, servicePointList: [...card.servicePointList, ""] }
                : card
        );
        setServicesCardSection(values);
    };

    const handleRemoveServicesCardList = (index, listIndex) => {
        const values = servicesCardSection.map((card) => ({
            ...card,
            servicePointList: [...card.servicePointList], // Copy each servicePointList array
        }));

        values[index].servicePointList.splice(listIndex, 1); // Remove the card at the given index
        setServicesCardSection(values);
    };

    const handleReviewCardChange = (index, event, data) => {
        const values = reviewsSection.map((card) => ({ ...card }));
        if (event === 'clientImgs') {
            values[index]['clientImgs'] = data;
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setReviewsSection(values);
    };

    const handleAddReviewCard = () => {
        setReviewsSection([...reviewsSection, { company: '', clientName: '', description: '', clientImgs: { filename: "", path: "" } }]);
    };
    const handleRemoveReviewCard = (index) => {
        const values = reviewsSection.slice();
        values.splice(index, 1); // Remove the card at the given index
        setReviewsSection(values);
    };

    // Handle input change for ClientSection heading
    const handleClientSectionChange = (e) => {
        const { name, value } = e.target;
        setClientSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addClients = () => {
        setClientLogos([...clientLogos, { filename: '', path: '' }]);
    };

    // Remove a service card
    const removeClients = (index) => {
        const updatedClients = clientLogos.filter((_, cardIndex) => cardIndex !== index);
        setClientLogos(updatedClients);
    };
    const handleClients = (index, data) => {
        const updatedDclients = clientLogos.map((Client, i) =>
            i === index ? { ...data } : { ...Client }
        );
        setClientLogos(updatedDclients);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateHomePageAction({ homedata: { heroSection, servicesSection, aboutSection, servicesCardSection, testimonialSection, reviewsSection, clientSection: { ...clientSection, clientLogos } }, id: pageData._id }));
        alert("homePage updated successfully");
    };

    let fff = (a, b, c) => {
        handleServicesCardChange(a, b, c)
    }

    return (
        <>
            <Sidebar titles="Home Page" />
            <div className="main__content">
                <div className="card__box" style={{ display: "block" }}>

                    <form onSubmit={handleSubmit}>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button"
                                    role="tab" aria-controls="pills-hero" aria-selected="true">Hero Section</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button"
                                    role="tab" aria-controls="pills-about" aria-selected="false">About Section </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-services-tab" data-bs-toggle="pill" data-bs-target="#pills-services" type="button"
                                    role="tab" aria-controls="pills-services" aria-selected="false">Services Section</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-testimonial-tab" data-bs-toggle="pill" data-bs-target="#pills-testimonial" type="button"
                                    role="tab" aria-controls="pills-testimonial" aria-selected="false">Testimonial Section</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#pills-reviews" type="button"
                                    role="tab" aria-controls="pills-reviews" aria-selected="false">Reviews Section</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-clients-tab" data-bs-toggle="pill" data-bs-target="#pills-clients" type="button"
                                    role="tab" aria-controls="pills-clients" aria-selected="false">  Clients Section</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel" aria-labelledby="pills-hero-tab"><div className="mb-3">
                                <label htmlFor="heroheading.heading" className="form-label"> HeroBanner Main Heading </label>
                                <input required type="text"
                                    name="heroSection.heading"
                                    id="heroheading.heading"
                                    className="form-control"
                                    value={heroSection.heading}
                                    onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                    placeholder="Hero Heading"
                                />
                            </div>
                                <div className="mb-3">
                                    <label htmlFor="herosubHeading.subHeading" className="form-label"> HeroBanner subHeading </label>
                                    <input required type="text"
                                        id="herosubHeading.subHeading"
                                        name="heroSection.subHeading"
                                        className="form-control"
                                        value={heroSection.subHeading}
                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                        placeholder="Hero Subheading"
                                    />
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab"><div className="mb-3">
                                <label htmlFor="aboutSection" className="form-label"> Hero Section subHeading </label>
                                <textarea required rows={5}
                                    name="aboutSection"
                                    id="aboutSection"
                                    className="form-control"
                                    value={aboutSection}
                                    onChange={(e) => setAboutSection(e.target.value)}
                                    placeholder="aboutSection"
                                ></textarea>
                            </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-services" role="tabpanel" aria-labelledby="pills-services-tab">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="serviceheading" className="form-label">Service Section Heading </label>
                                        <input required type="text"
                                            name="servicesSection.heading"
                                            id="serviceheading"
                                            className="form-control"
                                            value={servicesSection.heading}
                                            onChange={(e) => setServicesSection({ ...servicesSection, heading: e.target.value })}
                                            placeholder="service Heading"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="servicepreHeading" className="form-label">Service Section  PreHeading </label>
                                        <input required type="text"
                                            name="servicesSection.preHeading"
                                            id="servicepreHeading"
                                            className="form-control"
                                            value={servicesSection.preHeading}
                                            onChange={(e) => setServicesSection({ ...servicesSection, preHeading: e.target.value })}
                                            placeholder="service preHeading"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    {servicesCardSection.map((card, index) => (
                                        <div key={index} className='border my-3 p-3'>
                                            <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveServicesCard(index)}> X</button>
                                            <div>
                                                <h5>Card {index + 1}</h5>
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor={`servicesheading${index}`} className="form-label">Service Name </label>
                                                        <input required type="text"
                                                            name="heading"
                                                            id={`servicesheading${index}`}
                                                            className="form-control"
                                                            value={card.heading}
                                                            onChange={(e) => handleServicesCardChange(index, e)}
                                                            placeholder="services  Heading"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor={`servicesdescription${index}`} className="form-label"> service Description  </label>
                                                        <textarea required rows={4}
                                                            name="description"
                                                            id={`servicesdescription${index}`}
                                                            className="form-control"
                                                            value={card.description}
                                                            onChange={(e) => handleServicesCardChange(index, e)}
                                                            placeholder="services  description"
                                                        />
                                                    </div>
                                                </div>
                                                <span className="form-label">service PointList </span>
                                                <div className="d-flex justify-content-start  " style={{ flexWrap: "wrap", rowGap: "20px", columnGap: "30px" }}>
                                                    {
                                                        card.servicePointList.map((v, i) => {
                                                            return (
                                                                <div className="input-group mb-3" key={i} style={{ width: "fit-content" }}>
                                                                    <input required type="text"
                                                                        name="servicePointList"
                                                                        className="form-control"
                                                                        value={v}
                                                                        onChange={(e) => handleCardListChange(index, i, e)}
                                                                        placeholder="servicePointList"
                                                                        autoComplete="false"
                                                                    />
                                                                    <button type="button" className='input-group-text btn btn-danger' onClick={() => { handleRemoveServicesCardList(index, i) }} > X </button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <br />
                                                <button type="button" className='btn btn-info' onClick={() => addCardList(index)}>
                                                    Add More List Items
                                                </button>
                                                <br />
                                                <br />
                                                <HomepageServiceCard card={card} index={index} fff={fff} />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddServicesCard} className="btn btn-secondary">Add New ServicesCard</button>
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-testimonial" role="tabpanel" aria-labelledby="pills-testimonial-tab"> <div className="mb-3">
                                <label htmlFor="testimonialSectionpreHeading" className="form-label">preHeading </label>
                                <input required type="text"
                                    id="testimonialSectionpreHeading"
                                    name="testimonialSection.preHeading"
                                    className="form-control"
                                    value={testimonialSection.preHeading}
                                    onChange={(e) => setTestimonialSection({ ...testimonialSection, preHeading: e.target.value })}
                                    placeholder="testimonialSection preheading"
                                />
                            </div>
                                <div className="mb-3">
                                    <label htmlFor="testimonialSectionheading" className="form-label">Heading </label>
                                    <input required type="text"
                                        name="testimonialSection.heading"
                                        id="testimonialSectionheading"
                                        className="form-control"
                                        value={testimonialSection.heading}
                                        onChange={(e) => setTestimonialSection({ ...testimonialSection, heading: e.target.value })}
                                        placeholder="testimonialSection   Heading"
                                    />
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                                <div className="mb-3">
                                    {reviewsSection.map((card, index) => (
                                        <div key={index} className='border my-3 p-3'>
                                            <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveReviewCard(index)}> X </button>
                                            <ReviewCard handleReviewCardChange={handleReviewCardChange} card={card} index={index} />
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddReviewCard} className="btn btn-secondary">Add New ReviewCard</button>
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-clients" role="tabpanel" aria-labelledby="pills-clients-tab">
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="Clientheading" className="form-label"> Clients Section lheading </label>
                                        <input required
                                            type="text"
                                            name="heading"
                                            id="Clientheading"
                                            value={clientSection.heading}
                                            onChange={handleClientSectionChange}
                                            placeholder="Client Section Heading"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ClientsubHeading" className="form-label"> Clients Section  subHeading </label>
                                        <input required
                                            type="text"
                                            name="subHeading"
                                            id="ClientsubHeading"
                                            value={clientSection.subHeading}
                                            onChange={handleClientSectionChange}
                                            placeholder="Client Section subHeading"
                                            className="form-control"
                                        />
                                    </div>
                                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                                        {clientLogos.map((client, index) => (
                                            <div key={index} className="mb-3  border" style={{ width: "fit-content", minWidth: "150px" }}>
                                                <button type="button" className='btn btn-danger float-end' onClick={() => { removeClients(index) }}> X </button>
                                                <HomepageClients client={client} index={index} handleClients={handleClients} />
                                            </div>
                                        )
                                        )}
                                    </div>
                                    <button type="button" className='btn btn-primary' onClick={addClients}> Add More Client </button>
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Homepage;