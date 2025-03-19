// Backend Authentication Controller
  const userModel = require("../models/User.js");
  const bcrypt = require("bcrypt");
  const jwt = require('jsonwebtoken');
  
  // Register function
  const register = async (req, res) => {
      try {
        const { name, email, password, role } = req.body;
  
        // Check if all fields are provided
        if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the user
        const newUser = await userModel.create({
          name,
          email,
          password: hashedPassword,
          role,
        });
  
        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  
  
  // Login function
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for existing user
      const registeredUser = await userModel.findOne({ email });
      if (!registeredUser) {
        return res.status(400).json({ 
          success: false, 
          message: "User not found" 
        });
      }
  
      // Compare passwords
      const matchPassword = await bcrypt.compare(password, registeredUser.password);
      if (!matchPassword) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid password" 
        });
      }
  
      // Create and sign JWT token
      const token = jwt.sign(
        { 
          id: registeredUser._id, 
          email: registeredUser.email, 
          role: registeredUser.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );
  
      console.log('token', token);
  
      // Set the token as a cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 72 * 60 * 60 * 1000 // 3 days
      });
  
      // Respond with success
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: registeredUser._id,
          email: registeredUser.email,
          role: registeredUser.role,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: "Server error. Please try again later." 
      });
    }
  };

 
  // const logout = (req, res) => {
  //   res.clearCookie('authToken', {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'strict',
  //   });
  //   console.log('User logged out successfully', req.session);
  
  //   res.status(200).json({
  //     success: true,
  //     message: "User logged out successfully",
  //   });
  // };
  


  // Middleware for authentication



  const logout = (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        return res.status(400).json({ success: false, message: "No auth token found" });
    }

    res.clearCookie('authToken', {
        httpOnly: true,
        secure: false, // Change to `true` if using HTTPS
        sameSite: 'strict',
    });

    console.log('User logged out successfully');

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};




  const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  if (!token) {
    return res.status(400).json({ isValid: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isValid: true, user: decoded }); // Ensure `decoded` contains `role`
  } catch (err) {
    return res.status(401).json({ isValid: false, message: 'Invalid token' });
  }
};

  
 
  
  // Middleware to check user role
  const authorizeRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: "Forbidden: You don't have permission to access this resource." 
        });
      }
      next();
    };
  };


const getUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret here
    const userId = decoded.id; // Ensure 'id' is the correct field in your token

    console.log("userId =>", userId); // Check the extracted userId

    // Proceed with further logic (e.g., fetching user data from the database)
    res.status(200).json({ message: 'User fetched successfully', userId });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: "Server error" });
  }
};  
  
  module.exports = { register, login, logout, authorizeRole , verifyToken,getUser};