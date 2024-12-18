import React, { useEffect, useContext } from 'react';
import { DarkModeContext } from "../../context/darkModeContext";
import "./AdminSidebar.css";
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  const navigate = useNavigate()

  // Apply dark mode to the body element
//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   }, [darkMode]);

  return (
    <div className="sidebar">
      <div className="top">
        <span className="superadmin" onClick={()=>{navigate('/')}}>SUPER ADMIN</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={()=>{navigate('/')}}> <img className='logo' src={assets.dashboard} alt="dashboard logo" />Dashboard</li>
          <p className="title">SELLERS</p>
          <li > <img className='logo' src={assets.seller} alt="seller logo" /> ApprovedAdmins</li>
          <li onClick={()=>{navigate('/adminrequests')}}> <img className='logo' src={assets.users} alt="users logo" />AdminRequests</li>
          <li onClick={()=>{navigate('/addadmin')}}> <img className='logo' src={assets.dashboard} alt="dashboard logo"/> AddAdmin</li>
          <li> <img className='logo' src={assets.order} alt="order logo" /> Orders</li>
         
        </ul>
      </div>
     
    </div>
  );
};

export default AdminSidebar;
