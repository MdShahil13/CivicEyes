const express = require("express");
const bcrypt = require("bcryptjs"); // Note: package.json uses bcryptjs, not bcrypt
const sendOTP = require("../utils/mailer");
const User = require("../models/user");

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
    // Send email using nodemailer and wait for the async result
    await sendOTP(email, otp);
    console.log(`OTP sent to ${email}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error('OTP send failed for', email, err);
    res.status(500).json({ message: "OTP sending failed", error: err.message });
  }
});

// VERIFY OTP + REGISTER USER
router.post("/verify-otp", async (req, res) => {
  const { email, otp, fullName, password, role = "user", category, village } = req.body;

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

  // Ensure required registration data is present
  if (!fullName || !password) {
    return res.status(400).json({ message: "Full name and password are required for registration" });
  }

  if (role === "helper" && !category) {
    return res.status(400).json({ message: "Category is required for helper registration" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: fullName,
      email,
      password: hashedPassword,
      role,
      category: role === "helper" ? category : null,
      village: role === "helper" ? village : null,
    });

    return res.json({
      message: "OTP verified and user registered successfully",
      user: { id: newUser._id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Registration error", error);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;
