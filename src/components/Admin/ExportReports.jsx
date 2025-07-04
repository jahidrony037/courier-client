import jsPDF from "jspdf"; // Import jsPDF for PDF export
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useParcelService } from "../../services/useParcelService";

const ExportReports = () => {
  const { getAllParcels, getAllUsers } = useParcelService(); // Fetch data
  const [parcels, setParcels] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsData = await getAllParcels(); // Fetch parcels data
        const usersData = await getAllUsers(); // Fetch users data
        setParcels(parcelsData);
        setUsers(usersData);
      } catch (error) {
        setError("Failed to fetch data for report.");
      }
    };

    fetchData();
  }, [getAllParcels, getAllUsers]);

  // Function to handle CSV export for parcels
  const handleExportCSV = () => {
    return parcels.map((parcel) => ({
      ParcelID: parcel._id,
      PickupAddress: parcel.pickupAddress,
      DeliveryAddress: parcel.deliveryAddress,
      Status: parcel.status,
      Amount: parcel.amount,
    }));
  };

  // Function to handle PDF export
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Title for the PDF
    doc.text("Parcel Report", 14, 16);

    // Set the font size and color
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Add the data (parcels) to the PDF
    let yPosition = 30; // Start from this vertical position
    parcels.forEach((parcel, index) => {
      const text = `ParcelID: ${parcel._id} | Pickup Address: ${parcel.pickupAddress} | Delivery Address: ${parcel.deliveryAddress} | Status: ${parcel.status} | Amount: ${parcel.amount}`;
      doc.text(text, 14, yPosition);
      yPosition += 10; // Increment vertical position for next line
    });

    // Save the generated PDF
    doc.save("parcels_report.pdf");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Export Reports
      </h2>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error message if there's an issue */}
      <div className="space-x-4">
        {/* Button to export as PDF */}
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Export as PDF
        </button>

        {/* Button to export as CSV */}
        <CSVLink
          data={handleExportCSV()}
          filename={"parcels_report.csv"}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Export as CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default ExportReports;
