import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const newUrl = "http://localhost:5000/admin/login"; // Use the admin login URL

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setShowLogin(false); // Close the popup on successful login
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <div className="login">
        <form onSubmit={onLogin} className="login-container">
          <div className="login-title">
            <h2>ADMIN LOGIN</h2>
            <img onClick={() => setShowLogin(false)} src={assets.close} alt="" />
          </div>
          <div className="login-inputs">
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Your email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Password"
              required
            />
          </div>
          <button style={{backgroundColor:'#23395d'}} className="loginbut" type="submit">Login</button>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
