import {
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  MapPin,
  Package,
  Search,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";

const TrackParcel = () => {
  const [parcelId, setParcelId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock tracking service for demonstration
  const trackParcel = async (id) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!id || id.length < 5) {
      throw new Error("Invalid parcel ID");
    }

    // Mock data - replace with actual API call
    return {
      id: id,
      status: "In Transit",
      currentLocation: "Dhaka Sorting Center",
      pickupAddress: "House 12, Road 5, Dhanmondi, Dhaka",
      deliveryAddress: "Flat 3B, Block C, Gulshan-2, Dhaka",
      senderName: "John Doe",
      senderPhone: "+880 1712-345678",
      recipientName: "Jane Smith",
      recipientPhone: "+880 1987-654321",
      estimatedDelivery: "2025-07-05T14:30:00Z",
      weight: "2.5 kg",
      serviceType: "Express Delivery",
      trackingHistory: [
        {
          status: "Order Placed",
          date: "2025-07-01T10:00:00Z",
          location: "Dhaka",
          description: "Parcel booking confirmed",
        },
        {
          status: "Picked Up",
          date: "2025-07-01T14:30:00Z",
          location: "Dhanmondi",
          description: "Parcel collected from sender",
        },
        {
          status: "In Transit",
          date: "2025-07-02T08:00:00Z",
          location: "Dhaka Sorting Center",
          description: "Parcel processed at sorting facility",
        },
        {
          status: "Out for Delivery",
          date: "2025-07-03T09:00:00Z",
          location: "Gulshan Hub",
          description: "Parcel is out for delivery",
        },
      ],
    };
  };

  const handleTrackParcel = async () => {
    if (!parcelId.trim()) {
      setError("Please enter a parcel ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingInfo(null);

    try {
      const data = await trackParcel(parcelId);
      setTrackingInfo(data);
    } catch (error) {
      setError(error.message || "Error tracking parcel");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTrackParcel();
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "in transit":
        return "text-blue-600 bg-blue-100";
      case "out for delivery":
        return "text-orange-600 bg-orange-100";
      case "picked up":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "in transit":
        return <Truck className="w-5 h-5" />;
      case "out for delivery":
        return <Package className="w-5 h-5" />;
      case "picked up":
        return <MapPin className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            Track Your Parcel
          </h1>
        </div>
        <p className="text-gray-600">
          Enter your parcel ID to get real-time tracking information
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter Parcel ID (e.g., CP123456789)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={parcelId}
              onChange={(e) => setParcelId(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            onClick={handleTrackParcel}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Track Parcel
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </div>

      {/* Tracking Information */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Parcel Status
              </h3>
              <span className="text-sm text-gray-500">
                ID: {trackingInfo.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    trackingInfo.status
                  )}`}
                >
                  {getStatusIcon(trackingInfo.status)}
                  <span className="ml-2">{trackingInfo.status}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Current Location: {trackingInfo.currentLocation}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>
                    Est. Delivery:{" "}
                    {new Date(
                      trackingInfo.estimatedDelivery
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Service Type:</span>{" "}
                  {trackingInfo.serviceType}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Weight:</span>{" "}
                  {trackingInfo.weight}
                </div>
              </div>
            </div>
          </div>

          {/* Sender & Recipient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Sender Information
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-600">{trackingInfo.senderName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{trackingInfo.senderPhone}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">{trackingInfo.pickupAddress}</p>
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-green-600" />
                Recipient Information
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-600">{trackingInfo.recipientName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{trackingInfo.recipientPhone}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">
                    {trackingInfo.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Tracking History
            </h4>

            <div className="space-y-4">
              {trackingInfo.trackingHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 relative"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2 relative z-10"></div>

                  {/* Timeline line */}
                  {index !== trackingInfo.trackingHistory.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-16 bg-gray-300 -ml-px"></div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-800">
                        {item.status}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-GB")}{" "}
                        {new Date(item.date).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Need Help?
            </h4>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Download Receipt
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
