const Enrollment = require('../models/enrollement');
const Event = require('../models/Event');
const User = require('../models/User'); // Assuming you have a User model

// Enroll a user in an event
const enrollUserInEvent = async (req, res) => {
  const { eventId, userId, username, email, enrolledAt } = req.body;
  console.log(req.body);
  if (!eventId || !userId || !username || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const enrollment = new Enrollment({
      eventId,
      userId,
      username,
      email,
      enrolledAt: enrolledAt || Date.now(), // Use current timestamp if not provided
    });
    console.log(enrollment)

    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful!', enrollment });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'User is already enrolled in this event.' });
    }
    console.error('Error creating enrollment:', error);
    res.status(500).json({ message: 'Enrollment failed.' });
  }
};

// Get all enrollments for an event
const getEnrollmentsForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const enrollments = await Enrollment.find({ eventId })
      .populate('eventId', 'eventName eventDate location') // Populate event details
      .populate('userId', 'name email') // Populate user details if needed
      .select('username enrolledAt');
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get all events a user is enrolled in
const getUserEnrollments = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId })
      .populate('eventId', 'eventName eventDate location')
      .select('username gmail enrolledAt');
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Cancel an enrollment
const cancelEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json({ message: 'Enrollment canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  enrollUserInEvent,
  getEnrollmentsForEvent,
  getUserEnrollments,
  cancelEnrollment,
};
