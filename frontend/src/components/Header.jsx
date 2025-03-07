import { useState, useContext } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import logo from "../assets/Sai_logo.jpg"

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-20 h-22">
      <div className="container mx-auto flex items-center justify-between pt-3 pl-10 pr-5">
      <div className="flex items-center space-x-3 cursor-pointer">
      <img 
          src={logo} 
          alt="Job HR Logo" 
          className="object-contain"
          width={70}
          height={70}
        />
          <h1 className="text-3xl font-extrabold tracking-wider hover:text-yellow-300">
            SAI FZC
          </h1>
        </div>

        <nav className="hidden md:flex space-x-8 text-lg">
          <a href="/job-portal" className="hover:text-gray-300 transition duration-300 ease-in-out">
            Home
          </a>
          <a href="about" className="hover:text-gray-300 transition duration-300 ease-in-out">
            About
          </a>
          <a href="contact" className="hover:text-gray-300 transition duration-300 ease-in-out">
            Contact
          </a>

          {user ? (
            <>
            <div className="relative">
              <button
                className="hover:text-gray-300 transition duration-300 ease-in-out flex items-center"
              ><a href="dashboard">Dashboard</a>
              </button>
            </div>
            </>
          ) : (
            <div className="relative">
              <button
                className="hover:text-gray-300 transition duration-300 ease-in-out flex items-center"
              >
               <a href="dashboard">Login</a>
              </button>
            </div>
          )}
        </nav>

        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4 bg-gray-900 rounded-lg shadow-lg">
          <a href="/job-portal" className="hover:text-gray-300 transition duration-300 ease-in-out">
            Home
          </a>
          <a href="/about" className="hover:text-gray-300 transition duration-300 ease-in-out">
            About
          </a>
          <a href="/contact" className="hover:text-gray-300 transition duration-300 ease-in-out">
            Contact
          </a>

          {user ? (
            <>
            <div className="relative">
              <button
                className="hover:text-gray-300 transition duration-300 ease-in-out flex items-center"
              >
                               <a
                    href="/dashboard"
                    className="block hover:text-gray-200 transition duration-300 ease-in-out"
                  >
                    Dashboard
                  </a>
              </button>
            </div>
            </>
          ) : (
            <div className="relative">
              <button
                className="hover:text-gray-300 transition duration-300 ease-in-out flex items-center"
              >
               <a
                    href="/login"
                    className="block hover:text-gray-200 transition duration-300 ease-in-out"
                  >
                    Login
                  </a>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
