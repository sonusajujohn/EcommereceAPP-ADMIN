import React, { useState} from 'react';
import './LoginPopup.css';
import axios from 'axios';
import { assets } from '../../assets/assets';


const LoginPopup = ({ setShowLoginPopup }) => {
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = "http://localhost:5000";
    if (currState === 'Login') {
      newUrl += '/admin/login'; // Use the admin login URL
    } else {
      newUrl += '/admin/register'; // Use the admin registration URL
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setShowLoginPopup(false); // Close the popup on successful login or registration
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLoginPopup(false)} src={assets.close} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === 'Login' ? null : (
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                placeholder="Your name"
                required
              />
            )}

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
          <button type="submit">{currState === 'Sign up' ? 'Create Account' : 'Login'}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {currState === 'Login' ? (
            <p>
              Create a new account?{' '}
              <span
                style={{ color: 'rgb(162, 22, 162)', fontWeight: '500', cursor: 'pointer' }}
                onClick={() => setCurrState('Sign up')}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                style={{ color: 'rgb(162, 22, 162)', fontWeight: '500', cursor: 'pointer' }}
                onClick={() => setCurrState('Login')}
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
