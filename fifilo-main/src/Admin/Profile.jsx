import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/adminloginaction';
import Sidebar from './Sidebar';

export default function Profile() {
    let dispatch = useDispatch();
    let logoutfun = () => {
        dispatch(logout());

    }
    return (

        <>
            <Sidebar titles="Profile" />
            <div className="main__content">
                <div className="card" style={{ width: '18rem', margin: '20px auto' }}>
                    <img src='/logo.png' className="card-img-top" alt="Profile" />
                    <div className="card-body text-center">
                        <h5 className="card-title">{"name"}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{"title"}</h6>
                        <p className="card-text">Director of the Team</p>
                        <button className='btn btn-danger d-block m-auto' onClick={logoutfun}>logout</button>
                    </div>
                </div>

            </div>
        </>
    )
}

