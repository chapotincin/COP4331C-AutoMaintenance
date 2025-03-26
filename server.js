const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Import and connect MongoDB
const connectDB = require("./db.js");
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Import and apply API routes
const api = require("./api.js");
api.setApp(app);

// ⏱️ Start mileage updater script
require("./mileageUpdater");

// Start server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});
