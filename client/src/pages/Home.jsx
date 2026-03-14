import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CategoryGrid from "../components/home/CategoryGrid";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold">Welcome to CivicEye</h1>
            <p className="mt-3 text-base sm:text-lg text-blue-50">
              Solve local problems with nearby helpers
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                to="/report"
                className="bg-white text-blue-700 font-semibold text-center py-4 rounded-2xl"
              >
                Report Problem
              </Link>

              <Link
                to="/helpers"
                className="bg-white text-green-700 font-semibold text-center py-4 rounded-2xl"
              >
                Find Helpers
              </Link>

              <Link
                to="/rating"
                className="bg-white text-slate-700 font-semibold text-center py-4 rounded-2xl"
              >
                Give Rating
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Choose Problem Category
            </h2>
            <p className="mt-2 text-slate-600">
              Select the type of issue you want to report
            </p>
          </div>

          <div className="mt-6">
            <CategoryGrid />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="text-3xl">📍</div>
              <h3 className="mt-3 text-xl font-bold text-slate-800">
                Nearby Helpers
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                See helpers near your location within 5 km and 10 km.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="text-3xl">📷</div>
              <h3 className="mt-3 text-xl font-bold text-slate-800">
                Upload Issue Image
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Add a photo of the issue to help helpers understand quickly.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="text-3xl">⭐</div>
              <h3 className="mt-3 text-xl font-bold text-slate-800">
                Trusted Ratings
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Check ratings before booking a helper.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              How CivicEye Works
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-blue-700">1</div>
                <p className="mt-2 font-semibold text-slate-800">
                  Choose Problem
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-green-700">2</div>
                <p className="mt-2 font-semibold text-slate-800">
                  Submit Issue
                </p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-yellow-700">3</div>
                <p className="mt-2 font-semibold text-slate-800">
                  Get Nearby Help
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

export default Home;