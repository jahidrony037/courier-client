// src/components/ParcelManagement.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParcelService } from "../../services/useParcelService";

const ParcelManagement = () => {
  const { getAllParcels, updateParcelStatus } = useParcelService();
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const data = await getAllParcels(); // Assuming this fetches all parcels
        setParcels(data);
      } catch (error) {
        toast.error("Error fetching parcels!", error.message);
      }
    };

    fetchParcels();
  }, []);

  const handleStatusChange = async (parcelId, newStatus) => {
    try {
      await updateParcelStatus(parcelId, newStatus);
      toast.success(`Parcel status updated to ${newStatus}!`);
      setParcels(
        parcels.map((parcel) =>
          parcel._id === parcelId ? { ...parcel, status: newStatus } : parcel
        )
      );
    } catch (error) {
      toast.error("Error updating parcel status!", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Parcel Management</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Parcel ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel._id}</td>
              <td>{parcel.status}</td>
              <td>
                <button
                  onClick={() => handleStatusChange(parcel._id, "In Transit")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  In Transit
                </button>
                <button
                  onClick={() => handleStatusChange(parcel._id, "Delivered")}
                  className="text-green-500 hover:text-green-700 ml-2"
                >
                  Delivered
                </button>
                <button
                  onClick={() => handleStatusChange(parcel._id, "Failed")}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Failed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelManagement;
