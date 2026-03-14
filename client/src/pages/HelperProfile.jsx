import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const HelperProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const helper = location.state || {
    id: 1,
    name: "Ramesh Electrician",
    category: "Electrician",
    distance: 2.5,
    rating: 4.8,
    charge: 250,
    available: true,
    village: "Rampura",
    phone: "9876543210",
    reviews: 24,
    expertise: "Wiring, meter, power faults",
  };

  const handleBook = () => {
    navigate("/booking", { state: helper });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                    👷
                  </div>
                  <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
                    {helper.name}
                  </h1>
                  <p className="mt-2 text-blue-50 text-lg">{helper.category}</p>
                </div>

                <div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      helper.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {helper.available ? "Available Now" : "Currently Busy"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Location</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {helper.village}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Distance</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {helper.distance} km away
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Phone Number</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {helper.phone}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Approximate Charge</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    ₹{helper.charge}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Rating</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    ⭐ {helper.rating}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Reviews</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {helper.reviews} Reviews
                  </h3>
                </div>
              </div>

              <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Service Expertise</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-800">
                  {helper.expertise}
                </h3>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-slate-800">
                  Recent Customer Review
                </h3>
                <p className="mt-2 text-slate-600">
                  “Helpful and quick service. Problem solved on the same day.”
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="w-full rounded-2xl bg-blue-600 text-white py-4 text-lg font-semibold">
                  Contact Helper
                </button>

                <button
                  onClick={handleBook}
                  className="w-full rounded-2xl bg-green-600 text-white py-4 text-lg font-semibold"
                >
                  Book This Helper
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HelperProfile;