import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProcessIcon from './ProcessIcon';

const Newcasestudy = () => {
    let dispatch = useDispatch();
    const [heroSection, setHeroSection] = useState({
        casestudyName: "",
        description: "",
        buttonsContent: "",
        workButtons: [{ url: "", name: "" }],
        heroImg: { filename: "", path: "" },
        cardImg: { filename: "", path: "" }
    });
    const [overview, setOverview] = useState({
        briefInsignt: {
            contentBox: { heading: "", description: "" },
            overiewBox: [{ name: "", value: "" }]
        },
        issueAndStrategy: ""
    });
    let addWorkButtons = () => {
        let newButton = { url: "", name: "" }
        setHeroSection(prevState => ({ ...prevState, workButtons: [...prevState.workButtons, newButton] }));
    }
    let removeWorkButtons = (index) => {
        setHeroSection(prevState => ({
            ...prevState, workButtons: [...prevState.workButtons.slice(
                0, index), ...prevState.workButtons.slice(index + 1)]
        }));
    }
    let HandleWorkButtons = (index, event) => {
        const newworkButton = heroSection.workButtons.map((card) => ({ ...card }));
        newworkButton[index][event.target.name] = event.target.value;
        setHeroSection({ ...heroSection, workButtons: [...newworkButton] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (heroSection) {
                let { data } = await axios.post('http://localhost:5000/admin/casestudy/createcasestudy/', { heroSection }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                if (data.success) {
                    alert("Created Succesfully")
                } else {
                    alert("Error Occured");

                }
            }
        } catch (error) {
            alert("Error Occured");
        }

    };
     
    return (
        <>
            <Sidebar titles="casestudy" />
            <div className="main__content" >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/section/casestudypages">Back</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">New Casestudy</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>New Casestudy</h5>
                    </div>

                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel"
                                aria-labelledby="pills-hero-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="heroheading">Heading</label>
                                                        <input required type="text"
                                                            name="heroSection"
                                                            id="heroheading"
                                                            className="form-control"
                                                            value={heroSection.casestudyName}
                                                            onChange={(e) => setHeroSection({ ...heroSection, casestudyName: e.target.value })}
                                                            placeholder="Enter Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="description">Description</label>
                                                        <input id="description"
                                                            name="description"
                                                            className="form-control"
                                                            value={heroSection.description}
                                                            onChange={(e) => setHeroSection({ ...heroSection, description: e.target.value })}
                                                            placeholder="Enter Description" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="buttonsContent">ButtonsContent</label>
                                                        <input type="text" id="buttonsContent"
                                                            name="buttonsContent"
                                                            className="form-control"
                                                            value={heroSection.buttonsContent}
                                                            onChange={(e) => setHeroSection({ ...heroSection, buttonsContent: e.target.value })}
                                                            placeholder="Enter buttonsContent"></input>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        {heroSection.workButtons.map((v, index) => (
                                                            <div className="card__block" key={index} >
                                                                <div className="testimonial__box">
                                                                    <div className="top__heading">
                                                                        <p>Button  {index + 1}</p>
                                                                        <button className="btn" onClick={() => { removeWorkButtons(index) }}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="workButtonsName">WorkButton Name</label>
                                                                                <input required type="text"
                                                                                    id="workButtons"
                                                                                    name="name"
                                                                                    className="form-control"
                                                                                    value={v.name}
                                                                                    onChange={(e) => HandleWorkButtons(index, e)}
                                                                                    placeholder="Enter Button Text" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="workButtonsurl">WorkButton Url</label>
                                                                                <input required type="text"
                                                                                    id="workButtons"
                                                                                    name="url"
                                                                                    className="form-control"
                                                                                    value={v.url}
                                                                                    onChange={(e) => HandleWorkButtons(index, e)}
                                                                                    placeholder="Enter Button Url" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add__review">
                                                            <button className="btn" onClick={addWorkButtons}><img src="assets/imgs/plus.svg" alt="" />Add New Button</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="buttonsContent">Hero IMg</label>
                                                <ProcessIcon heroSection={heroSection} name="heroImg" setHeroSection={setHeroSection} />
                                                <label htmlFor="buttonsContent">Card Img</label>
                                                <ProcessIcon heroSection={heroSection} name="cardImg" setHeroSection={setHeroSection} />
                                            </div>
                                            <div className="update__block">
                                                <button className="btn btn__update" type="button" onClick={handleSubmit}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Newcasestudy;