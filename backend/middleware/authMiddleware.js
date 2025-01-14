const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from the request header
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your-secret-key'); // Use the same secret key as in step 1
        req.user = decoded; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
