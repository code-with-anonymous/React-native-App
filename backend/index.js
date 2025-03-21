const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const routes = require("./route/Router");
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());


// CORS configuration to allow the frontend from multiple origins
app.use(cors({
    origin: [
        "http://192.168.100.7:5001",  // Your mobile device IP address (if using mobile)
        "http://localhost:5001",       // For local frontend testing
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Allow cookies and authorization headers
}));

// Example GET request
app.get("/", (req, res) => {
    res.send("hello welcome to api");
});

// Register API routes
app.use("/api", routes);  // Ensure routes are correctly exported and handled

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

