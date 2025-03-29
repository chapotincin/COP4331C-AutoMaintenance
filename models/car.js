const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // Links car to a specific user
    vin: { type: String, required: true, unique: true }, // Unique Vehicle Identification Number
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    startingMileage: { type: Number, required: true },
    totalMileage: { type: Number, required: true },
    rateOfChange: { type: Number, default: 0 }, // Miles per week
    addedAt: { type: Date, default: Date.now }, // Timestamp of when the car was added
    lastMaintenanceNotified: { type: Number, default: 0 }
});

module.exports = mongoose.model("Car", CarSchema);
