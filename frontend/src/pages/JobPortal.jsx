import React, { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase, Building } from "lucide-react";
import backImg from "../assets/bg.png"

const JobPortal = () => {
  const [companies, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showJobs, setShowJobs] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [selectedJob, setSelectedJob] = useState(null); 

  useEffect(() => {
    // fetchCompanies();
    fetchJobCount();
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await axios.get("https://saifzc.com/api/job/get");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const viewJob = async () => {
    try {
      const response = await axios.get("https://saifzc.com/api/job/get");
      setJobs(response.data);
      setShowJobs(response.data.length > 0);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchJobCount = async () => {
    try {
      const response = await axios.get("https://saifzc.com/api/job/count");
      setTotalJobs(response.data.totalJobs);
    } catch (error) {
      console.error("Error fetching job count:", error);
    }
  };

  // const fetchCompanies = async () => {
  //   try {
  //     const response = await axios.get("https://saifzc.com/api/auth/get");
  //     setCompany(response.data);
  //   } catch (error) {
  //     console.error("Error fetching companies:", error);
  //   }
  // };

  const filteredJobs = jobs.filter((job) => {
    const title = (job.jobTitle || "").toLowerCase();
    const location = (job.city || "").toLowerCase();
    return (
      title.includes(searchQuery.toLowerCase()) &&
      location.includes(locationQuery.toLowerCase())
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (indexOfLastJob < filteredJobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


// return (
//   <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12">
//     <div className="bg-gray-100 flex flex-col lg:flex-row items-center pt-10 max-w-screen-lg mx-auto">

//       <div className="w-full lg:w-1/2 text-center lg:text-left px-4 pt-14">
//         <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
//           Find a job that suits
//         </h2>
//         <h2 className="text-3xl sm:text-4xl font-bold text-black">
//           Your interest & Skills.
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm sm:text-base">
//         A platform connecting job seekers with employers...
//         </p>
//       </div>


//       <div
//         className="w-full lg:w-1/2 h-60 sm:h-72 lg:h-96 bg-cover bg-center bg-no-repeat rounded-lg"
//         style={{
//           backgroundImage: `url(${backImg})`,
//           backgroundSize: "contain",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       ></div>
//     </div>

//     {/* Search Inputs */}
//     <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-screen-md mx-auto">
//       {/* <input
//         type="text"
//         placeholder="Job Title, keyword"
//         className="border p-2 rounded-lg w-full sm:w-1/3"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       /> */}
//       <select
//         className="border p-2 rounded-lg w-full sm:w-1/4"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       >
//         <option value="">Choose Job</option>
//         {[...new Set(jobs.map((job) => job.jobTitle))].map((jobTitle, index) => (
//           <option key={index} value={jobTitle}>
//             {jobTitle}
//           </option>
//         ))}
//       </select>
//       <select
//         className="border p-2 rounded-lg w-full sm:w-1/4"
//         value={locationQuery}
//         onChange={(e) => setLocationQuery(e.target.value)}
//       >
//         <option value="">Choose Location</option>
//         {[...new Set(jobs.map((job) => job.city))].map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>
//       <button
//         className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
//         onClick={viewJob}
//       >
//         Find Job
//       </button>
//     </div>

//     <div className="flex flex-wrap justify-center gap-6 mt-8">
//       {/* Companies Card */}
//       {/* <div className="bg-white p-6 shadow-lg rounded-2xl text-center w-40 sm:w-56 transition-transform transform hover:scale-105">
//         <Building size={40} className="text-blue-500 mx-auto mb-2" />
//         <h3 className="text-2xl font-bold text-gray-800">{companies.length - 1}</h3>
//         <p className="text-gray-500">Companies</p>
//       </div> */}

//       {/* Jobs Card */}
//       <div className="bg-white p-6 shadow-lg rounded-2xl text-center w-40 sm:w-56 transition-transform transform hover:scale-105">
//         <Briefcase size={40} className="text-green-500 mx-auto mb-2" />
//         <h3 className="text-2xl font-bold text-gray-800">{totalJobs}</h3>
//         <p className="text-gray-500">New Jobs</p>
//       </div>
//     </div>

//     {/* Job Listings */}
//     {showJobs && (
//       <div className="mt-12 px-4 sm:px-6 max-w-screen-lg mx-auto">
//         {/* Section Title */}
//         <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
//           Job Matches
//         </h2>

//         {/* Job Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {currentJobs.length > 0 ? (
//           [...currentJobs]
//             .reverse()
//             .map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {job.jobTitle}
//                 </h3>
//                 <p className="text-green-600 font-semibold">{job.jobType}</p>
//                 <p className="text-gray-700">
//                   Salary: ${job.salaryMinRange} - ${job.salaryMaxRange}
//                 </p>
//                 <p className="text-gray-600">{job.companyName}</p>
//                 <p className="text-gray-500">{job.city}</p>

//                 {/* View Button */}
//                 <button
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
//                   onClick={() => setSelectedJob(job)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center w-full">No jobs found</p>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-8 gap-4 pb-6">
//           <button
//             className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//             onClick={prevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>

//           {/* Page Number */}
//           <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">
//             {currentPage}
//           </span>

//           <button
//             className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//             onClick={nextPage}
//             disabled={indexOfLastJob >= filteredJobs.length}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     )}

//     {/* Job Details Modal */}
//     {selectedJob && (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4">
//         <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 lg:w-1/2 shadow-lg">
//           {/* Job Title & Company */}
//           <h2 className="text-2xl font-bold text-gray-800">
//             {selectedJob.jobTitle}
//           </h2>
//           <p className="text-lg text-gray-600 font-medium mb-2">
//             {selectedJob.companyName}
//           </p>

//           {/* Salary & Location */}
//           <p className="text-gray-700">
//             💰 <span className="font-semibold">Salary:</span> ${selectedJob.salaryMinRange} - ${selectedJob.salaryMaxRange}
//           </p>
//           <p className="text-gray-700">
//             📍 <span className="font-semibold">Location:</span> {selectedJob.city}
//           </p>

//           {/* Job Description */}
//           <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
//             <h3 className="text-lg font-semibold text-gray-800">
//               📋 Job Description:
//             </h3>
//             <p className="text-gray-700">{selectedJob.jobDescription}</p>
//           </div>

//           {/* Candidate Message */}
//           <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
//             <p className="text-blue-800 font-medium">
//               📢 Interested in this job? Send your resume and details to{" "}
//               <span className="font-bold text-blue-600">{selectedJob.email}</span>.
//             </p>
//             <a
//               href={`mailto:${selectedJob.email}?subject=Job Application for ${selectedJob.jobTitle}`}
//               className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               ✉️ Apply Now
//             </a>
//           </div>

//           {/* Close Button */}
//           <button
//             className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
//             onClick={() => setSelectedJob(null)}
//           >
//             ❌ Close
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );

  
// };
return (
  <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12">
    <div className="bg-gray-100 flex flex-col lg:flex-row items-center pt-10 max-w-screen-lg mx-auto">
      <div className="w-full lg:w-1/2 text-center lg:text-left px-4 pt-14">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          Find a job that suits
        </h2>
        <h2 className="text-3xl sm:text-4xl font-bold text-black">
          Your interest & Skills.
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          A platform connecting job seekers with employers...
        </p>
      </div>

      <div
        className="w-full lg:w-1/2 h-60 sm:h-72 lg:h-96 bg-cover bg-center bg-no-repeat rounded-lg"
        style={{
          backgroundImage: `url(${backImg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>

    {/* Search Inputs */}
    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-screen-md mx-auto">
      <select
        className="border p-2 rounded-lg w-full sm:w-1/4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      >
        <option value="">Choose Job</option>
        {[...new Set(jobs.map((job) => job.jobTitle))].map((jobTitle, index) => (
          <option key={index} value={jobTitle}>
            {jobTitle}
          </option>
        ))}
      </select>
      <select
        className="border p-2 rounded-lg w-full sm:w-1/4"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
      >
        <option value="">Choose Location</option>
        {[...new Set(jobs.map((job) => job.city))].map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
        onClick={viewJob}
      >
        Find Job
      </button>
    </div>

    {/* Job Listings Table */}
    {showJobs && (
      <div className="mt-12 px-4 sm:px-6 max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left mb-4">
          Job Matches
        </h2>

        <div className="overflow-x-auto mt-6">
  <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
    <thead className="bg-gradient-to-r from-gray-700 to-indigo-500 text-white text-sm md:text-base">
      <tr className="">
        <th className="px-6 py-3 text-left text-sm font-semibold">Job Title</th>
        <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
        <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
        <th className="px-6 py-3 text-left text-sm font-semibold">Salary</th>
        <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
      </tr>
    </thead>
    <tbody>
      {currentJobs.length > 0 ? (
        [...currentJobs].reverse().map((job, index) => (
          <tr
            key={job._id}
            className={`border-b ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-blue-100 transition`}
          >
            <td className="px-6 py-4 text-gray-800">{job.jobTitle}</td>
            <td className="px-6 py-4 text-gray-700">Sai FZC</td>
            <td className="px-6 py-4 text-gray-700">{job.city}</td>
            <td className="px-6 py-4 text-gray-700">
              ADE {job.salaryMinRange} - AED {job.salaryMaxRange}
            </td>
            <td className="px-6 py-4 text-center">
              <button
                className="bg-gradient-to-r from-gray-700 to-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedJob(job)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="6"
            className="px-6 py-4 text-center text-gray-500 bg-gray-50"
          >
            No jobs found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4 pb-6">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">
            {currentPage}
          </span>

          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            onClick={nextPage}
            disabled={indexOfLastJob >= filteredJobs.length}
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* Job Details Modal */}
    {selectedJob && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4 pt-25">
    <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 lg:w-1/2 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">
        {selectedJob.jobTitle}
      </h2>
      <p className="text-lg text-gray-600 font-medium mb-2">
        {selectedJob.companyName}
      </p>
      <p className="text-gray-700">
        💰 <span className="font-semibold">Salary:</span> ${selectedJob.salaryMinRange} - ${selectedJob.salaryMaxRange}
      </p>
      <p className="text-gray-700">
        📍 <span className="font-semibold">Location:</span> {selectedJob.city}
      </p>
      <p className="text-gray-700">
        🕒 <span className="font-semibold">Experience:</span> {selectedJob.experienceYear} years
      </p>
      <p className="text-gray-700">
        🎓 <span className="font-semibold">Education:</span> {selectedJob.education || "Not specified"}
      </p>
      <p className="text-gray-700">
        ⏳ <span className="font-semibold">Age Limit:</span> {selectedJob.ageLimitMin} - {selectedJob.ageLimitMax}
      </p>
      <p className="text-gray-700">
        🕰️ <span className="font-semibold">Working Hours:</span> {selectedJob.workingHours || "Not specified"}
      </p>
      <p className="text-gray-700">
        🛠️ <span className="font-semibold">Special Training:</span> {selectedJob.specialTraining === 'Yes' ? "Required" : "Not Required"}
      </p>
      <p className="text-gray-700">
        🚗 <span className="font-semibold">Driving License:</span> {selectedJob.drivingLicence}
      </p>
      <p className="text-gray-700">
        🏠 <span className="font-semibold">Accommodation:</span> {selectedJob.accommodation}
      </p>
      <p className="text-gray-700">
        🚍 <span className="font-semibold">Transportation:</span> {selectedJob.transportation}
      </p>
      <p className="text-gray-700">
        🍽️ <span className="font-semibold">Food:</span> {selectedJob.food}
      </p>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800">
          📋 Job Description:
        </h3>
        <p className="text-gray-700">{selectedJob.jobDescription}</p>
      </div>

      <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
        <a
          href={`mailto:${'fzcsai@gmail.com'}?subject=Job Application for ${selectedJob.jobTitle}`}
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ✉️ Apply Now
        </a>
      </div>

      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
        onClick={() => setSelectedJob(null)}
      >
        ❌ Close
      </button>
    </div>
  </div>
)}

  </div>
);
}

export default JobPortal;
