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
    jobType: "",
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
      jobType: job.jobType || "",
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
    if (!updatedJob.jobType) errors.jobType = "Job Type is required";
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

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-700 to-indigo-500 text-white text-sm md:text-base">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">Job Title</th>
              <th className="px-4 sm:px-6 py-3 text-left">Experience</th>
              <th className="px-4 sm:px-6 py-3 text-left">Salary Range</th>
              <th className="px-4 sm:px-6 py-3 text-left">Job Type</th>
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
                    ${job.salaryMinRange} - ${job.salaryMaxRange}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-green-600">{job.jobType}</td>
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

      {/* Modal Popup */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to remove this company?</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-center">Update Job</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {Object.keys(updatedJob).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  {key === "jobType" ? (
                    <select
                      name="jobType"
                      value={updatedJob.jobType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  ) : (
                    <input
                      type={key.includes("salary") || key.includes("Year") ? "number" : "text"}
                      name={key}
                      value={updatedJob[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
                    />
                  )}
                  {formErrors[key] && <p className="text-red-500 text-sm">{formErrors[key]}</p>}
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
                >
                  Update Job
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

