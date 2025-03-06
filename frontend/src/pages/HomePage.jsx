import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/job.png";
import img3 from "../assets/Artboard 1.png";
import video1 from "../assets/Video 2 Visit.mp4"; 
import video2 from "../assets/Dubai WTC.mp4"; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen bg-gray-200 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center background-animation"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-20">

          {/* Image 1 */}
          <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img3}
                alt="Image 3"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Real Estate</span>
              </div>
            </div>
          </div>


          {/* Video 1 */}
          <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <video
                className="w-full h-80 object-cover"
                autoPlay
                muted
                loop
                controls
              >
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Travels and Tourism</span>
              </div>
            </div>
          </div>

          {/* Video 2 */}
          <div className="group relative cursor-pointer" onClick={() => handleClick('#')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <video
                className="w-full h-80 object-cover"
                autoPlay
                muted
                loop
                controls
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>Marketing Support</span>
              </div>
            </div>
          </div>

          
          {/* Image 2 */}
          <div className="group relative cursor-pointer" onClick={() => handleClick('/job-portal')}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={img1}
                alt="Image 1"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-lg font-semibold opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span>SAI Human Resources</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
