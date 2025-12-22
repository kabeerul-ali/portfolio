// src/user/ContactUser.jsx
import React, { useState } from "react";
import axios from "axios";

const ContactUser = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/contact`, formData);
      setSuccessMsg("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setErrorMsg("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Contact Us</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control conxx"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control conxx"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label ">
            Message <span className="text-danger ">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control conxx"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUser;
