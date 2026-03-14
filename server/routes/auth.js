const express = require("express");
const bcrypt = require("bcryptjs"); // Note: package.json uses bcryptjs, not bcrypt
const sendOTP = require("../utils/mailer");

const router = express.Router();

const signupOtpStore = {}; // temp store for OTPs

// SEND OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store it temporarily with an expiry time (2 minutes)
  signupOtpStore[email] = {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000 
  };

  try {
    // Send email using nodemailer
    sendOTP(email, otp)
      .then(() => console.log(`OTP sent to ${email}`))
      .catch((err) => console.error('OTP send failed for', email, err));

    res.json({ message: "OTP send initiated" });
  } catch {
    res.status(500).json({ message: "OTP sending failed" });
  }
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = signupOtpStore[email];

  if (!record) {
    return res.status(400).json({ message: "OTP expired or not requested" });
  }

  if (record.expiresAt < Date.now()) {
    delete signupOtpStore[email]; // clean up
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp != otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  // OTP verified successfully, clean up
  delete signupOtpStore[email];

  res.json({ message: "OTP verified successfully" });
});

module.exports = router;
