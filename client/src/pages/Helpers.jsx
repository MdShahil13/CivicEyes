import React, { useMemo, useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HelperList from "../components/helper/HelperList";

const Helpers = () => {
  const [searchRadius, setSearchRadius] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allHelpers, setAllHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/helpers');
        if (!response.ok) {
          throw new Error('Failed to fetch helpers');
        }
        const data = await response.json();
        
        // Map backend user model to frontend HelperList expected format
        const mappedHelpers = data.map((helper, index) => ({
          id: helper._id,
          name: helper.username,
          category: helper.category || "General Helper",
          // Calculate mock distance since location API is not present yet
          distance: (index % 10) + 1, 
          rating: 4.5,
          charge: 300,
          available: true,
          village: helper.village || "Unknown",
          phone: "Contact via App",
          reviews: Math.floor(Math.random() * 30),
          expertise: "Standard services",
        }));
        
        setAllHelpers(mappedHelpers);
      } catch (err) {
        console.error("Error loading helpers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpers();
  }, []);

  const filteredHelpers = useMemo(() => {
    let helpers = allHelpers.filter((helper) => helper.distance <= searchRadius);

    if (selectedCategory) {
      helpers = helpers.filter(
        (helper) => helper.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return helpers;
  }, [allHelpers, searchRadius, selectedCategory]);

  const handleExpandSearch = () => {
    setSearchRadius(10);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Nearby Helpers
            </h1>
            <p className="mt-2 text-slate-600">
              We first search helpers within <strong>5 km</strong>. If none are
              available, you can expand search to <strong>10 km</strong>.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-600">Current Search Radius</p>
                <p className="text-xl font-bold text-blue-700">{searchRadius} km</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-sm text-slate-600">Helpers Found</p>
                <p className="text-xl font-bold text-green-700">
                  {filteredHelpers.length}
                </p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-4">
                <p className="text-sm text-slate-600">Search Type</p>
                <p className="text-xl font-bold text-yellow-700">
                  {searchRadius === 5 ? "Nearby First" : "Expanded Search"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Road Worker">Road Worker</option>
                <option value="Cleaner">Cleaner</option>
              </select>

              <button
                onClick={() => setSearchRadius(5)}
                className="rounded-2xl bg-blue-600 text-white py-4 font-semibold"
              >
                Search in 5 km
              </button>

              <button
                onClick={handleExpandSearch}
                className="rounded-2xl bg-green-600 text-white py-4 font-semibold"
              >
                Expand to 10 km
              </button>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-slate-500 text-lg">Loading nearby helpers...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            ) : filteredHelpers.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500 text-lg">No helpers found for this category and distance.</p>
              </div>
            ) : (
              <HelperList helpers={filteredHelpers} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Helpers;