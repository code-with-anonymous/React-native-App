const Feedback = require("../models/feedback")// Import the Feedback model
const Event = require('../models/Event'); // Import the Event model

// Create new feedback
const createFeedback = async (req, res) => {
 
  const { eventId, message, rating } = req.body;

  if (!eventId || !message || !rating) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Check if event  
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create feedback
    const feedback = await Feedback.create({
      user: req.user.id, // Assuming `req.user` is populated by auth middleware
      eventId,
      message,
      rating,
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get all feedback for a specific event
const getFeedbackByEvent = async (req, res) => {
  const { eventId } = req.params;
  console.log("eventId",eventId);

  try {
    // Fetch feedback related to the event
    const feedback = await Feedback.find({eventId}).populate( 'user', 'email name');
    console.log(feedback);
    res.status(200).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete feedback by ID (optional, for admin use)
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    await feedback.remove();
    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = {
  createFeedback,
  getFeedbackByEvent,
  deleteFeedback,
};