import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">About Us</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            We are a platform that connects employers with job seekers, helping you find the perfect job and the right talent.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white shadow-md p-8 rounded-xl text-gray-800 transition duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-lg">
              Our mission is to provide a user-friendly platform where job seekers can explore job opportunities and apply easily, while employers can find the best candidates to grow their businesses.
            </p>
          </div>
          <div className="bg-white shadow-md p-8 rounded-xl text-gray-800 transition duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-lg">
              We envision a world where everyone can find meaningful work, and businesses can thrive by hiring the right talent.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-gray-900">Our Values</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Integrity in everything we do",
              "Innovation in connecting job seekers and employers",
              "Commitment to diversity and inclusion",
              "Continuous improvement to meet the needs of our users",
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg"
              >
                <p className="text-lg font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
