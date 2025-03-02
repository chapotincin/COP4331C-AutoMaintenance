const mongoose = require('mongoose');

// Import your MongoDB connection
const connectDB = require('./db');

// Define a Mongoose Schema (Modify fields based on your project)
const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    mileage: Number
});

// Create a Model
const Car = mongoose.model('Car', carSchema);

// Connect to MongoDB and Insert Test Data
async function seedDatabase() {
    await connectDB(); // Ensure MongoDB is connected

    // Sample Data
    const cars = [
        { make: "Toyota", model: "Camry", year: 2020, mileage: 30000 },
        { make: "Honda", model: "Civic", year: 2019, mileage: 40000 },
        { make: "Ford", model: "F-150", year: 2021, mileage: 15000 }
    ];

    try {
        await Car.insertMany(cars);
        console.log("Test data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
        process.exit(0) //Ensures script exits properly
    }
}

// Run the function
seedDatabase();
