import { Link, Outlet, useLocation } from "react-router-dom";

const AgentDashboard = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard Home",
      to: "/agent/dashboard",
      icon: "🏠",
      isActive: location.pathname === "/agent/dashboard",
    },
    {
      name: "Assigned Parcels",
      to: "assigned-parcels",
      icon: "📦",
      isActive: location.pathname.includes("/agent/dashboard/assigned-parcels"),
    },
    {
      name: "Update Parcel Status",
      to: "update-status",
      icon: "📝",
      isActive: location.pathname.includes("/agent/dashboard/update-status"),
    },
    {
      name: "Optimized Route",
      to: "optimized-route",
      icon: "🛣️",
      isActive: location.pathname.includes("/agent/dashboard/optimized-route"),
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side Menu */}
      <div className="w-72 bg-white shadow-lg fixed top-16 left-0 h-full z-40 border-r border-gray-200">
        {/* Dashboard Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Agent Portal</h2>
              <p className="text-sm text-gray-500">
                Manage your assigned parcels
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              return (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={`group flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                      item.isActive
                        ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        item.isActive
                          ? "text-white transform rotate-90"
                          : "text-gray-400 group-hover:text-green-600 group-hover:transform group-hover:translate-x-1"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">System Status</p>
              <p className="text-xs text-green-600">All services active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 ml-72">
        {/* Content Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {menuItems.find((item) => item.isActive)?.name || "Dashboard"}
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back! Here's what's happening with your assigned
                  parcels today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
              <div className="p-6">
                <Outlet /> {/* This will render the selected child route */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
