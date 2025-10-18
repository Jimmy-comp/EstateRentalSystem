import { type FC } from "react";
import { Link } from "react-router-dom";
import homeLogo from "../assets/home_logo.png"
import { useUserContext } from "../context/UserContext";

const Navbar: FC = () => {
  const {user, logout} = useUserContext();

  // Simulate login/logout
  const handleLogout = () => {
    logout();
    alert("You are logged out.")
    window.location.replace("/");
  };

  return (
    <nav className="w-full bg-gray-300 shadow-md text-blue-600">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-5">
            {/* Home / Logo */}
            <Link to="/">
                <img src={homeLogo} alt="Home Logo" className="w-10 h-10" />
            </Link>

            {/* Link */}
            <ul className="flex items-center space-x-5 text-lg">
                <li>
                    <Link to="/" className="font-semibold text-xl hover:text-gray-900">Home</Link>
                </li>
                <li>
                    <Link to="/search" className="hover:text-gray-900">Search</Link>
                </li>

                {/* Role-based navigation */}
                {user?.role === "admin" && (
                    <>
                        <li>
                            <Link to="/create" className="hover:text-gray-900">Create</Link>
                            <Link to="/admin" className="hover:text-gray-900">Admin</Link>
                        </li>
                    </>
                )}
                {user?.role === "landlord" && (
                    <li>
                        <Link to="/create" className="hover:text-gray-900">Create</Link>
                    </li>
                )}
                {user?.role === "tenant" && (
                    <li>
                        <Link to="/MyRental" className="hover:text-gray-900">MyRental</Link>
                    </li>
                )}
            </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-lg">
          {user ? (
            <>
              <span className="font-medium">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white px-4 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white px-4 py-1 rounded hover:bg-gray-100">
                Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;