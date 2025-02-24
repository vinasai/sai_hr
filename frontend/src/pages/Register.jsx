import React, { useState } from "react";
import axios from "axios";
import backImg from "../assets/HRbg1.jpg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Company name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("https://saifzc.com/api/auth/register", formData);
      alert(res.data.msg);
      setFormData({ name: "", email: "", password: "", phone: "" });
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.msg || "Error registering company");
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen" style={{
  backgroundImage: `url(${backImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '8rem',
  padding:'2rem'
}}>
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-lg sm:max-w-md w-full">
    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">Company Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter company name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.name ? "border-red-500" : "focus:ring-blue-400"}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.email ? "border-red-500" : "focus:ring-blue-400"}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.password ? "border-red-500" : "focus:ring-blue-400"}`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.phone ? "border-red-500" : "focus:ring-blue-400"}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Register
      </button>
    </form>
    <p className="mt-4 text-sm text-gray-600 text-center">
      Already have an account?{" "}
      <a href="/login" className="text-blue-500 hover:underline">
        Login
      </a>
    </p>
  </div>
</div>


  );
}
