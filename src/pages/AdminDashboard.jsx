import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useParcelService } from "../services/useParcelService";

const AdminDashboard = () => {
  const [dailyBookings, setDailyBookings] = useState(0);
  const [failedDeliveries, setFailedDeliveries] = useState(0);
  const [codAmount, setCodAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { getAllParcels } = useParcelService();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true);
        const parcels = await getAllParcels();
        setDailyBookings(
          parcels.filter((parcel) => isToday(parcel.bookingDate)).length
        );
        setFailedDeliveries(
          parcels.filter((parcel) => parcel.status === "Failed").length
        );
        setCodAmount(
          parcels
            .filter((parcel) => parcel.paymentType === "COD")
            .reduce((total, parcel) => total + parcel.amount, 0)
        );
      } catch (error) {
        setMessage("Error fetching dashboard metrics: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  const isToday = (date) => {
    const today = new Date();
    const parcelDate = new Date(date);
    return today.toDateString() === parcelDate.toDateString();
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard Overview",
      icon: "🏠",
      exact: true,
    },
    {
      path: "/admin/dashboard/assign-agent",
      label: "Assign Agent to Parcels",
      icon: "📦",
    },
    {
      path: "/admin/dashboard/view-users",
      label: "View Users and Bookings",
      icon: "👥",
    },
    {
      path: "/admin/dashboard/export-reports",
      label: "Export Reports",
      icon: "📑",
    },
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-blue-100">
          Manage your parcel delivery system efficiently with comprehensive
          tools and insights.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Daily Bookings
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "..." : dailyBookings}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Parcels booked today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Failed Deliveries
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "..." : failedDeliveries}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <span className="text-2xl">❌</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Requires attention</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total COD Amount
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "..." : `$${codAmount.toFixed(2)}`}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Cash on delivery</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/dashboard/assign-agent"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl mr-3">📦</span>
            <div>
              <p className="font-medium text-gray-900">Assign Agents</p>
              <p className="text-sm text-gray-600">
                Assign delivery agents to parcels
              </p>
            </div>
          </Link>
          <Link
            to="/admin/dashboard/view-users"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="font-medium text-gray-900">View Users</p>
              <p className="text-sm text-gray-600">Manage users and bookings</p>
            </div>
          </Link>
          <Link
            to="/admin/dashboard/export-reports"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl mr-3">📑</span>
            <div>
              <p className="font-medium text-gray-900">Export Reports</p>
              <p className="text-sm text-gray-600">Generate CSV/PDF reports</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {message && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <span className="text-red-400 mr-2">⚠️</span>
            <p className="text-red-700">{message}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-xl fixed top-16 left-0 h-full z-40 border-r border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Admin Portal
                </h2>
                <p className="text-sm text-gray-500">System Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute(item.path, item.exact)
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-80">
          <div className="p-6 mt-16">
            {location.pathname === "/admin/dashboard" ? (
              <DashboardOverview />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
