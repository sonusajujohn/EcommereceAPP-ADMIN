import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import Login from '../Login/Login';  // Import the LoginPopup component

const Welcome = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // State to control the popup visibility

  return (
    <div className="welcome-container">
      <video autoPlay loop muted className="background-video">
        <source src="/853958-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      
      <div className="welcome-content">
        <h1>Welcome to the Admin Portal</h1>
        <div className="card-container">
          <div
            className="card"
            onClick={() => setShowLogin(true)} // Show login popup when clicked
          >
            <h3>Login as Admin</h3>
          </div>
          <div
            className="card"
            onClick={() => { navigate("/registrationform"); }}
          >
            <h3>Register Admin</h3>
          </div>
        </div>
      </div>

      {/* Display the login popup if showLogin is true */}
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </div>
  );
};

export default Welcome;
