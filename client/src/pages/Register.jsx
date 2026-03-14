import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const Register = () => {
  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    category: "",
    village: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setMessage({ type: "error", text: "Please enter an email address." });
      return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsOtpSent(true);
        setMessage({ type: "success", text: "OTP sent to your email!" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to send OTP" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage({ type: "error", text: "Please enter the OTP." });
      return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Registration verified and successful!" });
        console.log("Register Data:", { role, ...formData });
        // Optional: redirect to login
      } else {
        setMessage({ type: "error", text: data.message || "Invalid OTP" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-green-50 px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Register on CivicEye
            </h1>
            <p className="mt-2 text-slate-600">
              Create account as User or Helper
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setRole("user")}
              className={`rounded-2xl py-3 font-semibold ${
                role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Register as User
            </button>

            <button
              onClick={() => setRole("helper")}
              className={`rounded-2xl py-3 font-semibold ${
                role === "helper"
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Register as Helper
            </button>
          </div>

          {message.text && (
            <div className={`mt-4 p-3 rounded-xl text-center font-semibold text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={isOtpSent ? handleVerifyAndRegister : handleSendOtp} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid sm:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
              />
            </div>

            {role === "helper" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="road-worker">Road Worker</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="technician">Technician</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Village / Area
                  </label>
                  <input
                    type="text"
                    name="village"
                    placeholder="Enter village or area"
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
                  />
                </div>
              </>
            )}

            {isOtpSent && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-blue-500"
                />
              </div>
            )}

            {!isOtpSent ? (
               <div>
                  <Button
                    type="submit"
                    text={loading ? "Sending..." : "Send OTP"}
                    className={`w-full text-white text-lg py-4 rounded-2xl mb-2 ${
                      role === "user" ? "bg-blue-600" : "bg-green-600"
                    } ${loading ? 'opacity-70' : ''}`}
                    disabled={loading}
                  />
                  <p className="text-xs text-slate-500 text-center">We will send a one-time password (OTP) to your email to verify your address.</p>
               </div>
            ) : (
                <Button
                  type="submit"
                  text={loading ? "Verifying..." : (role === "user" ? "Verify & Register User" : "Verify & Register Helper")}
                  className={`w-full text-white text-lg py-4 rounded-2xl ${
                    role === "user" ? "bg-blue-600" : "bg-green-600"
                  } ${loading ? 'opacity-70' : ''}`}
                  disabled={loading}
                />
            )}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Register;