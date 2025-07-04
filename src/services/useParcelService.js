import useAxiosSecure from "../hooks/useAxiosSecure";

export const useParcelService = () => {
  const axiosSecure = useAxiosSecure();

  // Function to fetch coordinates from OpenStreetMap (or any other geocoding API)
  const getCoordinatesFromAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0]; // Get the first result's latitude and longitude
      return { latitude: lat, longitude: lon };
    }
    return null; // Return null if no location is found
  };

  // Updated Parcel Booking with geocoding
  const createParcelBooking = async (pickupAddress, deliveryAddress, parcelType, weight, customerId) => {
    try {
      // Fetch latitude and longitude for delivery address
      const location = await getCoordinatesFromAddress(deliveryAddress);
      
      if (!location) {
        throw new Error("Failed to get location for the delivery address.");
      }

      const { latitude, longitude } = location; // Destructure the latitude and longitude

      // Send parcel booking data to the backend including latitude and longitude
      const res = await axiosSecure.post('/parcel/book', {
        pickupAddress,
        deliveryAddress,
        parcelType,
        weight,
        customerId,
        latitude,  // Pass latitude
        longitude, // Pass longitude
      });

      return res.data; // Return response data (success or error)
    } catch (error) {
      console.error("Error booking parcel:", error);
      throw new Error(error.message || "Error booking parcel.");
    }
  };

  const trackParcel = async (parcelId) => {
    console.log('Tracking parcel with ID:', parcelId);
    const res = await axiosSecure.get(`/parcel/track/${parcelId}`);
    return res.data;
  };

  const getBookingHistory = async () => {
    try {
      const res = await axiosSecure.get('/parcel/history');  // No need to pass customerId
      return res.data;  // Return booking history
    } catch (error) {
      console.error('Error fetching booking history:', error);
      throw error;  // Handle the error properly
    }
  };

  const updateParcelStatus = async (parcelId, status) => {
    const res = await axiosSecure.put('/parcel/update-status', {
      parcelId,
      status,
    });
    return res.data;
  };

  const cancelParcel = async (parcelId) => {
    const res = await axiosSecure.put('/parcel/cancel', {
      parcelId,
    });
    return res.data;
  };

  const getAllParcels = async () => {
    const res = await axiosSecure.get('/parcel/parcels');
    return res.data;
  };

  const getUserParcels = async () => {
    const res = await axiosSecure.get('/parcel/user-parcels');  // Hit the new route
    return res.data;
  };

    const getAllUsers = async () => {
    try {
      const res = await axiosSecure.get('/admin/users'); // Admin route to get all users
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch users.", error.message);
    }
  };

  // Function to fetch all parcels (bookings)
  const getAllAdminParcels = async () => {
    try {
      const res = await axiosSecure.get('/admin/parcels'); // Admin route to get all parcels
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch parcels.", error);
    }
  };

  // Function to assign agent to a parcel
  const assignAgentToParcel = async (parcelId, agentId) => {
    try {
      const res = await axiosSecure.put('/admin/assign-agent', {
        parcelId,
        agentId,
      });
      return res.data;
    } catch (error) {
      throw new Error("Failed to assign agent to parcel.",error.message);
    }
  };

  // Function to export reports (e.g., parcels data)
  const exportReports = async (type = 'csv') => {
    try {
      const res = await axiosSecure.get(`/admin/export-reports/${type}`);
      return res.data;
    } catch (error) {
      throw new Error("Failed to export reports.", error.message);
    }
  };

  // Function to get daily metrics (bookings, failed deliveries, COD amounts)
  const getDashboardMetrics = async () => {
    try {
      const res = await axiosSecure.get('/admin/dashboard-metrics');
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch dashboard metrics.",  error.message);
    }
  };

  return {
    createParcelBooking,
    trackParcel,
    updateParcelStatus,
    cancelParcel,
    getAllParcels,
    getBookingHistory,
    getUserParcels,
    getAllUsers,
    getAllAdminParcels,
    assignAgentToParcel,
    exportReports,
    getDashboardMetrics,
  };
};
