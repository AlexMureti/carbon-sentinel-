import { useState } from "react";


function ReportForm({ onAddReport }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);

  // Get user's current GPS location
  const getLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toString());
        setLng(pos.coords.longitude.toString());
        setLoading(false);
      },
      (err) => {
        console.error("GPS Error:", err);
        alert("Could not get your location. Please enter it manually.");
        setLoading(false);
      }
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newReport = {
      title,
      description,
      lat: parseFloat(lat) || null,
      lng: parseFloat(lng) || null,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    onAddReport(newReport);
    alert("Report submitted successfully!");

    // Clear form
    setTitle("");
    setDescription("");
    setLat("");
    setLng("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 text-sm"
    >
      <h2 className="text-lg font-semibold text-green-700">Report a Hotspot</h2>

      <input
        type="text"
        placeholder="Title (e.g., Waste Burn)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />

      <textarea
        placeholder="Describe what you see"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded h-24 resize-none"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={getLocation}
          disabled={loading}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Locating..." : "Use My Location"}
        </button>

        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1"
        />

        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1"
        />
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Report
      </button>
    </form>
  );
}

export default ReportForm;
