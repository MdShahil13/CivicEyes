const express = require("express");
const bcrypt = require("bcrypt");
const sendOTP = require("../utils/mailer");
const User = require("../models/user");

const router = express.Router();

const signupOtpStore = {}; // temp store

// SEND OTP
router.post("/signup", async (req, res) => {
  const { email, password, regType } = req.body;

  if (!email || !password || !regType)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const otp = Math.floor(100000 + Math.random() * 900000);

  signupOtpStore[email] = {
    otp,
    username: req.body.username,
    password,
    regType,
    expiresAt: Date.now() + 2 * 60 * 1000 
  };

  try {
    sendOTP(email, otp)
      .then(() => console.log(`OTP sent to ${email}`))
      .catch((err) => console.error('OTP send failed for', email, err));

    res.json({ message: "OTP send initiated" });
  } catch {
    res.status(500).json({ message: "OTP sending failed" });
  }
});

router.post("/signup-verify", async (req, res) => {
  const { email, otp } = req.body;

  const record = signupOtpStore[email];

  if (!record)
    return res.status(400).json({ message: "OTP expired" });

  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  if (record.otp != otp)
    return res.status(401).json({ message: "Invalid OTP" });

  const hashedPassword = await bcrypt.hash(record.password, 10);

  await User.create({
    username: record.username,
    email,
    password: hashedPassword,
    regType: record.regType
  });

  delete signupOtpStore[email];

  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => { 
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });    
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful" });
}); 


module.exports = router;
