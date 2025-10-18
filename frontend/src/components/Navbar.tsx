import { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeLogo from "../assets/home_logo.png"
import { useUserContext } from "../context/UserContext";

const Navbar: FC = () => {
  const {user, logout} = useUserContext();
  const navigate = useNavigate();

  // Simulate login/logout
  const handleLogout = () => {
    logout();
    
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-300 text-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex left-0 space-x-6">
            <Link to="/">
                <img src={homeLogo} alt="Home Logo" className="w-10 h-10 mix-blend-multiply" />
            </Link>
            <a href="/" className="flex items-center space-x-2 hover:text-gray-200">
                <span className="font-semibold text-lg">Home</span>
            </a>

            <a href="/search" className="flex items-center space-x-2 hover:text-gray-200">
                <span>Search</span>
            </a>

          {/* Role-based navigation */}
          {user?.role === "admin" && (
            <>
                <a href="/agent" className="flex items-center space-x-2 hover:text-gray-200">Create</a>
                <a href="/admin" className="flex items-center space-x-2 hover:text-gray-200">Admin</a>
            </>
          )}
          {user?.role === "landlord" && (
            <a href="/agent" className="flex items-center space-x-2 hover:text-gray-200">Create</a>
          )}
          {user?.role === "tenant" && (
            <a href="/tenant" className="flex items-center space-x-2 hover:text-gray-200">My Rentals</a>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-medium">👋 {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100">
                Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;