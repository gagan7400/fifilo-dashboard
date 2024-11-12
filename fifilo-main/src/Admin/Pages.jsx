import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';

import './adminstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { getHomePage, openHomePage } from '../redux/actions/homeAction';
import { NavLink } from 'react-router-dom';
import { pageAction } from '../redux/actions/pagedataAction';

export default function Dashboard() {
    const [allData, setAllData] = useState([]);
    let alldata = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/admin/pages/getallpages');
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
            <Sidebar titles="Pages" />
            <div className="main__content">
                <div id="home" class="card__box" style={{ display: "block" }}>
                    <div class="table__block">
                        <table class="table">
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
                                        <td>{v.createdAt.split("T").join(" ")}</td>
                                        <td>{v.updatedAt.split("T").join(" ")}</td>
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
