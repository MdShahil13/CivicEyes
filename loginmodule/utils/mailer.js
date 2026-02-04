const nodemailer = require("nodemailer");

async function sendOTP(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP CONNECTED");

    const info = await transporter.sendMail({
      from: `"CivicEyes Signup" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    console.log("EMAIL SENT:", info.response);
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
}

module.exports = sendOTP;
