import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Booking = () => {
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
  };

  const [bookingData, setBookingData] = useState({
    address: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setBookingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    console.log("Booking Data:", { helper, ...bookingData });
    alert("Booking request sent successfully");
    navigate("/rating");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold">Confirm Booking</h1>
              <p className="mt-2 text-green-50">
                Check helper details and confirm your service request
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="bg-slate-50 rounded-2xl p-5">
                <h2 className="text-2xl font-bold text-slate-900">{helper.name}</h2>
                <p className="mt-1 text-slate-600">{helper.category}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Distance</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {helper.distance} km
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Rating</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      ⭐ {helper.rating}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Charge</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      ₹{helper.charge}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConfirmBooking} className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={bookingData.address}
                    onChange={handleChange}
                    placeholder="Enter village, road, or house location"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Note for Helper
                  </label>
                  <textarea
                    name="note"
                    value={bookingData.note}
                    onChange={handleChange}
                    placeholder="Example: Please come near the temple road"
                    className="w-full h-32 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                  <p className="text-sm text-slate-700">
                    After booking, the helper can accept or reject your request.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-green-600 text-white py-4 text-lg font-semibold"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Booking;