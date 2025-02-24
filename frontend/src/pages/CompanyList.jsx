import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyJobs, setSelectedCompanyJobs] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);


  const [showModal, setShowModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("https://saifzc.com/api/auth/get");
        const filteredCompanies = res.data.filter(
          (company) => company.role === "company"
        );
        setCompanies(filteredCompanies);
        setTotalPages(Math.ceil(filteredCompanies.length / companiesPerPage));
      } catch (error) {
        setError("Error fetching companies");
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleViewClick = async (company) => {
    try {
      const res = await axios.get(
        `https://saifzc.com/api/job/jobs/${company._id}`
      );
      setSelectedCompanyJobs(res.data);
      setSelectedCompanyName(company.name);
    } catch (error) {
      setError("Error fetching job details");
      console.error("Error fetching job details:", error);
    }
  };


  const handleRemoveClick = (companyId) => {
    setCompanyToDelete(companyId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;
    try {
      await axios.delete(`https://saifzc.com/api/auth/delete/${companyToDelete}`);
      setCompanies(companies.filter((company) => company._id !== companyToDelete));
      setShowModal(false);
      setCompanyToDelete(null);
    } catch (error) {
      setError("Error deleting company");
      console.error("Error deleting company:", error);
    }
  };


  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 md:px-16 lg:pl-60 pt-30">
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">🏢 List of Companies</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-gray-700 to-indigo-500 text-white">
            <tr>
               <th className="px-6 py-4 text-left">Company Name</th>
               <th className="px-6 py-4 text-left">Email</th>
               <th className="px-6 py-4 text-left">Phone</th>
               <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No companies found.
                </td>
              </tr>
            ) : (
              currentCompanies.map((company) => (
                <tr key={company._id} className="border-b hover:bg-gray-100 transition duration-300">
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">{company.email}</td>
                  <td className="px-6 py-4">{company.phone}</td>
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    <button
                      onClick={() => handleViewClick(company)}
                      className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      View Jobs
                    </button>
                    <button
                      onClick={() => handleRemoveClick(company._id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to remove this company?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
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
    </div>


      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


      {selectedCompanyJobs.length === 0 ? (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-gray-500">No jobs found for this company.</p>
        </div>
      ) : (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Job Listings for {selectedCompanyName}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Job Title</th>
                  <th className="px-6 py-4 text-left">Job Type</th>
                  <th className="px-6 py-4 text-left">Salary Range</th>
                </tr>
              </thead>
              <tbody>
              {[...selectedCompanyJobs]
              .reverse()
              .map((job, index) => (
                  <tr
                    key={job._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-4">{job.jobTitle}</td>
                    <td className="px-6 py-4">{job.jobType}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      ${job.salaryMinRange} - ${job.salaryMaxRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
