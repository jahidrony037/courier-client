import { useEffect, useState } from "react";
import { useParcelService } from "../../services/useParcelService";

const AgentDashboardWelcome = () => {
  const [assignedParcelsCount, setAssignedParcelsCount] = useState(0);
  const [message, setMessage] = useState("");
  const { getUserParcels } = useParcelService(); // Use the hook to fetch assigned parcels

  useEffect(() => {
    const fetchAssignedParcels = async () => {
      try {
        const parcels = await getUserParcels();
        setAssignedParcelsCount(parcels.length); // Set the assigned parcels count
      } catch (error) {
        setMessage("Error fetching assigned parcels.", error.message);
      }
    };

    fetchAssignedParcels(); // Fetch assigned parcels when the component mounts
  }, [getUserParcels]);

  return (
    <div>
      <h2>Welcome to the Agent Dashboard</h2>
      <p>Here’s a quick overview of your workload:</p>
      <div className="stats-summary">
        <div>
          <h3>Assigned Parcels</h3>
          <p>
            You have <strong>{assignedParcelsCount}</strong> parcels assigned to
            you.
          </p>
        </div>
        <div>
          <h3>Pending Updates</h3>
          <p>0 parcels need to be updated. Keep up the good work!</p>{" "}
          {/* Dynamically update this as needed */}
        </div>
      </div>
      {message && <div className="error-message">{message}</div>}{" "}
      {/* Error handling */}
    </div>
  );
};

export default AgentDashboardWelcome;
