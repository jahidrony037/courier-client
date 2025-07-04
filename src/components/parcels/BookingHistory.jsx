import { useEffect, useState } from "react";
import { useParcelService } from "../../services/useParcelService";
import RealTimeTracking from "./RealTimeTracking";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const { getUserParcels } = useParcelService();

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        setLoading(true);
        const data = await getUserParcels();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching booking history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleTrackParcel = (parcel) => {
    setSelectedParcel(parcel);
    setShowTracking(true);
  };

  const handleCloseTracking = () => {
    setShowTracking(false);
    setSelectedParcel(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in_transit":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "⏳";
      case "in_transit":
        return "🚚";
      case "delivered":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your booking history...</p>
        </div>
      </div>
    );
  }

  if (showTracking && selectedParcel) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Real-Time Tracking
            </h2>
            <p className="text-gray-600">
              Track your parcel: {selectedParcel._id}
            </p>
          </div>
          <button
            onClick={handleCloseTracking}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to History
          </button>
        </div>

        {/* Parcel Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Parcel Details
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Parcel ID:</span>{" "}
                  {selectedParcel._id}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {selectedParcel.parcelType}
                </p>
                <p>
                  <span className="font-medium">Weight:</span>{" "}
                  {selectedParcel.weight} kg
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedParcel.status
                    )}`}
                  >
                    {getStatusIcon(selectedParcel.status)}{" "}
                    {selectedParcel.status}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Addresses
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {selectedParcel.pickupAddress}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {selectedParcel.deliveryAddress}
                </p>
                <p>
                  <span className="font-medium">Booked:</span>{" "}
                  {formatDate(selectedParcel.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Tracking Component */}
        <RealTimeTracking
          parcelLocation={{
            lat: selectedParcel.latitude,
            lng: selectedParcel.longitude,
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg px-8 py-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Parcel History
        </h2>
        <p className="text-blue-100">
          Track and manage all your parcel bookings
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Parcels</p>
              <p className="text-2xl font-bold text-gray-800">
                {history.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  history.filter((p) => p.status?.toLowerCase() === "delivered")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🚚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  history.filter(
                    (p) => p.status?.toLowerCase() === "in_transit"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  history.filter((p) => p.status?.toLowerCase() === "pending")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Parcels List */}
      {history.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Bookings Found
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't made any parcel bookings yet.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Book Your First Parcel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">
                        {getStatusIcon(parcel.status)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Parcel #{parcel._id?.slice(-8)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(parcel.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-medium text-gray-800 truncate">
                          {parcel.pickupAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-medium text-gray-800 truncate">
                          {parcel.deliveryAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type & Weight</p>
                        <p className="font-medium text-gray-800">
                          {parcel.parcelType} • {parcel.weight}kg
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3 mt-4 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        parcel.status
                      )}`}
                    >
                      {getStatusIcon(parcel.status)} {parcel.status}
                    </span>

                    <button
                      onClick={() => handleTrackParcel(parcel)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span className="mr-2">📍</span>
                      Track Parcel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
