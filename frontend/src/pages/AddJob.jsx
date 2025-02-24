import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backImg from "../assets/HRbg1.jpg";
import { AuthContext } from "../Context/AuthContext"; 

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    companyAddress: "",
    salaryMinRange: "",
    salaryMaxRange: "",
    experinceYear: "",
    jobDescription: "",
    email: "",
    jobType: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName) newErrors.companyName = "Company Name is required.";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required.";
        if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job Description is required.";
    } else if (formData.jobDescription.length < 3) {
      newErrors.jobDescription = "Job Description must be at least 3 characters";
    }
    if (!formData.companyAddress) newErrors.companyAddress = "Company Address is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.jobType) newErrors.jobType = "Job Type is required.";
    if (!formData.jobDescription) newErrors.jobDescription = "Job Description is required.";
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job Description is required.";
    } else if (formData.jobDescription.length < 3) {
      newErrors.jobDescription = "Job Description must be at least 3 characters";
    }
    if (!formData.salaryMinRange) newErrors.salaryMinRange = "Min Salary is required.";
    if (!formData.salaryMaxRange) newErrors.salaryMaxRange = "Max Salary is required.";
    if (parseFloat(formData.salaryMinRange) >= parseFloat(formData.salaryMaxRange)) {
      newErrors.salaryRange = "Max Salary must be greater than Min Salary.";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; 
    }

    if (!user) {
      alert("You must be logged in to post a job!");
      navigate("/login");
      return;
    }

    try {
      const jobData = { ...formData, userId: user.id }; 
      await axios.post("http://localhost:5000/api/job/create", jobData);
      alert("Job created successfully!");
      navigate("/job");
    } catch (err) {
      alert(err.response?.data?.msg || "Job creation failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
          backgroundImage: `url(${backImg})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          padding: '6rem', 
        }}>
  
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-200">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.companyName}
              required
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>
          <div>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.jobTitle}
              required
            />
            {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
          </div>
          <div>
            <input
              type="text"
              name="companyAddress"
              placeholder="Company Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.companyAddress}
              required
            />
            {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Contact Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.email}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.city}
              required
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <select
              name="jobType"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.jobType}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full-Time</option>
              <option value="Part Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
          </div>
          <div>
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              onChange={handleChange}
              value={formData.jobDescription}
              required
            ></textarea>
            {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="salaryMinRange"
                placeholder="Min Salary (USD)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleChange}
                value={formData.salaryMinRange}
                required
              />
              {errors.salaryMinRange && <p className="text-red-500 text-sm">{errors.salaryMinRange}</p>}
            </div>
            <div>
              <input
                type="number"
                name="salaryMaxRange"
                placeholder="Max Salary (USD)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleChange}
                value={formData.salaryMaxRange}
                required
              />
              {errors.salaryMaxRange && <p className="text-red-500 text-sm">{errors.salaryMaxRange}</p>}
              {errors.salaryRange && <p className="text-red-500 text-sm">{errors.salaryRange}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
