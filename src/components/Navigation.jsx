import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBuilding, FaStar, FaQrcode, FaThLarge, FaUser, FaSignOutAlt, FaCogs, FaTags } from "react-icons/fa";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "/businesses", label: "Businesses", icon: <FaBuilding /> },
  { to: "/reviews", label: "Reviews", icon: <FaStar /> },
  { to: "/survey-qr", label: "Survey & QR", icon: <FaQrcode /> },
  { to: "/widget", label: "Widget", icon: <FaThLarge /> },
  { to: "/categories", label: "Categories", icon: <FaTags /> },
  { to: "/admin", label: "Admin", icon: <FaCogs /> },
  { to: "/profile", label: "Profile", icon: <FaUser /> },
];

const Navigation = ({ onLogout }) => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md h-full w-64 flex flex-col justify-between fixed left-0 top-0 z-40">
      <div>
        <div className="flex items-center px-6 py-5 border-b border-gray-200">
          <FaThLarge className="text-indigo-600 text-2xl mr-2" />
          <span className="text-xl font-bold text-gray-800">FeedbackPro</span>
        </div>
        <ul className="mt-6 space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                  location.pathname === item.to
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-5 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full text-left text-red-600 hover:text-red-800 font-medium"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
