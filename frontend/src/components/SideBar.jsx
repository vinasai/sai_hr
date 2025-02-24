import { useState, useContext } from "react";
import { Menu, X, Home, Building, Briefcase, Lock, LogOut } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    return (
    <div className="flex pt-20">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen p-5 w-64 fixed transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between pt-10">
          <h2 className="text-2xl font-bold">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8 space-y-4 p">
          {user?.role !== "company" && (
            <a href="/dashboard" className="flex items-center space-x-2 hover:text-yellow-300">
              <Briefcase size={20} /> <span>Dashboard</span>
            </a>
          )}
          
          {user?.role !== "company" && (
            <a href="/company-list" className="flex items-center space-x-2 hover:text-yellow-300">
              <Building size={20} /> <span>Company</span>
            </a>
          )}

          <a href="/job" className="flex items-center space-x-2 hover:text-yellow-300">
            <Briefcase size={20} /> <span>Jobs</span>
          </a>

          {user?.role !== "admin" && (
            <a href="/addjob" className="flex items-center space-x-2 hover:text-yellow-300">
              <Briefcase size={20} /> <span>Add Job</span>
            </a>
          )}

          <a href="/change-password" className="flex items-center space-x-2 hover:text-yellow-300">
            <Lock size={20} /> <span>Change Password</span>
          </a>
        </nav>

        <div className="mt-auto pt-10">
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-500"
          >
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Hamburger Menu Button for Small Screens */}
      <button
        className="md:hidden p-3 absolute top-4 left-4 bg-gray-900 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
    </div>
  );
}

export default SideBar;
