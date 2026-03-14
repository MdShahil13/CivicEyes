import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      alert("Please select a rating");
      return;
    }

    console.log("Submitted Rating:", {
      rating: selectedRating,
      review,
    });

    alert("Thank you for your feedback!");
    setSelectedRating(0);
    setReview("");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 text-white p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold">Rate the Helper</h1>
              <p className="mt-2 text-yellow-50">
                Share your experience after service completion
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="bg-slate-50 rounded-2xl p-5 text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  How was the service?
                </h2>
                <p className="mt-2 text-slate-600">
                  Tap stars to give your rating
                </p>

                <div className="mt-6 flex justify-center gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      className={`text-4xl sm:text-5xl transition ${
                        star <= selectedRating
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-base font-medium text-slate-700">
                  Selected Rating: {selectedRating} / 5
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Write a Review
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a short review about the helper"
                    className="w-full h-32 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-green-600 text-white py-4 text-lg font-semibold"
                >
                  Submit Rating
                </button>
              </form>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm text-slate-700">
                  Your feedback helps other users choose trusted helpers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Rating;