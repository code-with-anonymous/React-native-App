const express = require('express');
const routers = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
const Enrollment = require('../models/enrollement');

const {
  register,
  login,
  logout,
  verifyToken,
  getUser,
} = require('../controllers/authController');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/EventController');

const {
  enrollUserInEvent,
  getEnrollmentsForEvent,
  getUserEnrollments,
  cancelEnrollment,
} = require('../controllers/enrollmentController');
const {
  getUserProfile,
  uploadProfilePicture,
  createUserProfile,
} = require('../controllers/profileController');
const  {
  createFeedback,
  getFeedbackByEvent,
  deleteFeedback,
} = require('../controllers/feedbackController');
const {uploadedImage} = require('../middleware/multer');
const { protect } = require('../middleware/authMiddleware');

// Routes for authentication
routers.post('/register', register);
routers.post('/login', login);
routers.post('/logout', logout);
// Verify Token Route
routers.post('/verify-token', verifyToken);
routers.get('/user', getUser);

// Routes for event handlers
routers.post('/createEvents', uploadedImage.single('image'), createEvent);
routers.get('/readEvents', getAllEvents);
routers.get('/events/:id', getEventById);
routers.put('/updateEvents/:id', updateEvent);
routers.delete('/deleteEvents/:_id', deleteEvent);

// Routes for enrollment handlers

// Enroll a user in an event
routers.post('/enroll', enrollUserInEvent);
routers.get('/event/:eventId', getEnrollmentsForEvent);
routers.get('/user/:userId', getUserEnrollments);
routers.delete('/:enrollmentId', cancelEnrollment);

// Routes for user profile handlers
routers.post('/profile/:userId', createUserProfile);
routers.get('/getProfile/:userId', getUserProfile);
routers.post(
  '/upload/:userId',
  uploadedImage.single('profilePicture'),
  uploadProfilePicture,
);

// handle exports for feedback
routers.post('/feedback',protect, createFeedback); // Add feedback
routers.get('/:eventId/getFeedback', getFeedbackByEvent); // Get all feedback
routers.delete('/feedback/:id',protect, deleteFeedback); // Delete feedback

module.exports = routers;
