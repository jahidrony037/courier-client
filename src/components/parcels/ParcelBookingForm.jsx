import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParcelService } from "../../services/useParcelService";

// Function to fetch latitude and longitude from the delivery address using OpenStreetMap
const getCoordinatesFromAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
  );
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0]; // Get the first result's latitude and longitude
    return { latitude: lat, longitude: lon };
  }
  return null; // If no location found
};

const ParcelBookingForm = () => {
  const { createParcelBooking } = useParcelService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [coordinates, setCoordinates] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryAddressError, setDeliveryAddressError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  // Fetch coordinates whenever the delivery address changes
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (deliveryAddress.trim() === "") return;

      setIsValidatingAddress(true);
      const location = await getCoordinatesFromAddress(deliveryAddress);
      if (location) {
        setCoordinates(location);
      } else {
        toast.error("Failed to get location for the delivery address.");
      }
      setIsValidatingAddress(false);
    };

    const debounceTimer = setTimeout(fetchCoordinates, 1000); // Debounce for 1 second
    return () => clearTimeout(debounceTimer);
  }, [deliveryAddress]);

  const handleDeliveryAddressChange = (e) => {
    const value = e.target.value;
    setDeliveryAddress(value);
    setValue("deliveryAddress", value);
    if (value.trim() !== "") {
      setDeliveryAddressError("");
    }
  };

  const onSubmit = async (data) => {
    const { pickupAddress, parcelType, weight } = data;
    const customerId = JSON.parse(localStorage.getItem("user")).id;

    // Manual validation for delivery address
    if (deliveryAddress.trim() === "") {
      setDeliveryAddressError("Delivery address is required");
      return;
    }

    setIsLoading(true);

    try {
      if (!coordinates) {
        toast.error("Address validation failed. Please enter a valid address.");
        setIsLoading(false);
        return;
      }

      const { latitude, longitude } = coordinates;

      const res = await createParcelBooking(
        pickupAddress,
        deliveryAddress,
        parcelType,
        weight,
        customerId,
        latitude,
        longitude
      );

      if (res.success) {
        toast.success("Parcel booked successfully!");
        // Reset form or redirect
      }
    } catch (error) {
      toast.error("Error booking parcel!", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const parcelTypes = [
    "Documents",
    "Electronics",
    "Clothing",
    "Books",
    "Food Items",
    "Fragile Items",
    "Medical Supplies",
    "Others",
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-3xl font-bold text-white mb-2">Book Your Parcel</h2>
        <p className="text-blue-100">
          Fill in the details to schedule your delivery
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        {/* Pickup Address */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📍 Pickup Address
          </label>
          <input
            type="text"
            {...register("pickupAddress", {
              required: "Pickup address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
              errors.pickupAddress
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter your pickup address"
          />
          {errors.pickupAddress && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.pickupAddress.message}
            </p>
          )}
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🏠 Delivery Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={deliveryAddress}
              onChange={handleDeliveryAddressChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                deliveryAddressError
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter delivery address"
            />
            {isValidatingAddress && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
            {coordinates && !isValidatingAddress && (
              <div className="absolute right-3 top-3 text-green-500">✅</div>
            )}
          </div>
          {deliveryAddressError && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {deliveryAddressError}
            </p>
          )}
          {coordinates && (
            <p className="text-green-600 text-sm flex items-center">
              <span className="mr-1">📍</span>
              Location verified successfully
            </p>
          )}
        </div>

        {/* Parcel Type and Weight Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parcel Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📦 Parcel Type
            </label>
            <select
              {...register("parcelType", {
                required: "Parcel type is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.parcelType
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <option value="">Select parcel type</option>
              {parcelTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.parcelType && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.parcelType.message}
              </p>
            )}
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⚖️ Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              {...register("weight", {
                required: "Weight is required",
                min: { value: 0.1, message: "Weight must be at least 0.1 kg" },
                max: { value: 50, message: "Weight cannot exceed 50 kg" },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.weight
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter weight in kg"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            📋 Booking Information
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Pickup will be scheduled within 24 hours</p>
            <p>• Delivery time depends on distance and parcel type</p>
            <p>• You will receive tracking information via SMS/Email</p>
            <p>• Payment can be made on delivery or online</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isValidatingAddress}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
            isLoading || isValidatingAddress
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Booking Parcel...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2">🚚</span>
              Book Parcel Now
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ParcelBookingForm;
