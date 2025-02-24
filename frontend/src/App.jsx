import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import AddJob from "./pages/AddJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobPortal from './pages/JobPortal';
import CompanyJobList from './pages/CompanyJobList';
import AboutUs from './pages/AboutUs';
import Contact from "./pages/Contact";
import CompanyList from "./pages/CompanyList";
import ChangePassword from "./pages/ChangePassword";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

function ProtectedLayout({ children }) {
  return (
    <div className="flex">
      <SideBar /> 
      <div className="flex-grow">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes - No Sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<JobPortal />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes - With Sidebar */}
          <Route
            path="/addjob"
            element={
              <ProtectedRoute
                element={
                  <ProtectedLayout>
                    <AddJob />
                  </ProtectedLayout>
                }
                allowedRoles={["admin", "company"]}
              />
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute
                element={
                  <ProtectedLayout>
                    <ChangePassword />
                  </ProtectedLayout>
                }
                allowedRoles={["admin", "company"]}
              />
            }
          />
          <Route
            path="/job"
            element={
              <ProtectedRoute
                element={
                  <ProtectedLayout>
                    <CompanyJobList />
                  </ProtectedLayout>
                }
                allowedRoles={["company","admin"]}
              />
            }
          />
                    <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/company-list"
            element={
              <ProtectedRoute
                element={
                  <ProtectedLayout>
                    <CompanyList />
                  </ProtectedLayout>
                }
                allowedRoles={["admin"]}
              />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
