import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { getPublishFaqPage, updateFaqAction } from '../redux/actions/faqAction';

import { NavLink } from 'react-router-dom';

const Faqpage = () => {
    const dispatch = useDispatch();
    const { publishedfaqdata, publishedfaqloading } = useSelector((state) => state.faq);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: ""
    });

    const [faqSection, setFaqSection] = useState([{ question: "", answer: "" }]);

    useEffect(() => {
        dispatch(getPublishFaqPage());
    }, [dispatch]);

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
                <div class="page__editors">
                    <div class="page__title">
                        <h5>FAQ Page</h5>
                    </div>

                    <div class="page__editContent">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-heading-tab" data-bs-toggle="pill" data-bs-target="#pills-heading" type="button" role="tab" aria-controls="pills-heading"
                                    aria-selected="true">Heading</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-question-tab" data-bs-toggle="pill" data-bs-target="#pills-question" type="button" role="tab" aria-controls="pills-question"
                                    aria-selected="false">Question-Answer Section</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-heading" role="tabpanel" aria-labelledby="pills-heading-tab">
                                <div class="edit__tools">
                                    <div class="card__block">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="input__inr">
                                                    <label for="heroheading">Main Heading</label>
                                                    <input required type="text"
                                                        name="heroSection.heading"
                                                        id="heroheading"
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
                                                    <textarea rows="2"
                                                        id="herosubHeading"
                                                        name="heroSection.subHeading"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Heading"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="update__block">
                                            <button class="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-question" role="tabpanel" aria-labelledby="pills-question-tab">
                                <div class="edit__tools">
                                    {faqSection.map((card, index) => (
                                        <div class="card__block">
                                            <div class="testimonial__box">
                                                <div class="top__heading">
                                                    <p>Question {index + 1}</p>
                                                    {faqSection.length > 1 && <button class="btn" onClick={() => handleRemoveCard(index)}><img src="/assets/imgs/trash.svg" alt="" />Delete</button>}
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="input__inr">
                                                            <label for="question">Question</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="question"
                                                                id={`question${index}`}
                                                                value={card.question}
                                                                onChange={(event) => handleFaqChange(index, event)}
                                                                placeholder="Enter Question"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="input__inr">
                                                            <label for="answer">Answer</label>
                                                            <textarea className="form-control"
                                                                name="answer"
                                                                rows={4}
                                                                required
                                                                id={`answer${index}`}
                                                                value={card.answer}
                                                                onChange={(event) => handleFaqChange(index, event)}
                                                                placeholder="Enter Answer"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div class="add__review">
                                        <button class="btn" onClick={handleAddCard}><img src="/assets/imgs/plus.svg" alt="" />Add New Review</button>
                                    </div>
                                    <div class="update__block">
                                        <button class="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    );
};

export default Faqpage;