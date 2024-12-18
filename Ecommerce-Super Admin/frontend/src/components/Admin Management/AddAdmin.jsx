import React, { useState } from "react";
import "./AddAdmin.css";
import axios from "axios";
import {
  Person,
  Email,
  Phone,
  Home,
  LocationOn,
  Badge,
  Business,
  Lock,
  Visibility,
  VisibilityOff,
  AttachMoney,
} from "@mui/icons-material";

const RegistrationForm = () => {
  const [action, setAction] = useState("Register Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
    governmentID: "",
    businessLicense: null,
    gstNumber: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAdminData({
      ...adminData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (adminData.password !== adminData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    Object.keys(adminData).forEach((key) => {
      formData.append(key, adminData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setAdminData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        pinCode: "",
        governmentID: "",
        businessLicense: null,
        gstNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error registering admin");
    }
  };

  return (
    <div>
      <div className="container1">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        {action === "Register Admin" && (
          <form className="inputs" onSubmit={handleSubmit}>
            <div className="input">
              <Person className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={adminData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <Email className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={adminData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <Phone className="icon" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={adminData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <Home className="icon" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={adminData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <LocationOn className="icon" />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={adminData.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <Badge className="icon" />
              <input
                type="text"
                name="governmentID"
                placeholder="Government ID"
                value={adminData.governmentID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <Business className="icon" />
              <input
                type="file"
                name="businessLicense"
                placeholder="Business License"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <AttachMoney className="icon" />
              <input
                type="text"
                name="gstNumber"
                placeholder="GST Number"
                value={adminData.gstNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input password">
              <Lock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={adminData.password}
                onChange={handleChange}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <Visibility/> : <VisibilityOff />}
              </span>
            </div>
            <div className="input password">
              <Lock className="icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={adminData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>
            <div className="submit-container">
              <button className="submit" type="submit">
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
