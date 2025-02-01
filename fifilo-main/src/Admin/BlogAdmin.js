import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function Blog() {
  let dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  let alldata = async () => {
    try {
      let { data } = await axios.get('http://localhost:5000/admin/blogs/getblogs');
      if (data.success) {
        setAllData(data.data);
        setLoading(false)
      } else {
        alert("error occured");
        setLoading(false)
      }
    } catch (error) {
      alert("error Occured")
      setLoading(false)
    }
  }
  useEffect(() => {
    alldata()
  }, [])

  let deleteCaseStudy = async (id) => {
    if (window.confirm("Are You Want To Delete This")) {
      try {
        let { data } = await axios.delete('http://localhost:5000/admin/blogs/deleteblog/' + id,);
        if (data.success) {
          alldata()
        } else {
          alert("not deleted occured");
        }
      } catch (error) {
        alert(error);
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
              <h5>Blogs</h5>
              <NavLink to="/blogadmin/newblog" className="btn btn__update">
                <img src="/assets/imgs/plusyellow.svg" alt="" />
                Create Blog
              </NavLink>
            </div>
          </div>
          <div className="table__block">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" >Blog name</th>
                  <th scope="col">Created on</th>
                  <th scope="col">Updated on</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((v, i) => {
                  return <tr key={i}>
                    <td>{v.blogTitle.split("").slice(0, 30).join("")}</td>
                    <td>{v.createdAt && new Date(v.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric', hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                    }</td>
                    <td>{v.updatedAt && new Date(v.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric', hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                    }</td>
                    <td style={{ display: "flex", gap: "16px" }}> <NavLink to={`/blogadmin/${v.blogUrl}`} className="btn"> <img src="/assets/imgs/edit.svg" alt="Edit icon" /></NavLink>
                      <button className='btn' onClick={() => { deleteCaseStudy(v._id) }}> <img src="/assets/imgs/trash.svg" alt="Edit icon" /> </button> </td>
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
