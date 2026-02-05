require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected to localhost");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views/pages", "signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/pages", "login.html"));
});
app.use("/auth", require("./routes/auth")); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
