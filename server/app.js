const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { getMongoUri, getMongoOptions } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const templateRoutes = require("./routes/templateRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Template Store API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/favorites", favouriteRoutes);

const PORT = process.env.PORT || 5100;

const startServer = async () => {
  try {
    const mongoUri = getMongoUri();
    await mongoose.connect(mongoUri, getMongoOptions());
    console.log("✓ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

startServer();
