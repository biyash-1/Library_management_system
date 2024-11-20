import mongoose from "mongoose";

// Use `Schema` directly from `mongoose`
const { Schema } = mongoose;

// Define the User schema with additional fields for phone number and registration date
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  sid: {
    type: String,
    required: true,
    unique: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now, // automatically sets the registration date to the current date
  },
  // Additional fields can be added as needed
});

// Export the User model
export default mongoose.model('User', userSchema);
