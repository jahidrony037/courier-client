import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close the menu and navigate to the selected route
  const handleMenuItemClick = (route) => {
    setMenuOpen(false); // Close the menu when clicking a menu item
    navigate(route); // Navigate to the selected route
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Courier<span className="text-accent">Pro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary transition"
              }
            >
              Home
            </NavLink>
            {user && user.role === "customer" && (
              <NavLink
                to="/book"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary transition"
                }
              >
                Book Parcel
              </NavLink>
            )}
            {user && user.role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary transition"
                }
              >
                Admin Dashboard
              </NavLink>
            )}
            {user && user.role === "agent" && (
              <NavLink
                to="/agent/parcels"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary transition"
                }
              >
                Agent Parcels
              </NavLink>
            )}
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary transition"
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={logout}
                className="ml-2 px-4 py-1 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
              >
                Logout
              </button>
            )}

            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Language Switcher in Mobile Menu (Left) */}
            <LanguageSwitcher />

            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-circle ml-4"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h20M4 16h20"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full h-full bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-xl text-gray-600 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-10 px-4 py-2">
          <NavLink
            to="/"
            onClick={() => handleMenuItemClick("/")}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-gray-600 hover:text-primary transition"
            }
          >
            Home
          </NavLink>
          {user && user.role === "customer" && (
            <NavLink
              to="/book"
              onClick={() => handleMenuItemClick("/book")}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary transition"
              }
            >
              Book Parcel
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => handleMenuItemClick("/admin/dashboard")}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary transition"
              }
            >
              Admin Dashboard
            </NavLink>
          )}
          {user && user.role === "agent" && (
            <NavLink
              to="/agent/parcels"
              onClick={() => handleMenuItemClick("/agent/parcels")}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary transition"
              }
            >
              Agent Parcels
            </NavLink>
          )}
          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => handleMenuItemClick("/login")}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary transition"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => handleMenuItemClick("/register")}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary transition"
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="mt-4 px-4 py-1 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
