import { createBrowserRouter } from "react-router-dom";
import AssignAgentToParcel from "../components/Admin/AssignAgentToParcel";
import ExportReports from "../components/Admin/ExportReports";
import ViewUsersAndBookings from "../components/Admin/ViewUsersAndBookings";
import AgentDashboardWelcome from "../components/Agent/AgentDashboardWelcome";
import AssignedParcels from "../components/Agent/AssignedParcel";
import OptimizedRoute from "../components/Agent/OptimizeRoute";
import UpdateParcelStatus from "../components/Agent/UpdateparcelStatus";
import CustomerDashboard from "../components/Customer/CustomerDashboard";
import CustomerProfile from "../components/Customer/CustomerProfile";
import DashboardWelcome from "../components/Customer/DashboardWelcome";
import NotFound from "../components/NotFound/NotFound";
import BookingHistory from "../components/parcels/BookingHistory";
import ParcelBookingForm from "../components/parcels/ParcelBookingForm";
import ParcelManagement from "../components/parcels/ParcelManagment";
import TrackParcel from "../components/parcels/TrackParcel";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MainLayout from "../MainLayout/MainLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // Admin Dashboard with nested routes
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "assign-agent",
            element: <AssignAgentToParcel />,
          },
          {
            path: "view-users",
            element: <ViewUsersAndBookings />,
          },
          {
            path: "export-reports",
            element: <ExportReports />,
          },
        ],
      },
      // Agent Dashboard
      {
        path: "/agent/dashboard",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentDashboard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <AgentDashboardWelcome /> },
          { path: "assigned-parcels", element: <AssignedParcels /> },
          { path: "update-status", element: <UpdateParcelStatus /> },
          { path: "optimized-route", element: <OptimizedRoute /> },
        ],
      },
      // Customer Dashboard
      {
        path: "/customer/dashboard",
        element: (
          <PrivateRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardWelcome /> },
          { path: "profile", element: <CustomerProfile /> },
          { path: "book-parcel", element: <ParcelBookingForm /> },
          { path: "booking-history", element: <BookingHistory /> },
          { path: "track-parcel", element: <TrackParcel /> },
        ],
      },
      // Parcel Management
      {
        path: "/admin/parcel-management",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ParcelManagement />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
