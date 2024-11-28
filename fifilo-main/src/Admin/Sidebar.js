import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/adminloginaction';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  let dispatch = useDispatch();
  useEffect(() => {
    document.body.style.backgroundColor = "#f0f0f0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="shell">
      <nav className="sidebar">
        <div className="top-bar">
          <div className="logo">
            <img src="assets/imgs/logo.svg" alt="Logo" />
          </div>
          <ul className="nav flex-column">

            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link"  >
                <img src="assets/imgs/dashboard.svg" alt="Dashboard Icon" />Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pages" className="nav-link"  >
                <img src="assets/imgs/task.svg" alt="pages Icon" />Pages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/casestudies" className="nav-link"  >
                <img src="assets/imgs/task.svg" alt="pages Icon" />Case Studies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/job" className="nav-link"  >
                <img src="assets/imgs/project.svg" alt="Jobs Icon" />Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/faq" className="nav-link"  >
                <img src="assets/imgs/task.svg" alt="faq Icon" />Faq
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/faq" className="nav-link"  >
                <img src="assets/imgs/task.svg" alt="faq Icon" />Media Library
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="btm-bar">
          <button className="btn btn-logout" onClick={() => { dispatch(logout()) }}>
            <img src="assets/imgs/logout.svg" alt="faq Icon" />Logout
          </button>
        </div>
      </nav>
      <header className="header">
        <div className="admin-circle">
          <p>M</p>
        </div>
      </header>
    </div>

  )
}
