import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const JobList = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [popUpMessage, setPopUpMessage] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; 

  const [updatedJob, setUpdatedJob] = useState({
    jobTitle: "",
    experinceYear: "",
    jobDescription: "",
    salaryMinRange: "",
    salaryMaxRange: "",
    city: "",
    overtime: "",
    drivingLicence: "",
    accommodation: "",
    transportation: "",
    food: "",
    specialTraining: "",
    specialSkill: "",
    specialNotes: "",
    ageLimitMin: "",
    ageLimitMax: "",
    education: "",
    experienceYear: "",
    workingHours: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      const fetchJobs = async () => {
        try {
          const endpoint =
            user.role === "admin"
              ? "https://saifzc.com/api/job/get"
              : `https://saifzc.com/api/job/jobs/${user.id}`;
          const res = await axios.get(endpoint);
          setJobs(res.data);
        } catch (error) {
          setError("Error fetching jobs");
        }
      };
      fetchJobs();
    }
  }, [user]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleUpdateClick = (job) => {
    setCurrentJob(job);
    setUpdatedJob({
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      salaryMinRange: job.salaryMinRange,
      salaryMaxRange: job.salaryMaxRange,
      city: job.city || "",
      overtime: job.overtime || "",
      drivingLicence: job.drivingLicence || "",
      accommodation: job.accommodation || "",
      transportation: job.transportation || "",
      food: job.food || "",
      specialTraining: job.specialTraining || "",
      specialSkill: job.specialSkill || "",
      specialNotes: job.specialNotes || "",
      ageLimitMin: job.ageLimitMin || "",
      ageLimitMax: job.ageLimitMax || "",
      education: job.education || "",
      experienceYear: job.experienceYear || "",
      workingHours: job.workingHours || "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!updatedJob.jobTitle) errors.jobTitle = "Job Title is required";
    if (!updatedJob.jobDescription) errors.jobDescription = "Job Description is required";
    if (!updatedJob.salaryMinRange || updatedJob.salaryMinRange <= 0) errors.salaryMinRange = "Minimum Salary is required and must be greater than 0";
    if (!updatedJob.salaryMaxRange || updatedJob.salaryMaxRange <= 0) errors.salaryMaxRange = "Maximum Salary is required and must be greater than 0";
    if (parseFloat(!updatedJob.salaryMinRange) >= parseFloat(!updatedJob.salaryMaxRange)) {
      errors.salaryRange = "Max Salary must be greater than Min Salary.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(
        `https://saifzc.com/api/job/update/${currentJob._id}`,
        updatedJob
      );
      setJobs(
        jobs.map((job) =>
          job._id === currentJob._id ? { ...job, ...updatedJob } : job
        )
      );
      setShowModal(false);
      setPopUpMessage({ type: "success", message: "Job updated successfully!" });
      setTimeout(() => setPopUpMessage(null), 3000);
    } catch (error) {
      setPopUpMessage({ type: "error", message: "Error updating job." });
      setTimeout(() => setPopUpMessage(null), 3000);
    }
  };

  const handleRemoveClick = (jobId) => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await axios.delete(`https://saifzc.com/api/job/delete/${jobToDelete}`);
      setJobs(jobs.filter((job) => job._id !== jobToDelete));
      setPopUpMessage({ type: "success", message: "Job deleted successfully!" });
      setTimeout(() => setPopUpMessage(null), 3000);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting job:", error);
      setTimeout(() => setPopUpMessage(null), 3000);
    }
  };

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="px-4 md:px-16 lg:pl-60 pt-30">
      <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
          {user?.role === "admin" ? "👜 Job List" : "👜 Your Job List"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-700 to-indigo-500 text-white text-sm md:text-base">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left">Job Title</th>
                <th className="px-4 sm:px-6 py-3 text-left">Experience</th>
                <th className="px-4 sm:px-6 py-3 text-left">Salary Range</th>
                <th className="px-4 sm:px-6 py-3 text-left">City</th>
                <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm md:text-base">
              {currentJobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                [...currentJobs].reverse().map((job) => (
                  <tr key={job._id} className="border-b hover:bg-gray-100 transition duration-300">
                    <td className="px-4 sm:px-6 py-3">{job.jobTitle}</td>
                    <td className="px-4 sm:px-6 py-3">{job.jobDescription.slice(0, 10)}...</td>
                    <td className="px-4 sm:px-6 py-3 text-green-600">
                      ADE {job.salaryMinRange} - ADE {job.salaryMaxRange}
                    </td>
                    <td className="px-4 sm:px-6 py-3">{job.city}</td>
                    <td className="px-4 sm:px-6 py-3 flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleUpdateClick(job)}
                        className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs sm:text-sm"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleRemoveClick(job._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p>Are you sure you want to remove this job?</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 pt-30">
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Update Job</h2>
      <form onSubmit={handleUpdateSubmit} className="space-y-4">
        {/* Job Title */}
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={updatedJob.jobTitle}
        />
        {formErrors.jobTitle && <p className="text-red-500 text-sm">{formErrors.jobTitle}</p>}

        {/* Job Description */}
        <textarea
          name="jobDescription"
          placeholder="Job Description"
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          rows="3"
          onChange={handleInputChange}
          value={updatedJob.jobDescription}
        />
        {formErrors.jobDescription && <p className="text-red-500 text-sm">{formErrors.jobDescription}</p>}

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={updatedJob.city}
        />

                {/* eduction */}
                <input
          type="text"
          name="education"
          placeholder="Education"
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={updatedJob.education}
        />



        {/* Salary Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="salaryMinRange"
            placeholder="Min Salary"
            className="input-field border border-gray-300 rounded-md p-2"
            onChange={handleInputChange}
            value={updatedJob.salaryMinRange}
            min="0"
          />
          <input
            type="number"
            name="salaryMaxRange"
            placeholder="Max Salary"
            className="input-field border border-gray-300 rounded-md p-2"
            onChange={handleInputChange}
            value={updatedJob.salaryMaxRange}
            min="0"
          />
        </div>

                        {/* Salary Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="ageLimitMin"
            placeholder="Min Age"
            className="input-field border border-gray-300 rounded-md p-2"
            onChange={handleInputChange}
            value={updatedJob.ageLimitMin}
            min="0"
          />
          <input
            type="number"
            name="ageLimitMax"
            placeholder="Max Age"
            className="input-field border border-gray-300 rounded-md p-2"
            onChange={handleInputChange}
            value={updatedJob.ageLimitMax}
            min="0"
          />

<input
              type="number"
              name="experienceYear"
              placeholder="Experience (Years)"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleInputChange}
              value={updatedJob.experienceYear}
              min="0"
            />
            <input
              type="text"
              name="workingHours"
              placeholder="Working Hours"
              className="input-field border border-gray-300 rounded-md p-2"
              onChange={handleInputChange}
              value={updatedJob.workingHours}
            />
        </div>

        {/* Overtime */}
        <select
          name="overtime"
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={updatedJob.overtime}
        >
          <option value="">Overtime</option>
          <option value="Mandatory">Mandatory</option>
          <option value="Optional">Optional</option>
          <option value="Depends">Depends</option>
        </select>

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
                onChange={handleInputChange}
                value={updatedJob[name]}
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
            onChange={handleInputChange}
            value={updatedJob.specialNotes}
          />

        <div className="flex justify-between gap-4">
          {/* Update Job Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
          >
            Update Job
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>

  );
};

export default JobList;
