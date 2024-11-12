import Sidebar from './Sidebar';
import './adminstyle.css'
import React, { useState } from 'react';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateAboutPageAction } from '../redux/actions/aboutAction';
import Accordion from 'react-bootstrap/Accordion';
import MemberCard from './MemberCard';
const Aboutpage = () => {
    const { pageData } = useSelector((state) => state.page);
    let dispatch = useDispatch();
    //  about page states 
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : ""
    });
    const [aboutSection, setAboutSection] = useState({
        heading: pageData ? pageData.aboutSection.heading : "",
        preHeading: pageData ? pageData.aboutSection.preHeading : "",
        description: pageData ? pageData.aboutSection.description : ""
    });
    const [processSection, setProcessSection] = useState({
        heading: pageData ? pageData.processSection.heading : "",
        preHeading: pageData ? pageData.processSection.preHeading : "",
        content: pageData ? [...pageData.processSection.content] : [{ heading: '', description: '' }]
    });
    const [teamSection, setTeamSection] = useState({
        heading: pageData ? pageData.teamSection.heading : "",
        preHeading: pageData ? pageData.teamSection.preHeading : "",
        description: pageData ? pageData.teamSection.description : ""
    });
    const [membersCard, setMembersCard] = useState(pageData ? [...pageData.membersCard] : [{ name: '', designation: '', linkedinUrl: '', memberImg: { filename: "", path: "" } }]);

    const handleMembersCardChange = (index, event, data) => {
        // const values = [...membersCard];
        const values = membersCard.map((card) => ({ ...card }));
        if (event === 'memberImg') {
            values[index]['memberImg'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setMembersCard(values);
    };

    const handleAddCard = () => {
        setMembersCard([...membersCard, { name: '', designation: '', linkedinUrl: '', memberImg: { filename: "", path: "" } }]);
    };
    const handleRemoveCard = (index) => {
        const updatedMembersCard = membersCard.filter((_, i) => i !== index);
        setMembersCard(updatedMembersCard);
    };
    // for content card 
    const handleContentCardChange = (index, event) => {
        const updatedContent = processSection.content.map((content, i) =>
            i === index
                ? { ...content, [event.target.name]: event.target.value }
                : content
        );
        setProcessSection({ ...processSection, content: updatedContent });
    };

    const handleAddContentCard = () => {
        setProcessSection({ ...processSection, content: [...processSection.content, { heading: '', description: '' }] });
    };
    const handleRemoveContentCard = (index) => {
        const updatedContent = processSection.content.filter((_, i) => i !== index);
        setProcessSection({ ...processSection, content: updatedContent });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateAboutPageAction({ aboutData: { heroSection, aboutSection, processSection, teamSection, membersCard }, id: pageData._id }));
        alert("aboutPage updated successfully");
    };

    return (
        <>
            <Sidebar titles="About Page"/>
            <div className="main__content" >
            <div className="card__box" style={{ display: "block" }}>
                <form onSubmit={handleSubmit}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header >Hero Section</Accordion.Header>
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
                            <Accordion.Header >about Section</Accordion.Header>
                            <Accordion.Body>
                                <div className="mb-3">
                                    <label htmlFor="aboutpreHeading" className="form-label">preHeading </label>
                                    <input required type="text"
                                        id="aboutpreHeading"
                                        name="aboutSection.preHeading"
                                        className="form-control"
                                        value={aboutSection.preHeading}
                                        onChange={(e) => setAboutSection({ ...aboutSection, preHeading: e.target.value })}
                                        placeholder="about  preheading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="aboutheading" className="form-label">Heading </label>
                                    <input required type="text"
                                        id="aboutheading"
                                        name="aboutSection.heading"
                                        className="form-control"
                                        value={aboutSection.heading}
                                        onChange={(e) => setAboutSection({ ...aboutSection, heading: e.target.value })}
                                        placeholder="about  Heading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="aboutdescription" className="form-label">description </label>
                                    <textarea rows={4} required type="text"
                                        id="aboutdescription"
                                        name="aboutSection.description"
                                        className="form-control"
                                        value={aboutSection.description}
                                        onChange={(e) => setAboutSection({ ...aboutSection, description: e.target.value })}
                                        placeholder="about  description"
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header >Process Section</Accordion.Header>
                            <Accordion.Body>
                                <div className="mb-3">
                                    <label htmlFor="processpreHeading" className="form-label">preHeading </label>
                                    <input required type="text"
                                        id="processpreHeading"
                                        name="processSection.preHeading"
                                        className="form-control"
                                        value={processSection.preHeading}
                                        onChange={(e) => setProcessSection({ ...processSection, preHeading: e.target.value })}
                                        placeholder="process  preheading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="processheading" className="form-label">Heading </label>
                                    <input required type="text"
                                        id="processheading"
                                        name="processSection.heading"
                                        className="form-control"
                                        value={processSection.heading}
                                        onChange={(e) => setProcessSection({ ...processSection, heading: e.target.value })}
                                        placeholder="process  Heading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <h5>content Section</h5>
                                    {processSection.content.map((card, index) => (
                                        <div key={index} className='border my-3 p-3'>
                                            <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveContentCard(index)}>X</button>
                                            <h5>Card {index + 1}</h5>
                                            <div className="mb-3">
                                                <span className="form-label">heading </span>
                                                <input required type="text"
                                                    className="form-control"
                                                    name="heading"
                                                    value={card.heading}
                                                    onChange={(event) => handleContentCardChange(index, event)}
                                                    placeholder="Card Heading"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <span className="form-label">card Description </span>
                                                <input required
                                                    type='text'
                                                    name="description"
                                                    value={card.description}
                                                    onChange={(event) => handleContentCardChange(index, event)}
                                                    placeholder="Card Description"
                                                    className="form-control"
                                                ></input>
                                            </div>

                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddContentCard} className="btn btn-secondary">Add New ContentCard</button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header >Team Section</Accordion.Header>
                            <Accordion.Body>
                                <div className="mb-3">
                                    <label htmlFor="teampreHeading" className="form-label">preHeading </label>
                                    <input required type="text"
                                        id="teampreHeading"
                                        name="teamSection.preHeading"
                                        className="form-control"
                                        value={teamSection.preHeading}
                                        onChange={(e) => setTeamSection({ ...teamSection, preHeading: e.target.value })}
                                        placeholder="team  preheading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="teamheading" className="form-label">Heading </label>
                                    <input required type="text"
                                        id="teamheading"
                                        name="teamSection.heading"
                                        className="form-control"
                                        value={teamSection.heading}
                                        onChange={(e) => setTeamSection({ ...teamSection, heading: e.target.value })}
                                        placeholder="team  Heading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="teamdescription" className="form-label">description </label>
                                    <input required type="text"
                                        id="teamdescription"
                                        name="teamSection.description"
                                        className="form-control"
                                        value={teamSection.description}
                                        onChange={(e) => setTeamSection({ ...teamSection, description: e.target.value })}
                                        placeholder="team  description"
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header >Members  Section</Accordion.Header>
                            <Accordion.Body>
                                <div className="mb-3">
                                    <h5>Cards Section</h5>
                                    {membersCard.map((card, index) => (
                                        <div key={index} className='border my-3 p-3'>
                                            <button type="button" className='btn btn-danger float-end' onClick={() => handleRemoveCard(index)}>X</button>
                                            <h5>Card {index + 1}</h5>
                                            <div className="mb-3">
                                                <span className="form-label">Member Name </span>
                                                <input required type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={card.name}
                                                    onChange={(event) => handleMembersCardChange(index, event)}
                                                    placeholder="Member Name"
                                                    autoComplete='false'
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <span className="form-label">Member designation </span>
                                                <input required type="text"
                                                    className="form-control"
                                                    name="designation"
                                                    value={card.designation}
                                                    onChange={(event) => handleMembersCardChange(index, event)}
                                                    placeholder="Member Designation"
                                                    autoComplete='false'
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <span className="form-label">Member linkedinUrl </span>
                                                <input required type="text"
                                                    className="form-control"
                                                    name="linkedinUrl"
                                                    value={card.linkedinUrl}
                                                    autoComplete='false'
                                                    onChange={(event) => handleMembersCardChange(index, event)}
                                                    placeholder="Member linkedinUrl"
                                                />
                                            </div>

                                            <MemberCard handleMembersCardChange={handleMembersCardChange} card={card} index={index} />

                                        </div>
                                    ))}
                                </div>
                                <br></br>
                                <button type="button" onClick={handleAddCard} className="btn btn-secondary">Add New Card</button>
                                <br></br>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <br />
                    <button className='btn btn-primary' type="submit">Update </button>
                </form>

            </div>
        </div >
        </>
    );
};

export default Aboutpage;