const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const dbURI = 'mongodb+srv://SG277OR:NewGreen1Ban_ana2Whale@carmaintenancecluster.z9o8i.mongodb.net/?retryWrites=true&w=majority&appName=CarMaintenanceCluster';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process if connection fails
    }
};

// Export the function so other files can use it
module.exports = connectDB;
