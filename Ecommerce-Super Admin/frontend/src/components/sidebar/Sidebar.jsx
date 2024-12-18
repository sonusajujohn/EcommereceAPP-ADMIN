import React, { useEffect, useContext } from 'react';
import { DarkModeContext } from "../../context/darkModeContext";
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  const navigate = useNavigate()

  // Apply dark mode to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="sidebar">
      <div className="top">
        <span className="superadmin">SUPER ADMIN</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li> <img className='logo' src={assets.dashboard} alt="dashboard logo" />Dashboard</li>
          <p className="title">LISTS</p>
          <li onClick={()=>{navigate('/adminpage')}}> <img className='logo' src={assets.seller} alt="seller logo" /> Sellers</li>
          <li> <img className='logo' src={assets.users} alt="users logo" /> Users</li>
          <li onClick={()=>{navigate('/productlist')}}> <img className='logo' src={assets.dashboard} alt="dashboard logo" /> Products</li>
          <li> <img className='logo' src={assets.order} alt="order logo" /> Orders</li>
          <p className="title">USER</p>
          <li> <img className='logo' src={assets.profile} alt="profile logo" /> Profile</li>
          <li> <img className='logo' src={assets.logout} alt="logout logo" /> Logout</li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
