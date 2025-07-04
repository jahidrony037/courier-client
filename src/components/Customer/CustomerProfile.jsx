const CustomerProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};

export default CustomerProfile;
