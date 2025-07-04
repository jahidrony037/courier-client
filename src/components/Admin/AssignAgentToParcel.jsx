import { useEffect, useState } from "react";
import { useParcelService } from "../../services/useParcelService";

const AssignAgentToParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedParcel, setSelectedParcel] = useState("");

  const { getAllParcels } = useParcelService(); // Fetch all parcels
  const { getAllUsers } = useParcelService(); // Assuming a service to get all users

  useEffect(() => {
    const fetchParcelsAndAgents = async () => {
      const parcelData = await getAllParcels(); // Fetch parcels
      const agentData = await getAllUsers(); // Fetch users and filter by agent role
      setParcels(parcelData);
      setAgents(agentData.filter((user) => user.role === "agent"));
    };

    fetchParcelsAndAgents();
  }, [getAllParcels, getAllUsers]);

  const handleAssignAgent = () => {
    if (selectedParcel && selectedAgent) {
      // Here, you would call an API to assign the agent to the parcel
      // For now, we log the action.
      console.log(
        `Assigning Agent ${selectedAgent} to Parcel ${selectedParcel}`
      );
    }
  };

  return (
    <div>
      <h2>Assign Agent to Parcel</h2>
      <div>
        <label>Parcel:</label>
        <select onChange={(e) => setSelectedParcel(e.target.value)}>
          {parcels.map((parcel) => (
            <option key={parcel._id} value={parcel._id}>
              {parcel.pickupAddress} → {parcel.deliveryAddress}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Agent:</label>
        <select onChange={(e) => setSelectedAgent(e.target.value)}>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignAgent}>Assign Agent</button>
    </div>
  );
};

export default AssignAgentToParcel;
