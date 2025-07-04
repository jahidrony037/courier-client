const DashboardWelcome = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Your Dashboard!
      </h1>
      <p className="text-gray-600 mb-6">
        Use the sidebar to navigate through your account features:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Customer Profile</h3>
          <p className="text-blue-600 text-sm">
            Manage your personal information and settings
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Book Parcel</h3>
          <p className="text-green-600 text-sm">
            Create new parcel delivery bookings
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">
            Booking History
          </h3>
          <p className="text-purple-600 text-sm">
            View your past parcel bookings
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Track Parcel</h3>
          <p className="text-orange-600 text-sm">
            Track your current deliveries
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
