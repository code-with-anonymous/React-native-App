const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event', // Reference to the Event model
      required: true,
      validate: {
        validator: async function (value) {
          const eventExists = await mongoose.model('Event').findById(value);
          return !!eventExists; // Returns true if the event exists
        },
        message: 'Invalid eventId, no such Event exists',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Invalid email format',
      },
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate enrollments for the same event by the same user
enrollmentSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Enrollement = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollement;