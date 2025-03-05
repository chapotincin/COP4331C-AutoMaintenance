const User = require("./models/user.js"); // Import User model
const Card = require("./models/card.js"); // Import Card model
const bcrypt = require("bcrypt"); // For password hashing
const { v4: uuidv4 } = require("uuid"); // For generating unique userId

module.exports.setApp = function (app) {
    
    //  Register User
    app.post("/api/register", async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            // Check if user already exists
            let existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ error: "Email already registered" });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = new User({
                userId: uuidv4(), // Generate unique userId
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            await newUser.save();
            res.status(201).json({ success: true, message: "User registered successfully!" });

        } catch (error) {
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
};

