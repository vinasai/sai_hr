import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backImg from "../assets/jobseeker.png";
import { AuthContext } from "../Context/AuthContext";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    salaryMinRange: "",
    salaryMaxRange: "",
    experienceYear: "",
    city: "",
    ageLimitMin: "",
    ageLimitMax: "",
    workingHours: "",
    overtime: "",
    education: "",
    drivingLicence: "",
    accommodation: "",
    transportation: "",
    food: "",
    specialTraining: "",
    specialSkill: "",
    specialNotes: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required.";
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job Description is required.";
    } else if (formData.jobDescription.length < 3) {
      newErrors.jobDescription = "Job Description must be at least 3 characters.";
    }
    if (!formData.city) newErrors.city = "City is required.";
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
    <div
      className="flex items-center justify-center min-h-screen px-4 sm:px-8 bg-cover bg-center pt-25"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Job Title */}
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
            value={formData.jobTitle}
            required
          />
          {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
  
          {/* Job Description */}
          <textarea
            name="jobDescription"
            placeholder="Job Description"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            rows="3"
            onChange={handleChange}
            value={formData.jobDescription}
            required
          />
          {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
  
          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
            value={formData.city}
            required
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
  
          <input
            type="text"
            name="education"
            placeholder="Education"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
            value={formData.education}
          />
  
          {/* Salary Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="salaryMinRange"
              placeholder="Min Salary (ADE)"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.salaryMinRange}
              min="0"
              required
            />
              {errors.salaryMinRange && <p className="text-red-500 text-sm">{errors.salaryMinRange}</p>}
              {errors.salaryRange && <p className="text-red-500 text-sm">{errors.salaryRange}</p>}
            <input
              type="number"
              name="salaryMaxRange"
              placeholder="Max Salary (ADE)"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.salaryMaxRange}
              min="0"
              required
            />
             {errors.salaryMaxRange && <p className="text-red-500 text-sm">{errors.salaryMaxRange}</p>}
             {errors.salaryRange && <p className="text-red-500 text-sm">{errors.salaryRange}</p>}
          </div>
  
          {/* Age Limit & Experience */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <input
              type="number"
              name="ageLimitMin"
              placeholder="Min Age"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.ageLimitMin}
              min="0"
            />
            <input
              type="number"
              name="ageLimitMax"
              placeholder="Max Age"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.ageLimitMax}
              min="0"
            />
            <input
              type="number"
              name="experienceYear"
              placeholder="Experience (Years)"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.experienceYear}
              min="0"
            />
            <input
              type="text"
              name="workingHours"
              placeholder="Working Hours"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleChange}
              value={formData.workingHours}
            />
          </div>
  
          {/* Overtime */}
          <select
            name="overtime"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
            value={formData.overtime}
          >
            <option value="">Overtime</option>
            <option value="Mandatory">Mandatory</option>
            <option value="Optional">Optional</option>
            <option value="Depends">Depends</option>
          </select>
  
          {/* Additional Select Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "drivingLicence", label: "Driving Licence", options: ["Required", "Not Required"] },
              { name: "accommodation", label: "Accommodation", options: ["Included", "Not Included"] },
              { name: "transportation", label: "Transportation", options: ["Included", "Not Included"] },
              { name: "food", label: "Food", options: ["Included", "Not Included"] },
              { name: "specialTraining", label: "Special Training", options: ["Yes", "No"] },
              { name: "specialSkill", label: "Special Skill", options: ["Yes", "No"] },
            ].map(({ name, label, options }) => (
              <select
                key={name}
                name={name}
                className="input-field border border-gray-300 rounded-md p-2"
                onChange={handleChange}
                value={formData[name]}
              >
                <option value="">{label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ))}
          </div>
  
          {/* Special Notes */}
          <textarea
            name="specialNotes"
            placeholder="Special Notes"
            className="input-field border border-gray-300 rounded-md p-2 w-full"
            rows="2"
            onChange={handleChange}
            value={formData.specialNotes}
          />
  
          {/* Submit Button */}
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
