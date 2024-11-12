import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './adminstyle.css'
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { updateCareerPageAction } from '../redux/actions/careeraction';
import CareerCardSection from './CareerCardSection';

const Careerpage = () => {
    const { pageData } = useSelector((state) => state.page);
    let dispatch = useDispatch();
    //  career page states 
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : ""
    });
    const [jobSection, setJobSection] = useState({
        heading: pageData ? pageData.jobSection.heading : "",
        subHeading: pageData ? pageData.jobSection.subHeading : ""
    });
    const [cardsSection, setCardsSection] = useState(
        pageData ? pageData.cardsSection.map(card => ({ ...card, cardImg: { ...card.cardImg } }))
            : [{ cardHeading: '', cardDescription: '', cardImg: { filename: "", path: "" } }]
    );
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
        const values = [...cardsSection];
        values.splice(index, 1); // Remove the card at the given index
        setCardsSection(values);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updateCareerPageAction({ careerdata: { heroSection, jobSection, cardsSection }, id: pageData._id }));
        alert("careerPage updated successfully");
    };


    return (
        <>
            <Sidebar titles="Career Page" />
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
                                <Accordion.Header>Cards Sectionn</Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        <h5>Cards Section</h5>
                                        {cardsSection.map((card, index) => (
                                            <div key={index} className='border my-3 p-3'>
                                                <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveCard(index)}> X </button>
                                                <h5>Card {index + 1}</h5>
                                                <div className="mb-3">
                                                    <span className="form-label">cardHeading </span>
                                                    <input required type="text"
                                                        className="form-control"
                                                        name="cardHeading"
                                                        value={card.cardHeading}
                                                        onChange={(event) => handleCardChange(index, event)}
                                                        placeholder="Card Heading"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <span className="form-label">cardDescription </span>
                                                    <textarea rows={4}
                                                        name="cardDescription"
                                                        value={card.cardDescription}
                                                        onChange={(event) => handleCardChange(index, event)}
                                                        placeholder="Card Description"
                                                        className="form-control"
                                                        required
                                                    ></textarea>
                                                </div>
                                                <CareerCardSection handleCardChange={handleCardChange} card={card} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <button type="button" onClick={handleAddCard} className="btn btn-secondary">Add New Card</button>
                                    <br></br>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Job Section</Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        <label htmlFor="Jobheading" className="form-label">JobHeading </label>
                                        <input required type="text"
                                            id="Jobheading"
                                            name="jobSection.heading"
                                            className="form-control"
                                            value={jobSection.heading}
                                            onChange={(e) => setJobSection({ ...jobSection, heading: e.target.value })}
                                            placeholder="Job Heading"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="jobSectionsubHeading" className="form-label">subHeading </label>
                                        <input required type="text"
                                            id="jobSectionsubHeading"
                                            name="jobSection.subHeading"
                                            className="form-control"
                                            value={jobSection.subHeading}
                                            onChange={(e) => setJobSection({ ...jobSection, subHeading: e.target.value })}
                                            placeholder="Job Subheading"
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <hr />
                        <button className='btn btn-primary' type="submit">Update</button>
                    </form >

                </div>
            </div>
        </>

    );
};

export default Careerpage;