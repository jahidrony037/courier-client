import { useEffect, useState } from "react";
import { useParcelService } from "../../services/useParcelService";

// Import useParcelService

const AssignedParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const { getUserParcels } = useParcelService(); // Destructure the function from useParcelService

  useEffect(() => {
    const fetchAssignedParcels = async () => {
      try {
        const data = await getUserParcels(); // API call to get assigned parcels
        setParcels(data);
      } catch (error) {
        setError("Failed to fetch assigned parcels");
      }
    };

    fetchAssignedParcels();
  }, []); // Add the function as a dependency

  return (
    <div>
      <h2>Assigned Parcels</h2>
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Parcel ID</th>
            <th>Pickup Address</th>
            <th>Delivery Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel._id}</td>
              <td>{parcel.pickupAddress}</td>
              <td>{parcel.deliveryAddress}</td>
              <td>{parcel.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedParcels;
