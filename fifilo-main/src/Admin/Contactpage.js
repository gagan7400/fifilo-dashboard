import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { updateContactPageAction } from '../redux/actions/contactAction';
const Contactpage = () => {
    let dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.page);
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : ""
    });

    const [cardSection, setCardSection] = useState({
        heading: pageData ? pageData.cardSection.heading : "",
        email: pageData ? pageData.cardSection.email : "",
        phoneNumber: pageData ? pageData.cardSection.phoneNumber : ""
    }
    );


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateContactPageAction({ contactPageData: { heroSection, cardSection }, id: pageData._id }));
        alert("FaqPage updated successfully");

    };
    return (
        <>
            <Sidebar titles="Contact Page" />
            <div className="main__content" >
                <div className="card__box" style={{ display: "block" }}>
                 <form onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Hero Section</Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        <label htmlFor="heroheading" className="form-label">Heading </label>
                                        <input required type="text"
                                            id="heroheading"
                                            name="heroSection.heading"
                                            className="form-control"
                                            value={heroSection.heading}
                                            onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                            placeholder="Hero Heading"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="herosubHeading" className="form-label">subHeading </label>
                                        <input required type="text"
                                            id="herosubHeading"
                                            name="heroSection.subHeading"
                                            className="form-control"
                                            value={heroSection.subHeading}
                                            onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                            placeholder="Hero Subheading"
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Card Section</Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        <label htmlFor="cardheading" className="form-label">Heading </label>
                                        <input required type="text"
                                            id="cardheading"
                                            name="cardSection.heading"
                                            className="form-control"
                                            value={cardSection.heading}
                                            onChange={(e) => setCardSection({ ...cardSection, heading: e.target.value })}
                                            placeholder="Hero Heading"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cardemail" className="form-label">email </label>
                                        <input required type="text"
                                            id="cardemail"
                                            name="cardSection.email"
                                            className="form-control"
                                            value={cardSection.email}
                                            onChange={(e) => setCardSection({ ...cardSection, email: e.target.value })}
                                            placeholder="Hero email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cardphoneNumber" className="form-label">phoneNumber </label>
                                        <input required type="text"
                                            id="cardphoneNumber"
                                            name="cardSection.phoneNumber"
                                            className="form-control"
                                            value={cardSection.phoneNumber}
                                            onChange={(e) => setCardSection({ ...cardSection, phoneNumber: e.target.value })}
                                            placeholder="Hero phoneNumber"
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <br />
                        <button className='btn btn-primary' type="submit">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contactpage;