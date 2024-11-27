import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { logout } from '../redux/actions/adminloginaction';
import '../Admin/dashboard.css'
export default function ProtectedRoute({ Component }) {
  let dispatch = useDispatch();
  const isTokenExpired = (token) => {
    if (!token) return true; // If no token, consider it expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTime; // token.exp is in seconds
  };

  // // Usage in your component
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      handleLogout();
    }
  }, [Component]);

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("adminToken");
    dispatch(logout())
    window.location.href = "/admin"; // or use React Router to navigate
    return ""
  };
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div>
      {isAuthenticated ? <>{Component}</> : <Navigate to="/admin" />}
    </div>
  )
}

