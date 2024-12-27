require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const timeout = require('connect-timeout'); // Import timeout package
const cors = require("cors"); // Import cors package

// Routes
const csvRoutes = require("./routes/csvRoutes");
const dispositionRoutes = require("./routes/dispositionRoutes");
const recordingRoutes = require("./routes/recordingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // Allow localhost:3000
  "https://assets.flex.twilio.com" // Allow Twilio Flex URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the origin
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(bodyParser.json());
app.use(timeout('10s')); // Set a timeout duration (e.g., 10 seconds)

// Add timeout error handling middleware
app.use((req, res, next) => {
  if (!req.timedout) return next();
  res.status(503).send('Request Timeout');
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api/csv", csvRoutes);
app.use("/api/dispositions", dispositionRoutes);
app.use("/api/recordings", recordingRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
