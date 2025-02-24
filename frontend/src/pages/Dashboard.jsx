import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Briefcase, Building2 } from "lucide-react";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/job/get");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load job data.");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/get");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to load company data.");
    }
  };

  const data = {
    labels: ["Jobs", "Companies"],
    datasets: [
      {
        label: "Count",
        data: [jobs.length, companies.length - 1],
        backgroundColor: ["#10B981", "#3B82F6"],
        borderColor: ["#10B981", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-25 max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">📊 Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-green-500 text-white rounded-full">
            <Briefcase size={32} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Jobs</h3>
            <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-blue-500 text-white rounded-full">
            <Building2 size={32} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Companies</h3>
            <p className="text-2xl font-bold text-gray-900">{companies.length - 1}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-[400px] h-[600px] mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">📈 Job & Company Statistics</h3>
      <div className="w-[250px] h-[400px]">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>


    </div>
  );
};

export default Dashboard;
