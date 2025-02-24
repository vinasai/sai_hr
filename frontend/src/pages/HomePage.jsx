import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/job.jpg"
import img2 from "../assets/marketing.jpg"
import img3 from "../assets/real.png"
import img4 from "../assets/travel.jpg"

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleClick = (path) => {
    navigate(path); 
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center background-animation"></div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Welcome to My HomePage</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img3} 
                alt="Image 3"
                className="w-400 h-100 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Real Estate </span>
              </div>
            </div>
          </div>

          <div className="group relative cursor-pointer" onClick={() => handleClick('/')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img1} 
                alt="Image 1"
                className="w-400 h-100 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Job Seeker</span>
              </div>
            </div>
          </div>

          <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img2} 
                alt="Image 2"
                className="w-400 h-100 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Marketing Support</span>
              </div>
            </div>
          </div>

          <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img4}
                alt="Image 4"
                className="w-400 h-100 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Travels and Tourisum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
