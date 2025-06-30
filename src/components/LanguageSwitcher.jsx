import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");
  const dropdownRef = useRef(null); // Reference for the dropdown container

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Switcher Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center text-gray-600 hover:text-primary"
      >
        {currentLanguage === "en" ? "English" : "বাংলা"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ml-2 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 w-40 mt-2 bg-white shadow-md rounded-md z-50">
          <div
            onClick={() => changeLanguage("en")}
            className={`block px-4 py-2 hover:bg-gray-200 cursor-pointer ${
              currentLanguage === "en"
                ? "text-primary bg-primary/10"
                : "text-gray-800"
            }`}
          >
            English
          </div>
          <div
            onClick={() => changeLanguage("bn")}
            className={`block px-4 py-2 hover:bg-gray-200 cursor-pointer ${
              currentLanguage === "bn"
                ? "text-primary bg-primary/10"
                : "text-gray-800"
            }`}
          >
            বাংলা
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
