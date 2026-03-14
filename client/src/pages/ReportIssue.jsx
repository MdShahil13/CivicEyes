import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ReportIssue = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    image: null,
    address: "",
    latitude: "",
    longitude: "",
  });

  const [locationStatus, setLocationStatus] = useState("Not detected");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }

    setLocationStatus("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Location detected successfully",
        }));
        setLocationStatus("Location detected");
      },
      (error) => {
        console.log(error);
        setLocationStatus("Location permission denied");
        alert("Unable to detect location");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Reported Issue Data:", formData);

    alert("Issue submitted successfully");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Report Local Problem
              </h1>
              <p className="mt-2 text-slate-600">
                Fill simple details and submit your issue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Problem Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                >
                  <option value="">Select problem category</option>
                  <option value="electricity">Electricity Issues</option>
                  <option value="plumbing">Plumbing Issues</option>
                  <option value="road">Road Problems</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="other">Other Issues</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write your problem here"
                  className="w-full h-32 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none"
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  GPS Location
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Allow location so CivicEye can find nearby helpers
                </p>

                <button
                  type="button"
                  onClick={detectLocation}
                  className="mt-4 w-full rounded-2xl bg-blue-600 text-white py-4 font-semibold text-base"
                >
                  Detect My Location
                </button>

                <p className="mt-3 text-sm text-slate-700">
                  Status: <span className="font-medium">{locationStatus}</span>
                </p>

                {formData.latitude && formData.longitude && (
                  <div className="mt-3 text-sm text-slate-600">
                    <p>Latitude: {formData.latitude}</p>
                    <p>Longitude: {formData.longitude}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address / Area (Optional)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Village, road, area"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-green-600 text-white py-4 text-lg font-semibold"
              >
                Submit Issue
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ReportIssue;