import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

const Landing = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              CivicEye
            </h1>
            <p className="mt-3 text-xl text-green-700 font-medium">
              Solve Local Problems with Nearby Helpers
            </p>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-7">
              Report electricity, plumbing, road, cleaning, and other local
              problems easily. Find nearby helpers quickly with a simple and
              trusted platform.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white text-center py-4 rounded-xl font-semibold text-lg"
              >
                Login as User
              </Link>

              <Link
                to="/register"
                className="bg-green-600 text-white text-center py-4 rounded-xl font-semibold text-lg"
              >
                Register as Helper
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-100 rounded-2xl p-5 text-center text-lg font-semibold">
                ⚡ Electricity
              </div>
              <div className="bg-sky-100 rounded-2xl p-5 text-center text-lg font-semibold">
                🚰 Plumbing
              </div>
              <div className="bg-orange-100 rounded-2xl p-5 text-center text-lg font-semibold">
                🛣️ Road
              </div>
              <div className="bg-green-100 rounded-2xl p-5 text-center text-lg font-semibold">
                🧹 Cleaning
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;