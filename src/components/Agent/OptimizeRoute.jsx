import { useState } from "react";
import { useParcelService } from "../../services/useParcelService";
// Import useParcelService

const OptimizedRoute = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");
  const { getOptimizedRoute } = useParcelService(); // Destructure the function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getOptimizedRoute(origin, destination); // API call to get optimized route
      setRoute(data);
      setError(""); // Clear previous error
    } catch (error) {
      setError("Failed to fetch optimized route");
      setRoute(null); // Clear previous route if any
    }
  };

  return (
    <div>
      <h2>Get Optimized Delivery Route</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Route</button>
      </form>

      {error && <p>{error}</p>}
      {route && (
        <div>
          <h3>Optimized Route:</h3>
          <p>Distance: {route.legs[0].distance.text}</p>
          <p>Duration: {route.legs[0].duration.text}</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedRoute;
