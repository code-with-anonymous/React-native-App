const UserProfile = require('../models/userProfile');
const Enrollment = require('../models/enrollement'); // Assuming you have an Enrollment model
const Event = require('../models/Event'); // Assuming you have an Event model
const User = require('../models/User'); // Assuming you have an Event model
const { uploadOnCloudinary } = require('../utils/cloudinary');
const { default: mongoose } = require('mongoose');

const AuthModel = require('../models/User'); // Assuming your auth model is here



// Create a new user profile
const createUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;  // Assuming userId is passed in the URL
    const { enrolledEvents, profilePicture } = req.body;
    console.log(userId);
    console.log("Req body of creating profile",req.body)  // Optional fields

    // Check if user profile already exists
    const existingProfile = await UserProfile.findOne({ user: userId });
    
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists.' });
    }

    // Create new user profile
    const newProfile = new UserProfile({
      user: userId,
      enrolledEvents: enrolledEvents || [],
      profilePicture: profilePicture || 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',  // Default if not provided
    });

    // Save user profile
    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      message: 'User profile created successfully.',
      profile: savedProfile,
    });
  } catch (error) {
    console.error('Error creating user profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a user's profile by userId
// const getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;  // Assuming userId is passed in the URL

//     // Find user profile by userId
//     const userProfile = await UserProfile.findOne({ user: userId }).populate('enrolledEvents');

//     if (!userProfile) {
//       return res.status(404).json({ message: 'User profile not found.' });
//     }

//     res.status(200).json({
//       success: true,
//       profile: userProfile,
//     });
//   } catch (error) {
//     console.error('Error retrieving user profile:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params; // Assuming userId is passed in the URL

//     // Find the user details by userId
//     const user = await User.findById(userId).select('name email role');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Find the user's profile and populate the enrolledEvents
//     const userProfile = await UserProfile.findOne({ user: userId }).populate({
//       path: 'enrolledEvents',
//       select: 'name date location', // Only populate specific event fields
//     });

//     if (!userProfile) {
//       return res.status(404).json({ message: 'User profile not found.' });
//     }

//     // Structure the response data to include user details and profile data
//     res.status(200).json({
//       success: true,
//       profile: {
//         ...userProfile.toObject(), // Convert Mongoose document to plain object
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Error retrieving user profile:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL params

    // Fetch user details
    const user = await User.findById(userId).select('name email role').lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Fetch user profile and populate enrolled events
    const userProfile = await UserProfile.findOne({ user: userId })
      .populate({
        path: 'enrolledEvents', // Populate enrolledEvents
        populate: {
          path: 'eventId', // Populate eventId within enrolledEvents
          model: 'Event', // Reference the Event model
          select: 'eventName eventDate location', // Only fetch specific fields from the Event model
        },
      })
      .lean();

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    // Combine user details with profile data
    res.status(200).json({
      success: true,
      profile: {
        ...userProfile,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};






const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { userId } = req.params;
    console.log("Id of the user to upload profile picture",userId);
    const localFilePath = req.file.path;

    // Upload image to Cloudinary
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
      return res.status(500).json({ message: 'Failed to upload image to Cloudinary.' });
    }

    // Update user's profile picture
    const user = await UserProfile.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResult.secure_url },
      { new: true } // Return updated document
    );
    console.log("User after updating profile picture",user);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully.',
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUserProfile,getUserProfile, uploadProfilePicture };
