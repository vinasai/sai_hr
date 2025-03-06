import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import backImg from "../assets/jobseeker.png"
import Header from "../components/Header";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://saifzc.com/api/auth/login", formData);
      const { token, company } = res.data;
      const userData = { id: company.id, role: company.role, token };
      login(userData);

      if (company.role === "company") {
        navigate("/job");
      } else if(company.role === 'admin') {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };


  return (
    <>
<div className="flex items-center lg:pl-150 justify-center min-h-screen " style={{
  backgroundImage: `url(${backImg})`,
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  backgroundRepeat: 'no-repeat' 
}}
>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-500">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
             value={formData.email}  
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password} 
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
