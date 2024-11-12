import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPublishFaqPage, updateFaqAction } from '../redux/actions/faqAction';
import Accordion from 'react-bootstrap/Accordion';

const Faqpage = () => {
    const dispatch = useDispatch();
    const { publishedfaqdata, publishedfaqloading } = useSelector((state) => state.faq);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: ""
    });

    const [faqSection, setFaqSection] = useState([{ question: "", answer: "" }]);

    // Load published data when component mounts
    useEffect(() => {
        dispatch(getPublishFaqPage());
    }, [dispatch]);

    // Update form fields when published data is loaded
    useEffect(() => {
        if (!publishedfaqloading && publishedfaqdata) {
            setHeroSection({
                heading: publishedfaqdata.heroSection.heading,
                subHeading: publishedfaqdata.heroSection.subHeading
            });
            setFaqSection(publishedfaqdata.faqSection.map((v) => ({
                question: v.question,
                answer: v.answer
            })));
        }
    }, [publishedfaqloading, publishedfaqdata]);

    const handleFaqChange = (index, event) => {
        const values = [...faqSection];
        values[index][event.target.name] = event.target.value;
        setFaqSection(values);
    };

    const handleAddCard = () => {
        setFaqSection([...faqSection, { question: '', answer: "" }]);
    };

    const handleRemoveCard = (index) => {
        const values = [...faqSection];
        values.splice(index, 1);
        setFaqSection(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateFaqAction({
            faqData: { heroSection, faqSection },
            id: publishedfaqdata._id
        }));
        alert("FAQ Page updated successfully");
    };
    return (
        <>
            <Sidebar titles="Faq's Page" />
            <div className="main__content"  >
                <div className="card__box" style={{ display: "block" }}>
                    <form onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Hero Section</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="heroheading" className="form-label">Heading </label>
                                            <input required type="text"
                                                name="heroSection.heading"
                                                id="heroheading"
                                                className="form-control"
                                                value={heroSection.heading}
                                                onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                placeholder="Hero Heading"
                                            />
                                        </div>
                                        <div className="col">
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
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Question-Answer Section</Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        {faqSection.map((card, index) => (
                                            <div key={index} className='border my-3 p-3'>
                                                {faqSection.length > 1 && <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveCard(index)}>X</button>}
                                                <div className="mb-3">
                                                    <label htmlFor={`question${index}`} className="form-label"><b className='fs-4'> Question {index + 1} </b> </label>
                                                    <input required type="text"
                                                        className="form-control"
                                                        name="question"
                                                        id={`question${index}`}
                                                        value={card.question}
                                                        onChange={(event) => handleFaqChange(index, event)}
                                                        placeholder="question"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor={`answer${index}`} className="form-label">Answer </label>
                                                    <textarea className="form-control"
                                                        name="answer"
                                                        required
                                                        id={`answer${index}`}
                                                        value={card.answer}
                                                        rows={4}
                                                        onChange={(event) => handleFaqChange(index, event)}
                                                        placeholder="answer"></textarea>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" id="faqsubmit" onClick={handleAddCard} className="btn btn-secondary">Add Question</button>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <hr />
                        <button className='btn btn-primary' type="submit">Update</button>
                    </form>


                </div>
            </div>
        </ >
    );
};

export default Faqpage;