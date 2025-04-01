const User = require("./models/user.js"); // Import User model
const Card = require("./models/card.js"); // Import Card model
const bcrypt = require("bcrypt"); // For password hashing
const { v4: uuidv4 } = require("uuid"); // For generating unique userId

const express = require("express");
const crypto = require("crypto");
const sendVerificationEmail = require("./sendEmail");
const sendResetEmail = require("./sendEmailReset");

const router = express.Router();

const Car = require("./models/car.js"); // Import Car model

const axios = require("axios"); // Make sure this is installed (npm install axios)

// Temporary storage for verification codes (Use DB in production)
const verificationCodes = new Map();

module.exports.setApp = function (app) {
    
    //  Register User
    app.post("/api/register", async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
    
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        
        // ✅ Add this block for password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error:
                    "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one number, and one special character."
            });
        } 
        


        try {
            // Check if the user already exists
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already registered" });
            }
    
            // Generate a 6-digit verification code
            const verificationCode = crypto.randomInt(100000, 999999);
            verificationCodes.set(email, verificationCode); // Store the code temporarily (Use DB in production)
    
            // Send the verification email
            const emailSent = await sendVerificationEmail(email, verificationCode);
            if (!emailSent) {
                return res.status(500).json({ error: "Error sending verification email" });
            }
    
            res.json({ success: true, message: "Verification email sent. Enter the code to verify your account." });
    
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ error: "Server error" });
        }
    });
    

    //  Login User
    app.post("/api/login", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ error: "Invalid email or password" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

            res.json({ success: true, userId: user.userId, firstName: user.firstName, lastName: user.lastName });

        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    });

    //API for forgotten passoword

    // 📧 Forgot Password
  app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email is required" });

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });

      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpires = Date.now() + 3600000;
      await user.save();

      const resetUrl = `${process.env.FRONTEND_BASE_URL}/reset-password/${resetToken}`;
      const emailSent = await sendResetEmail(user.email, resetUrl);
      if (!emailSent) throw new Error("Email failed");

      res.json({ success: true, message: "Reset email sent!" });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // 🔁 Reset Password
  app.post("/api/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword)
      return res.status(400).json({ error: "New password is required" });

    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() },
      });

      if (!user)
        return res.status(400).json({ error: "Invalid or expired token" });

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();

      res.json({ success: true, message: "Password reset successful!" });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

    //  Add Card (Tied to User)
    app.post("/api/addcard", async (req, res) => {
        const { userId, card } = req.body;

        if (!userId || !card) {
            return res.status(400).json({ error: "User ID and card content are required" });
        }

        try {
            const newCard = new Card({ userId, card });
            await newCard.save();
            res.json({ success: true, message: "Card added successfully!" });

        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    });

    //  Search Cards by User
    app.post("/api/searchcards", async (req, res) => {
        const { userId, search } = req.body;

        if (!userId || !search) {
            return res.status(400).json({ error: "User ID and search term are required" });
        }

        try {
            const results = await Card.find({ userId, card: { $regex: search, $options: "i" } });
            res.json({ results: results.map(card => card.card) });

        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    });
    
    // Verify the email code and create the user account
    app.post("/api/verify-email", async (req, res) => {
        const { email, code, password, firstName, lastName } = req.body;
    
        if (!password) {
            console.error("Password is missing in /api/verify-email request");
            return res.status(400).json({ error: "Password is required" });
        }
    
        if (!verificationCodes.get(email)) {
            console.error(`Verification failed: No code found for ${email}`);
            return res.status(400).json({ error: "Verification code not found or expired" });
        }
    
        if (verificationCodes.get(email) === parseInt(code)) {
            verificationCodes.delete(email); // Remove after successful verification
    
            try {
                console.log(`Creating user: ${email}`);
    
                // Check if user already exists
                let existingUser = await User.findOne({ email });
                if (existingUser) {
                    console.error(`User already exists: ${email}`);
                    return res.status(400).json({ error: "Email already registered" });
                }
    
                // Generate unique user ID
                const userId = uuidv4();
    
                // Log password for debugging (REMOVE after testing)
                console.log(`Password received: ${password}`);
    
                // Hash password before saving
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log(`Hashed password: ${hashedPassword}`);
    
                // Create user in the database
                const newUser = new User({
                    userId,
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName
                });
    
                await newUser.save();
    
                console.log(`User created successfully: ${email}`);
                return res.json({ success: true, message: "Email verified and account created!" });
    
            } catch (error) {
                console.error("Error saving user:", error);
                return res.status(500).json({ error: "Server error", details: error.message });
            }
    
        } else {
            console.error(`Invalid code for ${email}`);
            return res.status(400).json({ error: "Invalid verification code" });
        }
    });

    /**
     * 🏎️ Add a New Car for a User
     */
    app.post("/api/cars", async (req, res) => {
        const { userId, vin, make, model, year, color, startingMileage, totalMileage, rateOfChange } = req.body;

        if (!userId || !vin || !make || !model || !year || !color || !startingMileage || !totalMileage) {
            return res.status(400).json({ error: "All fields except rateOfChange are required" });
        }

        try {
            const newCar = new Car({ userId, vin, make, model, year, color, startingMileage, totalMileage, rateOfChange });
            await newCar.save();
            res.status(201).json({ success: true, message: "Car added successfully!", car: newCar });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    });

    /**
     * 🚗 Get All Cars for a Specific User
     */
    app.get("/api/cars/:userId", async (req, res) => {
        try {
            const cars = await Car.find({ userId: req.params.userId });
            res.json({ success: true, cars });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    });

    /**
     * 🔄 Update Car Details
     */
    app.put("/api/cars/:carId", async (req, res) => {
        try {
            const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true });
            if (!updatedCar) {
                return res.status(404).json({ error: "Car not found" });
            }
            res.json({ success: true, message: "Car updated successfully!", car: updatedCar });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    });

    /**
     * 🗑️ Delete a Car
     */
    app.delete("/api/cars/:carId", async (req, res) => {
        try {
            const deletedCar = await Car.findByIdAndDelete(req.params.carId);
            if (!deletedCar) {
                return res.status(404).json({ error: "Car not found" });
            }
            res.json({ success: true, message: "Car deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    });

    /*
       🚗 When Vin number is used to add a User's
    */
    app.post("/api/decode-vin", async (req, res) => {
        const { userId, vin, color, startingMileage, rateOfChange } = req.body;
    
        if (!userId || !vin || !color || !startingMileage || !rateOfChange) {
            return res.status(400).json({ error: "All fields are required." });
        }
    
        try {
            const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
            const results = response.data.Results;
    
            const make = results.find(r => r.Variable === "Make")?.Value;
            const model = results.find(r => r.Variable === "Model")?.Value;
            const year = results.find(r => r.Variable === "Model Year")?.Value;
    
            if (!make || !model || !year) {
                return res.status(400).json({ error: "Invalid VIN or missing vehicle data." });
            }
    
            const newCar = new Car({
                userId,
                vin,
                make,
                model,
                year,
                color,
                startingMileage,
                totalMileage: startingMileage,
                rateOfChange
            });
    
            await newCar.save();
    
            res.status(201).json({ success: true, message: "Car decoded and saved successfully!", car: newCar });
    
        } catch (error) {
            console.error("VIN decode error:", error.message);
            if (error.code === 11000 && error.keyPattern?.vin) {
                return res.status(400).json({ error: "A car with this VIN already exists." });
            }
            res.status(500).json({ error: "Server error", details: error.message });
            
        }
    });

    /**
 * ✍️ Manually Update Total Mileage and Recalculate Rate of Change
 */
app.put("/api/cars/:carId/update-mileage", async (req, res) => {
    const { totalMileage } = req.body;

    if (typeof totalMileage !== 'number' || totalMileage < 0) {
        return res.status(400).json({ error: "Invalid totalMileage value" });
    }

    try {
        const car = await Car.findById(req.params.carId);
        if (!car) return res.status(404).json({ error: "Car not found" });

        const now = new Date();
        const minutesElapsed = (now - new Date(car.addedAt)) / (1000 * 60);
        const weeksElapsed = minutesElapsed / 10080;

        // Prevent division by zero
        const newRateOfChange = weeksElapsed > 0
            ? (totalMileage - car.startingMileage) / weeksElapsed
            : 0;

        car.totalMileage = totalMileage;
        car.rateOfChange = newRateOfChange;

        await car.save();

        res.json({
            success: true,
            message: "Mileage and rate of change updated",
            car,
        });

    } catch (error) {
        console.error("Error updating mileage:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

        
    module.exports = router;

};

