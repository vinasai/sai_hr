import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaTiktok, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInbox, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
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
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-50 py-10 sm:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have any questions? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
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
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
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

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-indigo-600" size={20} />
                <p className="text-gray-700"><strong>Phone:</strong> +971567986455 / +971505911348</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-indigo-600" size={20} />
                <p className="text-gray-700">
                  <strong>Email: </strong> 
                  <a href="mailto:fzcsai@gmail.com" className="text-indigo-600 hover:underline">
                    fzcsai@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-indigo-600" size={20} />
                <p className="text-gray-700"><strong>Address:</strong> #206 AI Arif Shipping Building, AI Garhoud Road, Port Saeed, Dubai.</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaInbox className="text-indigo-600" size={20} />
                <p className="text-gray-700"><strong>P.O.Box:</strong> 97698</p>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex justify-center mt-4">
                <a
                  href="https://wa.me/971567986455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  <FaWhatsapp size={24} className="mr-2" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex justify-center space-x-6">
                <a href="https://www.facebook.com/share/19ue79c5Bm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaFacebook size={32} />
                </a>
                <a href="https://www.instagram.com/fzcsai?igsh=aGVjZDZyNXl6NG5l" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <FaInstagram size={32} />
                </a>
                <a href="https://www.tiktok.com/@fzcsai?_t=ZM-8uJyMoJ9sKk&_r=1" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                  <FaTiktok size={32} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
