import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    Lname: "",
    Address: "",
    PhoneNo: "",
    email: "",
    password: "",
    City: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clickedFields, setClickedFields] = useState({
    fname: false,
    Lname: false,
    Address: false,
    PhoneNo: false,
    email: false,
    password: false,
    City: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/createUser", formData);
      
      if (response.status === 201) { // Expecting status 201 for successful creation
        setSuccess("Registration successful! Redirecting to login...");
        setError(""); // Clear any previous errors
        // Clear form fields after successful registration
        setFormData({ fname: "", Lname: "", Address: "", PhoneNo: "", email: "", password: "", City: "" });
        
        setTimeout(() => {
          navigate("/login"); 
        }, 2000);
      } else {
        setError(response.data.error || "Registration failed. Please try again.");
        setSuccess(""); // Clear any previous success message
      }
    } catch (error) {
      // Handle errors more gracefully
      if (error.response) {
        // Backend responded with an error
        setError(
          error.response.data.errors?.[0]?.msg || // Specific error message
          error.response.data.error || 
          "Error during registration. Please check your details and try again."
        );
      } else {
        // Network or other errors
        setError("Network error. Please try again later.");
      }
      setSuccess(""); // Clear any previous success message
    }
  };

  const handleInputClick = (field) => {
    setClickedFields((prev) => ({
      ...prev,
      [field]: true, // Set the clicked field to true
    }));
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">{clickedFields.fname ? "First Name" : ""}</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            onClick={() => handleInputClick("fname")}
            placeholder={clickedFields.fname ? "" : "First Name"} 
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Lname">{clickedFields.Lname ? "Last Name" : ""}</label>
          <input
            type="text"
            className="form-control"
            id="Lname"
            name="Lname"
            onClick={() => handleInputClick("Lname")}
            placeholder={clickedFields.Lname ? "" : "Last Name"} 
            value={formData.Lname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Address">{clickedFields.Address ? "Address" : ""}</label>
          <input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            onClick={() => handleInputClick("Address")}
            placeholder={clickedFields.Address ? "" : "Address"} 
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="PhoneNo">{clickedFields.PhoneNo ? "Phone Number" : ""}</label>
          <input
            type="number"
            className="form-control"
            id="PhoneNo"
            name="PhoneNo"
            onClick={() => handleInputClick("PhoneNo")}
            placeholder={clickedFields.PhoneNo ? "" : "Phone Number"} 
            value={formData.PhoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">{clickedFields.email ? "Email" : ""}</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onClick={() => handleInputClick("email")}
            placeholder={clickedFields.email ? "" : "Email"} 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">{clickedFields.password ? "Password" : ""}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onClick={() => handleInputClick("password")}
            placeholder={clickedFields.password ? "" : "Password"} 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="City">{clickedFields.City ? "City" : ""}</label>
          <input
            type="text"
            className="form-control"
            id="City"
            name="City"
            onClick={() => handleInputClick("City")}
            placeholder={clickedFields.City ? "" : "City"} 
            value={formData.City}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Register
        </button>
      </form>
      <div className="mt-3">
        <p>
          Already registered? <Link to="/login">Go to Login</Link>
        </p>
      </div>
    </div>

  );
};

export default Register;
