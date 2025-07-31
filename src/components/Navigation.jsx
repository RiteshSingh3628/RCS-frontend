import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBuilding, FaStar, FaQrcode, FaThLarge, FaUser, FaSignOutAlt, FaCogs, FaTags } from "react-icons/fa";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "/businesses", label: "Business", icon: <FaBuilding /> },
  { to: "/reviews", label: "Reviews", icon: <FaStar /> },
  { to: "/survey-qr", label: "Survey & QR", icon: <FaQrcode /> },
  { to: "/widget", label: "Widget", icon: <FaThLarge /> },
  { to: "/stats", label: "Statistics", icon: <FaCogs /> },
  { to: "/archive", label: "Archive", icon: <FaCogs /> },
  { to: "/profile", label: "Profile", icon: <FaUser /> },
];

const Navigation = ({ onLogout }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sidebar content as a function for reuse
  const sidebarContent = (
    <>
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
                onClick={() => setMobileOpen(false)}
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
          onClick={() => { setMobileOpen(false); onLogout(); }}
          className="flex items-center w-full text-left text-red-600 hover:text-red-800 font-medium"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md border border-gray-200"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar for desktop */}
      <nav className="bg-white shadow-md h-full w-64 flex-col justify-between fixed left-0 top-0 z-40 hidden sm:flex">
        {sidebarContent}
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setMobileOpen(false)}></div>
          {/* Drawer */}
          <nav className="relative bg-white shadow-md h-full w-64 flex flex-col justify-between z-50 animate-slide-in-left">
            {sidebarContent}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
