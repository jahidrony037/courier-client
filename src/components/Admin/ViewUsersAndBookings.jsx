import { useEffect, useState } from "react";
import { useParcelService } from "../../services/useParcelService";

const ViewUsersAndBookings = () => {
  const [users, setUsers] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");

  const { getAllUsers, getAllParcels } = useParcelService(); // Fetch all users and parcels

  useEffect(() => {
    const fetchUsersAndBookings = async () => {
      try {
        // Fetch users and parcels from the backend
        const userData = await getAllUsers(); // Assuming this fetches users (customers & agents)
        const parcelData = await getAllParcels(); // Fetch all parcels

        setUsers(userData); // Set the users data
        setParcels(parcelData); // Set the parcels data
      } catch (error) {
        setError("Failed to fetch users and bookings.", error.message);
      }
    };

    fetchUsersAndBookings();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-900">
        View Users and Bookings
      </h2>
      {error && <div className="text-red-500 mt-4">{error}</div>}{" "}
      {/* Display error message if there's an issue */}
      {/* Users Section */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-700">Users</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Parcel Bookings Section */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-700">Parcel Bookings</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Parcel ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Pickup Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Delivery Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {parcel._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.pickupAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.deliveryAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsersAndBookings;
