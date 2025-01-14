const express = require('express');
const routers = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

const {register, login, verifyToken} = require('../controllers/authController');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/EventController');
const {uploadedImage} = require('../middleware/multer');
// Routes for authentication
routers.post('/register', register);
routers.post('/login', login);
// Verify Token Route
routers.post('/verify-token', verifyToken);

// Routes for event handlers
routers.post('/createEvents', uploadedImage.single('image'), createEvent);
routers.get('/readEvents', getAllEvents);
routers.get('/events/:id', getEventById);
routers.put('/updateEvents/:id', updateEvent);
routers.delete('/deleteEvents/:_id', deleteEvent);

module.exports = routers;
