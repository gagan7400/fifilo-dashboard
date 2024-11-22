import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getHomePage, openHomePage } from '../redux/actions/homeAction';
import { NavLink } from 'react-router-dom';
import { pageAction } from '../redux/actions/pagedataAction';

export default function Dashboard() {
    const [allData, setAllData] = useState([]);
    let alldata = async () => {
        try {
            let { data } = await axios.get('http://localhost:4000/admin/pages/getallpages');
            setAllData(data.data)
        } catch (error) {
            console.error("ll", error);
        }
    }
    useEffect(() => {
        alldata()
    }, [])
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHomePage())
    }, [dispatch])
    return (
        <>
            <Sidebar />
            <div className="main__content">
                <div id="home" className="card__box" style={{ display: "block" }}>
                    <div class="page__editors">
                        <div class="page__title">
                            <h5>Pages</h5>
                        </div>
                    </div>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "40%" }}>Page name</th>
                                    <th scope="col">Created on</th>
                                    <th scope="col">Uploaded on</th>
                                    <th scope="col" style={{ width: "100px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((v, i) => {
                                    return <tr key={i}>
                                        <td>{v.pageName.split("p").join(" P")}</td>
                                        <td>{v.createdAt.split("T")[0] + " " + v.createdAt.split("T")[1].split(".")[0]}</td>
                                        <td>{v.updatedAt.split("T")[0] + " " + v.updatedAt.split("T")[1].split(".")[0]}</td>
                                        <td> <NavLink to={`/pages/${v.pageName.split("p")[0]}`} onClick={() => { dispatch(pageAction({ ...v })) }} className="btn"> <img src="/assets/imgs/edit.svg" alt="Edit icon" /></NavLink> </td>
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
