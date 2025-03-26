const mongoose = require("mongoose");
const Car = require("./models/car"); // Adjust path if needed
const fs = require("fs");
const path = require("path");

// Connect to MongoDB (only if running standalone)
const connectDB = require("./db");
connectDB();

const MINUTES_IN_WEEK = 10080;
const LOG_FILE = path.join(__dirname, "mileage-update-log.txt");

async function updateAllCarMileages() {
    try {
        const cars = await Car.find({});

        if (!cars.length) {
            console.log("No cars to update.");
            return;
        }

        const bulkOps = cars.map(car => {
            const increment = car.rateOfChange / MINUTES_IN_WEEK;
            return {
                updateOne: {
                    filter: { _id: car._id },
                    update: { $inc: { totalMileage: increment } }
                }
            };
        });

        await Car.bulkWrite(bulkOps);

        const timestamp = new Date().toISOString();
        const logLines = cars.map(car => {
            const increment = car.rateOfChange / MINUTES_IN_WEEK;
            return `${timestamp} | Updated Car: ${car._id} | +${increment.toFixed(6)} miles`;
        });

        fs.appendFileSync(LOG_FILE, logLines.join("\n") + "\n\n", "utf-8");

        console.log(`${timestamp} | Updated ${cars.length} cars.`);
    } catch (err) {
        console.error("Mileage update failed:", err.message);
    }
}

// Run every 60 seconds
setInterval(updateAllCarMileages, 60 * 1000);

// Run immediately on server start as well
updateAllCarMileages();
