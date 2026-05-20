const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { getMongoUri, getMongoOptions } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const templateRoutes = require("./routes/templateRoutes");

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const allowed = [process.env.CLIENT_URL, process.env.FRONTEND_URL].filter(
      Boolean,
    );
    const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
      origin,
    );
    const isVercel = /\.vercel\.app$/i.test(new URL(origin).hostname);

    if (isLocal || isVercel || allowed.includes(origin)) {
      return callback(null, true);
    }

    // No CLIENT_URL set on Render: allow all (dev/small deploys)
    if (allowed.length === 0) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
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
