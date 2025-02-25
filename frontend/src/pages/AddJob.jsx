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
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.jobType) newErrors.jobType = "Job Type is required.";
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
    if (Object.keys(newErrors).length > 0) return;

    if (!user) {
      alert("You must be logged in to post a job!");
      navigate("/login");
      return;
    }
    try {
      const jobData = { ...formData, userId: user.id };
      await axios.post("https://saifzc.com/api/job/create", jobData);
      alert("Job created successfully!");
      navigate("/job");
    } catch (err) {
      alert(err.response?.data?.msg || "Job creation failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-25 px-4 sm:px-8" style={{
      backgroundImage: `url(${backImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}>
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "companyName", placeholder: "Company Name" },
            { name: "jobTitle", placeholder: "Job Title" },
            { name: "companyAddress", placeholder: "Company Address" },
            { name: "email", placeholder: "Contact Email", type: "email" },
            { name: "city", placeholder: "City" },
          ].map(({ name, placeholder, type = "text" }) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleChange}
                value={formData[name]}
                required
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
          <div>
            <select
              name="jobType"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
              value={formData.jobType}
              required
            >
              <option value="">Select Job Type</option>
              {["Full Time", "Part Time", "Freelance", "Internship"].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["salaryMinRange", "salaryMaxRange"].map(name => (
              <div key={name}>
                <input
                  type="number"
                  name={name}
                  placeholder={name === "salaryMinRange" ? "Min Salary (USD)" : "Max Salary (USD)"}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleChange}
                  value={formData[name]}
                  required
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
