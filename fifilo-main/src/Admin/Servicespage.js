import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateServicePageAction } from '../redux/actions/servicesAction';
import ServicepageServicecard from './ServicepageServicecard';
import ToolSection from './ToolSection';
const ServicesForm = () => {
    let dispatch = useDispatch();

    const { pageData } = useSelector((state) => state.page);
    const [heroSection, setHeroSection] = useState({
        heading: pageData ? pageData.heroSection.heading : "",
        subHeading: pageData ? pageData.heroSection.subHeading : ""
    });
    const [servicesCards, setServicesCards] = useState(
        pageData ? pageData.servicesCards.map(card => ({
            ...card,
            cardDescription: [...card.cardDescription],
            cardList: [...card.cardList]
        })) : [{
            cardName: '', cardDescription: [''], cardList: [''], serviceImg: { filename: '', path: '', }
        }]);
    const [toolSection, setToolSection] = useState({
        heading: pageData ? pageData.toolSection.heading : "",

    });
    const [toolsLogo, setToolsLogo] = useState(
        pageData ? pageData.toolSection.toolsLogo.map(tool => ({ ...tool })) : [{ filename: '', path: '' }]
    );
    // Handle input change for hero section
    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setHeroSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    // Handle input change for services cards
    const handleServiceCardChange = (index, event, data) => {
        // const values = [...servicesCards];
        const values = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
            cardList: [...card.cardList]
        }));
        if (event === 'serviceImg') {
            values[index]['serviceImg'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setServicesCards(values);

    };
    // Handle input for cardDescription
    const handleCardDescriptionChange = (index, descIndex, e) => {
        const { value } = e.target;
        const newServicesCards = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
            cardList: [...card.cardList]
        }));
        // const newServicesCards = [...servicesCards];
        newServicesCards[index].cardDescription[descIndex] = value;
        setServicesCards(newServicesCards);
    };
    // Handle input for CardList
    const handleCardListChange = (index, listIndex, e) => {
        const { value } = e.target;
        // const newServicesCards = [...servicesCards];
        const newServicesCards = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
            cardList: [...card.cardList]
        }));
        newServicesCards[index].cardList[listIndex] = value;
        setServicesCards(newServicesCards);
    };
    // Add new cardDescription entry
    const addCardDescription = (index) => {
        const newServicesCards = servicesCards.map((card, i) =>
            i === index ? { ...card, cardDescription: [...card.cardDescription, ""] } : card
        );
        setServicesCards(newServicesCards);
    };
    // Add new CardList entry
    const addCardList = (index) => {
        const newServicesCards = servicesCards.map((card, i) =>
            i === index ? { ...card, cardList: [...card.cardList, ""] } : card
        );
        setServicesCards(newServicesCards);
    };
    const removeCardList = (cardIndex, listIndex) => {
        const newServicesCards = servicesCards.map((card, i) => {
            if (i === cardIndex) {
                // Filter out the item from cardList at the specified listIndex
                return {
                    ...card,
                    cardList: card.cardList.filter((_, idx) => idx !== listIndex)
                };
            }
            return card;
        });
        setServicesCards(newServicesCards);
    };



    // Add a new service card
    const addServiceCard = () => {
        setServicesCards([...servicesCards, { cardName: '', cardDescription: [''], cardList: [''], serviceImg: { filename: "", path: "" } }]);
    };

    let removeCardDescription = (cardIndex, descriptionIndex) => {
        const newServicesCards = servicesCards.map((card, i) => {
            if (i === cardIndex) {
                // Filter out the item from cardList at the specified listIndex
                return {
                    ...card,
                    cardDescription: card.cardDescription.filter((_, idx) => idx !== descriptionIndex)
                };
            }
            return card;
        });
        setServicesCards(newServicesCards);
    }

    // Remove a service card
    const removeServiceCard = (index) => {
        const updatedCards = servicesCards.filter((_, cardIndex) => cardIndex !== index);
        setServicesCards(updatedCards);
    };

    const addTools = () => {
        setToolsLogo([...toolsLogo, { filename: '', path: '' }]);
    };
    // Remove a service card
    const removeTools = (index) => {
        const updatedCards = toolsLogo.filter((_, cardIndex) => cardIndex !== index);
        setToolsLogo(updatedCards);
    };
    const handleTools = (index, data) => {
        const updatedTools = toolsLogo.map((tool, i) =>
            i === index ? { ...data } : { ...tool }
        );
        setToolsLogo(updatedTools);
    };


    // Handle input change for toolSection heading
    const handleToolSectionChange = (e) => {
        const { name, value } = e.target;
        setToolSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    // Handle image uploads for toolsLogo
    const handleToolsLogoChange = (e) => {
        const files = Array.from(e.target.files);
        setToolSection((prevState) => ({
            ...prevState,
            toolsLogo: [...prevState.toolsLogo, ...files]
        }));
    };
    // Submit form data to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateServicePageAction({ servicedata: { heroSection, servicesCards, toolSection: { ...toolSection, toolsLogo } }, id: pageData._id }));
        alert("servicePage updated successfully");

    };

    return (
        <>
            <Sidebar titles="Services  Page" />
            <div className="main__content">
                <div className="card__box" style={{ display: "block" }}>
                    <form onSubmit={handleSubmit}>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button"
                                    role="tab" aria-controls="pills-hero" aria-selected="true">Hero Section</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-ServicesCards-tab" data-bs-toggle="pill" data-bs-target="#pills-ServicesCards" type="button"
                                    role="tab" aria-controls="pills-ServicesCards" aria-selected="false">ServicesCards Section </button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-Tools-tab" data-bs-toggle="pill" data-bs-target="#pills-Tools" type="button"
                                    role="tab" aria-controls="pills-Tools" aria-selected="false">Tools Section</button>
                            </li>

                        </ul>

                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel" aria-labelledby="pills-hero-tab">
                                <div className="mb-3">
                                    <label htmlFor="heading" className="form-label"> heading </label>
                                    <input required
                                        name="heading"
                                        type="text"
                                        placeholder="Heading"
                                        onChange={handleHeroChange}
                                        value={heroSection.heading}
                                        className="form-control"
                                        id="heading"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="headingSpan" className="form-label"> Subheading </label>
                                    <input required
                                        type="text"
                                        className="form-control"
                                        value={heroSection.subHeading}
                                        onChange={handleHeroChange}
                                        placeholder="Subheading"
                                        name="subHeading"
                                        id="headingSpan"
                                    />
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                            <div className="tab-pane fade" id="pills-ServicesCards" role="tabpanel" aria-labelledby="pills-ServicesCards-tab">
                                {servicesCards.map((card, index) => (
                                    <div key={index} className='border p-4'>
                                        <span>Card {index + 1}</span>
                                        <button type="button" className="btn btn-danger float-end" onClick={() => removeServiceCard(index)} >X</button>
                                        <div className="mb-3">
                                            <label htmlFor={`cardName${index}`} className="form-label"> CardName </label>
                                            <input required
                                                id={`cardName${index}`}
                                                type="text"
                                                name="cardName"
                                                value={card.cardName}
                                                onChange={(e) => handleServiceCardChange(index, e)}
                                                placeholder="Card Name"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3 border p-3">
                                            <span className="form-label"> cardDescription  </span>  <br />
                                            {card.cardDescription.map((desc, descIndex) => (
                                                // <div key={descIndex}>
                                                <div className="input-group mb-3" key={descIndex} >
                                                    <textarea rows={3} required
                                                        name="carddescription"
                                                        type="text"
                                                        value={desc}
                                                        onChange={(e) => handleCardDescriptionChange(index, descIndex, e)}
                                                        placeholder="Card Description"
                                                        className="form-control"
                                                    />
                                                    <button type="button" className='btn btn-danger' onClick={() => removeCardDescription(index, descIndex)}>  X</button>
                                                </div>

                                            ))}<br />
                                            <button type="button" className='btn btn-info' onClick={() => addCardDescription(index)}>
                                                Add More Description
                                            </button>
                                        </div>
                                        <div className="mb-3 border p-3">
                                            <span className="form-label"> CardList </span> <br />
                                            {card.cardList.map((item, listIndex) => (
                                                // <div key={listIndex}>
                                                <div className="input-group mb-3" key={listIndex} style={{ width: "fit-content" }}>
                                                    <input required
                                                        name="cardlist"
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => handleCardListChange(index, listIndex, e)}
                                                        placeholder="Card List Item"
                                                        className="form-control"
                                                    />
                                                    <button type="button" className='btn btn-danger' onClick={() => removeCardList(index, listIndex)}>  X</button>
                                                </div>

                                            ))}
                                            <br />
                                            <button type="button" className='btn btn-info' onClick={() => addCardList(index)}>
                                                Add More List Items
                                            </button>
                                        </div>
                                        <ServicepageServicecard card={card} index={index} handleServiceCardChange={handleServiceCardChange} />
                                    </div>
                                ))}
                                <br />
                                <button type="button" className="btn btn-primary" onClick={addServiceCard}   >  Add More Service </button>
                                <br />
                                <br />
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>

                            <div className="tab-pane fade" id="pills-Tools" role="tabpanel" aria-labelledby="pills-Tools-tab">
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="toolheading" className="form-label"> toolheading </label>
                                        <input required
                                            id="toolheading"
                                            type="text"
                                            name="heading"
                                            value={toolSection.heading}
                                            onChange={handleToolSectionChange}
                                            placeholder="Tool Section Heading"
                                            className="form-control"
                                        />
                                    </div>
                                    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                                        {toolsLogo.map((tool, index) => (
                                            <div key={index} className="mb-3  border" style={{ width: "fit-content", minWidth: "150px" }}>
                                                <button type="button" className='btn btn-danger float-end' onClick={() => { removeTools(index) }}> X </button>
                                                <ToolSection tool={tool} index={index} handleTools={handleTools} />
                                            </div>
                                        )
                                        )}
                                    </div>
                                    <button type="button" className='btn btn-primary' onClick={addTools}> Add More Tool </button>
                                </div>
                                <button className='btn btn-primary' type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </ >
    );
};
export default ServicesForm;