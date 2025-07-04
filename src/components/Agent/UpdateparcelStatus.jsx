import { useState } from "react";
import { useParcelService } from "../../services/useParcelService";
 // Import useParcelService

const UpdateParcelStatus = () => {
  const [parcelId, setParcelId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const { updateParcelStatus } = useParcelService(); // Destructure the function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateParcelStatus(parcelId, status); // API call to update parcel status
      setMessage(`Parcel status updated to ${data.status}`);
    } catch (error) {
      setMessage("Failed to update parcel status");
    }
  };

  return (
    <div>
      <h2>Update Parcel Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parcel ID:</label>
          <input
            type="text"
            value={parcelId}
            onChange={(e) => setParcelId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Picked Up">Picked Up</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateParcelStatus;
