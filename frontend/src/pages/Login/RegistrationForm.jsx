import React, { useState } from "react";
import "./RegistrationForm.css";
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
} from "@mui/icons-material";
import axios from "axios";

const RegistrationForm = () => {
  const [action, setAction] = useState("Register Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    govtIdType: "", // Add this to manage govtIdType selection
    govtId: "",
    businessLicense: null,
    gstNumber: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change (for business license)
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      businessLicense: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:5000/admin/register", // Your backend API URL
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert(response.data.message);
        // Reset form or redirect
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      alert("Error registering admin.");
    }
  };

  return (
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
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Email className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Phone className="icon" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Home className="icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <LocationOn className="icon" />
            <input
              type="text"
              name="pincode"
              placeholder="Pin Code"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          {/* Govt ID Type Select */}
          <div className="input">
            <Badge className="icon" />
            <select
              name="govtIdType"
              value={formData.govtIdType}
              onChange={handleChange}
              required
            >
              <option value="">Select Government ID Type</option>
              <option value="pan">PAN</option>
              <option value="aadhaar">Aadhaar</option>
              <option value="drivingLicense">Driving License</option>
            </select>
          </div>

          <div className="input">
            <Badge className="icon" />
            <input
              type="text"
              name="govtId"
              placeholder="Government ID"
              value={formData.govtId}
              onChange={handleChange}
            />
          </div>

          {/* Business License File */}
          <div className="input">
            <Business className="icon" />
            <input
              type="file"
              name="businessLicense"
              onChange={handleFileChange}
            />
          </div>

          <div className="input">
            <Business className="icon" />
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </div>

          <div className="input password">
            <Lock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
          <div className="input password">
            <Lock className="icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>

          <button type="submit" className="submit-button">
            Register Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
