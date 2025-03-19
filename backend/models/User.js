const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Regex for email validation
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['attendee', 'manager'], // Consistent casing
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);



const authModel = mongoose.model("auth", registrationSchema);
module.exports = authModel;
