import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInbox } from 'react-icons/fa'; // Added address and postbox icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://saifzc.com/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-50 py-10 sm:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="pt-15 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have any questions? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Contact Details</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <FaPhone className="mr-2 text-indigo-600" size={20} />
                <strong className='p-2'>Phone:</strong> +971567986455 / +971505911348
              </p>
              <p className="flex items-center text-gray-600">
                <FaEnvelope className="mr-2 text-indigo-600 gap" size={20} />
                <strong className='p-2'>Email:</strong> fzcai@gmail.com
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-indigo-600" size={20} />
                <strong className='p-2'>Address:</strong> <p className='pt-6'>#206 AI Arif Shipping Building, AI Garhoud Road, Port Saeed, Dubai.</p>
              </p>
              <p className="flex items-center text-gray-600">
                <FaInbox className="mr-2 text-indigo-600" size={20} />
                <strong className='p-2'>P.O.Box:</strong> 97698
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-4 flex justify-center space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={32} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                <FaInstagram size={32} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
