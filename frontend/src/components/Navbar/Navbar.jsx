import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");

    if (token && storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);

    if (link === "home") {
      navigate("/home");
    } else if (link === "countries") {
      navigate("/countries");
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "signin") {
      navigate("/login");
    } else if (button === "signup") {
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const getInitial = () => {
    return userEmail && userEmail.length > 0 ? userEmail[0].toUpperCase() : "?";
  };

  return (
    <nav className="bg-white shadow-lg mt-2 mb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center">
              <h1 className="text-3xl text-green-700 font-extrabold items-center justify-center">
                GlobalSnapshot
              </h1>
            </div>

            {isLoggedIn && (
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <a
                  href="#"
                  className={`px-4 py-2 text-base font-medium ${
                    activeLink === "home"
                      ? "text-green-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("home");
                  }}
                >
                  Home
                </a>
                <a
                  href="#"
                  className={`px-3 py-2 text-base font-medium ${
                    activeLink === "countries"
                      ? "text-green-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("countries");
                  }}
                >
                  Countries
                </a>
              </div>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer"
                  title={userEmail}
                  onClick={toggleDropdown}
                >
                  {getInitial()}
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 truncate">
                      {userEmail}
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm  text-gray-700 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className={`px-2 py-1 text-lg  font-medium rounded-md ${
                    activeButton === "signin"
                      ? "text-white bg-green-600 hover:bg-green-700"
                      : "text-black hover:text-gray-900"
                  }`}
                  onClick={() => handleButtonClick("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`px-2 py-1 text-lg font-medium rounded-md ${
                    activeButton === "signup"
                      ? "text-white bg-green-600 hover:bg-green-700"
                      : "text-black hover:text-gray-900"
                  }`}
                  onClick={() => handleButtonClick("signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            {isLoggedIn && (
              <div className="mr-2">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  {getInitial()}
                </div>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          {isLoggedIn && (
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className={`block px-3 py-2 text-base font-medium ${
                  activeLink === "home"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("home");
                }}
              >
                Home
              </a>
              <a
                href="#"
                className={`block px-3 py-2 text-base font-medium ${
                  activeLink === "countries"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("countries");
                }}
              >
                Countries
              </a>
            </div>
          )}

          <div className="pt-4 pb-3">
            {isLoggedIn ? (
              <div className="px-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      {getInitial()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 truncate max-w-[200px]">
                      {userEmail}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <button
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeButton === "signin"
                        ? "text-white bg-green-600 hover:bg-green-700"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("signin")}
                  >
                    Sign In
                  </button>
                </div>
                <div className="ml-3">
                  <button
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeButton === "signup"
                        ? "text-white bg-green-600 hover:bg-green-700"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
