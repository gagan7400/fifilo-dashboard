import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProcessIcon from './ProcessIcon';
import { Editor } from "@tinymce/tinymce-react";
const CasestudyPage = () => {
    const { pageData } = useSelector((state) => state.page);
    const [heroSection, setHeroSection] = useState(pageData ? { ...pageData.heroSection } : {
        casestudyName: "",
        description: "",
        buttonsContent: "",
        workButtons: [{ url: "", name: "" }],
        heroImg: { filename: "", path: "" },
        cardImg: { filename: "", path: "" }
    });
    const [overviewSection, setOverviewSection] = useState(pageData ? { ...pageData.overviewSection } : {
        briefInsight: {
            contentBox: { heading: "", description: "" },
            overviewBox: [{ name: "", value: "" }]
        },
        coreIssue: { heading: "", description: "" },
        Strategy: { heading: "", description: "" }
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
    const handleOverviewSectionChange = (section, field, value, index = null) => {
        setOverviewSection((prev) => {
            const updatedSection = { ...prev };

            if (field === "contentBox") {
                // Update specific contentBox fields (heading/description)
                updatedSection[section][field] = {
                    ...updatedSection[section][field],
                    ...value, // Merge the updated field
                };
            } else if (field === "overviewBox" && index !== null) {
                // Update specific index in overviewBox
                updatedSection[section][field][index] = {
                    ...updatedSection[section][field][index],
                    ...value,
                };
            } else {
                // Update regular fields
                updatedSection[section][field] = value;
            }

            return updatedSection;
        });
    };

    // Handler to add a new item to overviewBox
    const addOverviewBox = () => {
        setOverviewSection((prev) => ({
            ...prev,
            briefInsight: {
                ...prev.briefInsight,
                overviewBox: [...prev.briefInsight.overviewBox, { name: "", value: "" }]
            }
        }));
    };

    // Handler to remove an item from overviewBox
    const removeOverviewBox = (index) => {
        setOverviewSection((prev) => ({
            ...prev,
            briefInsight: {
                ...prev.briefInsight,
                overviewBox: prev.briefInsight.overviewBox.filter((_, i) => i !== index)
            }
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(overviewSection)
        try {
            if (heroSection) {
                let { data } = await axios.put('http://localhost:5000/admin/casestudy/updatecasestudy/' + pageData._id, { heroSection, overviewSection }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                if (data.success) {
                    console.log(data)
                    alert("updated succesfully")
                } else {
                    alert("error occured");
                }
            }
        } catch (error) {
            alert("Error Occured")
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
                            <li className="breadcrumb-item active">{pageData?.heroSection?.casestudyName}</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>{pageData?.heroSection?.casestudyName}</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-overviewSection-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-overviewSection" type="button" role="tab" aria-controls="pills-overviewSection"
                                    aria-selected="true">overviewSection</button>
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
                                                            onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
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
                                                <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade show active" id="pills-overviewSection" role="tabpanel"
                                aria-labelledby="pills-overviewSection-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="briefInsightHeading">BriefInsight Heading</label>
                                                        <input required type="text"
                                                            name="briefInsightHeading"
                                                            id="briefInsightHeading"
                                                            className="form-control"
                                                            // value={overviewSection.briefInsight.contentBox.heading}
                                                            // onChange={(e) => setOverviewSection({ ...overviewSection, briefInsight: { ...overviewSection.briefInsight, contentBox: { ...overviewSection.briefInsight.contentBox, heading: e.target.value } } })}
                                                            value={overviewSection.briefInsight.contentBox.heading}
                                                            onChange={(e) => handleOverviewSectionChange("briefInsight", "contentBox", { heading: e.target.value })}
                                                            placeholder="Enter BriefInsight Heading"
                                                            autoComplete="false"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="briefInsightdescription">BriefInsight Description</label>
                                                        <textarea required rows={5}
                                                            name="briefInsightdescription"
                                                            id="briefInsightdescription"
                                                            className="form-control"
                                                            value={overviewSection.briefInsight.contentBox.description}
                                                            onChange={(e) => handleOverviewSectionChange("briefInsight", "contentBox", { description: e.target.value })}
                                                            placeholder="Enter BriefInsight Description"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        {overviewSection.briefInsight.overviewBox.map((item, index) => (
                                                            <div className="card__block" key={index} >
                                                                <div className="testimonial__box">
                                                                    <div className="top__heading">
                                                                        <p>Step {index + 1}</p>

                                                                        <button type="button" className="btn" onClick={() => removeOverviewBox(index)}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="Name">Name :</label>
                                                                                <input required type="text"
                                                                                    id="Name"
                                                                                    name="Name"
                                                                                    className="form-control"
                                                                                    value={item.name}
                                                                                    onChange={(e) =>
                                                                                        handleOverviewSectionChange("briefInsight", "overviewBox", { name: e.target.value }, index)
                                                                                    }
                                                                                    placeholder="Enter Name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="workButtonsurl">Value :</label>
                                                                                <input required type="text"
                                                                                    id="Value"
                                                                                    name="Value"
                                                                                    className="form-control"
                                                                                    value={item.value}
                                                                                    onChange={(e) =>
                                                                                        handleOverviewSectionChange("briefInsight", "overviewBox", { value: e.target.value }, index)
                                                                                    }
                                                                                    placeholder="Enter Value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add__review">
                                                            <button className="btn" type="button" onClick={addOverviewBox}><img src="assets/imgs/plus.svg" alt="" />Add More Content</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="CoreIssue">Core Issue Heading</label>
                                                        <input type="text" required
                                                            name="CoreIssueHeading"
                                                            id="CoreIssueHeading"
                                                            className="form-control"
                                                            value={overviewSection.coreIssue.heading}
                                                            onChange={(e) => handleOverviewSectionChange("coreIssue", "heading", e.target.value)}
                                                            placeholder="Enter Core Issue Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="CoreIssue">Core Issue Description</label>
                                                        <textarea required rows={4}
                                                            name="CoreIssueDescription"
                                                            id="CoreIssueDescription"
                                                            className="form-control"
                                                            value={overviewSection.coreIssue.description}
                                                            onChange={(e) => handleOverviewSectionChange("coreIssue", "description", e.target.value)}
                                                            placeholder="Enter Core Issue Description"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="StrategyHeading">Strategy Heading</label>
                                                        <input type="text" required
                                                            name="StrategyHeading"
                                                            id="StrategyHeading"
                                                            className="form-control"
                                                            value={overviewSection.Strategy.heading}
                                                            onChange={(e) => handleOverviewSectionChange("Strategy", "heading", e.target.value)}
                                                            placeholder="Enter Strategy Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="Strategy Description">Strategy Description</label>
                                                        <Editor
                                                            value={overviewSection.Strategy.description}
                                                            apiKey="jd3e97w8li70lbzue44vverzarnpb6y52c1aht6swqstquwz"
                                                            init={{
                                                                height: 400,
                                                                menubar: true,
                                                                plugins: [
                                                                    "advlist",
                                                                    "lists",
                                                                    "link", "image", "charmap", "preview", "anchor", // Optional additional features
                                                                    "searchreplace", "visualblocks", "code", "fullscreen",
                                                                    "insertdatetime", "media", "table", "paste", "help", "wordcount"
                                                                ],
                                                                toolbar:
                                                                    "undo redo | formatselect | bold italic backcolor  | \ alignleft aligncenter alignright alignjustify | \ bullist numlist | removeformat | help",
                                                            }}
                                                            onEditorChange={(newContent) => handleOverviewSectionChange("Strategy", "description", newContent)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="update__block">
                                                <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
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

export default CasestudyPage;