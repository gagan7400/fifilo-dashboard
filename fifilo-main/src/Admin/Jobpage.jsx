import React, { useEffect, useState } from 'react';
import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { createjob, getjobs, deleteJob, updatejobAction, } from '../redux/actions/careeraction';
import Sidebar from './Sidebar';

export default function Jobpage() {
    const [jobTitle, setJobtitle] = useState("")
    const [category, setCategory] = useState("")
    const [yearsOfExperience, setYearsOfExperience] = useState("")
    const [location, setLocation] = useState("")
    const [jobType, setJobType] = useState("")
    const [description, setDescription] = useState("")
    const [responsibilities, setResponsibilities] = useState("")
    const [jobStatus, setJobStatus] = useState("");
    const [section, setSection] = useState(true);
    const [isUpdateJob, setIsUpdateJob] = useState({ isupdate: false, data: null, id: null })
    let dispatch = useDispatch();
    let { jobs } = useSelector((state) => state.jobs);
    useEffect(() => {
        dispatch(getjobs());
    }, [dispatch]);

    let submithandler = (e) => {
        e.preventDefault();
        if (!jobTitle || !category || !yearsOfExperience || !location || !description || !responsibilities || !jobType || !jobStatus) {
            alert("please fill all the field")
        } else {


            if (isUpdateJob.isupdate && isUpdateJob.id) {
                dispatch(updatejobAction({ Jobdata: { jobTitle, category, yearsOfExperience, location, description, responsibilities, jobType, jobStatus }, id: isUpdateJob.id }));
                setIsUpdateJob({ isupdate: false, data: null, id: null });
                alert("job updated successfully")
                setSection(false);
            } else {
                dispatch(createjob({ jobTitle, category, yearsOfExperience, location, description, responsibilities, jobType, jobStatus }));
                alert("job created successfully")
                setSection(false);
            }
            setJobtitle("");
            setCategory("");
            setYearsOfExperience("");
            setLocation("")
            setJobType("")
            setDescription("")
            setResponsibilities("")
            setJobStatus("")
        }
    }
    let deleted = (id) => {
        let ask = window.confirm("Are you want to Delete this Job");
        if (ask) {
            dispatch(deleteJob(id))
        }
    }
    let updatejob = ({ id, data }) => {
        setIsUpdateJob({ isupdate: true, data, id })
        setSection(true);
        setJobtitle(data.jobTitle);
        setCategory(data.category);
        setYearsOfExperience(data.yearsOfExperience);
        setLocation(data.location)
        setJobType(data.jobType)
        setDescription(data.description)
        setResponsibilities(data.responsibilities)
        setJobStatus(data.jobStatus)
    }
    return (
        <>
            <Sidebar titles="Job section" />
            <div className="main__content">
                <div className="card__box" style={{ display: "block" }} >
                    <div className="heading-cp">
                        <h2>  </h2>
                    </div>
                    <br />
                    <button className={`btn ${section && "btn-info"}`} onClick={() => { setSection(true) }}> Create a New Job Section </button>
                    <button className={`btn ${!section && "btn-info"}`} onClick={() => { setSection(false) }}> All Job Section </button>
                    <br />
                    <br />
                    {section ? <div className="update-section">
                        <form onSubmit={submithandler} className='p-3 border '>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="jobTitle" className="form-label">Job Title</label>
                                    <input type="text" className="form-control" value={jobTitle} onChange={(e) => { setJobtitle(e.target.value) }} id="jobTitle" />
                                </div>

                                <div className="col">
                                    <label htmlFor="Category" className="form-label">Category</label>
                                    <select className="form-select  mb-3" value={category} onChange={(e) => { setCategory(e.target.value) }} aria-label="Large select example" id="Category">
                                        <option defaultValue="Open this select menu">Open this select menu</option>
                                        <option value="UI-UX">UI-UX</option>
                                        <option value="Development">Development</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Other">Other</option>
                                    </select>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="yearsOfExperience" className="form-label"> Experience </label>
                                    <input type="number" className="form-control" value={yearsOfExperience} onChange={(e) => { setYearsOfExperience(e.target.value) }} id="yearsOfExperience" />
                                </div>

                                <div className="col">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" value={location} onChange={(e) => { setLocation(e.target.value) }} id="location" />
                                </div>


                            </div>
                            <hr />
                            <div className="input-group">
                                <span className="input-group-text">Description</span>
                                <textarea className="form-control" id="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} aria-label="Description"></textarea>
                            </div>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="responsibilities" className="form-label">Responsibilities</label>
                                <textarea className="form-control" id="responsibilities" value={responsibilities} onChange={(e) => { setResponsibilities(e.target.value) }} >/</textarea>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="jobStatus" className="form-label">jobStatus</label>
                                    <select className="form-select form-select-lg mb-3" value={jobStatus} onChange={(e) => { setJobStatus(e.target.value) }} aria-label="Large select example" id="jobStatus">
                                        <option defaultValue="Open this select menu">Open this select menu</option>
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>


                                <div className="col">
                                    <label htmlFor="jobType" className="form-label">JobType</label>
                                    <select className="form-select form-select-lg mb-3" value={jobType} onChange={(e) => { setJobType(e.target.value) }} aria-label="Large select example" id="jobType">
                                        <option defaultValue="Open this select menu">Open this select menu</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="On-site">On-site</option>
                                        <option value="WFH">WFH</option>
                                    </select>
                                </div>
                            </div>
                            <input type="submit" id="jobsubmit" className="btn btn-primary" value={`${isUpdateJob.isupdate ? "Update" : "Submit"}`} />

                        </form>
                    </div> :
                        <div className="AllJobs-section">
                            <table className="table table-striped" style={{ width: "calc(100vw - 330px)", marginTop: "5px", overflow: "auto", padding: "20px" }} >
                                <thead>
                                    <tr>
                                        <th scope="col" >S.NO</th>
                                        <th scope="col" >Job Title</th>
                                        <th scope="col" >Category </th>
                                        <th scope="col" >Experience</th>
                                        <th scope="col" >JobType </th>
                                        <th scope="col" >JobStatus </th>
                                        <th scope="col" >JobCreated Date </th>
                                        <th scope="col" >JobUpdated Date </th>
                                        <th scope="col" >Delete </th>
                                        <th scope="col" >Edit  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs && jobs.map((v, i) => {
                                        return <tr key={i}   >
                                            <td>{jobs.length - i}</td>
                                            <td>{v.jobTitle}</td>
                                            <td>{v.category} </td>
                                            <td>{v.yearsOfExperience}</td>
                                            <td>{v.jobType} </td>
                                            <td>{v.jobStatus}</td>
                                            <td>{v.createdAt.split("T")[0]}</td>
                                            <td>{v.updatedAt.split("T")[0]}</td>
                                            <td> <button className="btn" onClick={() => { deleted(v._id) }}><img src="/assets/imgs/delete.svg"></img></button> </td>
                                            <td><button className="btn" onClick={() => { updatejob({ id: v._id, data: v }) }}> <img src="/assets/imgs/edit.svg"></img></button></td>
                                        </tr>

                                    }).reverse()}
                                </tbody>
                            </table>
                        </div>}
                </div>
            </div >
        </>
    )
}
