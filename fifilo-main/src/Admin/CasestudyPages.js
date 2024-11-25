import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { pageAction } from '../redux/actions/pagedataAction';

export default function CasestudyPages() {
    let dispatch = useDispatch();
    const [allData, setAllData] = useState([]);
    let alldata = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/admin/casestudy/getcasestudy');
            if (data.success) {
                setAllData(data.data)
            } else {
                alert("error occured");
            }
        } catch (error) {
            alert("error Occured")
        }
    }
    useEffect(() => {
        alldata()
    }, [])

    let deleteCaseStudy = async (id) => {
        if (window.confirm("Are You Want To Delete This")) {
            try {
                let { data } = await axios.delete('http://localhost:5000/admin/casestudy/deletecasestudy/' + id);
                if (data.success) {
                    alldata()
                } else {
                    alert("not deleted occured");
                }
            } catch (error) {
                alert( error);
            }
        }
    }
    return (
        <>
            <Sidebar />
            <div className="main__content">
                <div id="home" className="card__box" style={{ display: "block" }}>
                    <div className="page__editors">
                        <div className="page__title">
                            <h5>Pages</h5>
                            <NavLink to="/pages/casestudy/newcasestudy" className="btn btn__update">
                                <img src="/assets/imgs/plusyellow.svg" alt="" />
                                Create a New CaseStudy
                            </NavLink>
                        </div>
                    </div>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "20%" }}>Page name</th>
                                    <th scope="col">Created on</th>
                                    <th scope="col">Uploaded on</th>
                                    <th scope="col" colSpan={2} style={{ width: "200px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((v, i) => {
                                    return <tr key={i}>
                                        <td>{v.heroSection.casestudyName}</td>
                                        <td>{v.createdAt}</td>
                                        <td>{v.updatedAt}</td>
                                        <td> <NavLink to={`/pages/casestudy/${v.heroSection.casestudyName.split(" ").join("-")}`} onClick={() => { dispatch(pageAction({ ...v })) }} className="btn"> <img src="/assets/imgs/edit.svg" alt="Edit icon" /></NavLink> </td>
                                        <td> <button className='btn' onClick={() => { deleteCaseStudy(v._id) }}> <img src="/assets/imgs/trash.svg" alt="Edit icon" /> </button> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ >
    )
}
