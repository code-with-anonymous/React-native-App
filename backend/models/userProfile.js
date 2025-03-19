const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  profilePicture: { type: String , default:"https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"},
  enrolledEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment', // Reference to the Enrollment model
    },
  ],
});

module.exports = mongoose.model('UserProfile', userSchema);
