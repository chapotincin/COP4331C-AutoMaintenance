const User = require("./models/user.js"); // Import User model
const Card = require("./models/card.js"); // Import Card model
const bcrypt = require("bcrypt"); // For password hashing
const { v4: uuidv4 } = require("uuid"); // For generating unique userId

const express = require("express");
const crypto = require("crypto");
const sendVerificationEmail = require("./sendEmail");
const router = express.Router();

// Temporary storage for verification codes (Use DB in production)
const verificationCodes = new Map();

module.exports.setApp = function (app) {
    
    //  Register User
    app.post("/api/register", async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
    
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
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
        
    module.exports = router;

};

