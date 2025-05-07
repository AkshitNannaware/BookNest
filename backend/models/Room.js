import mongoose from 'mongoose';
import { type } from 'os';

const rentedBySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  rentedAt: {
    type: Date,
    default: Date.now,
  },
  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },  
});

const roomSchema = new mongoose.Schema({
  ownerId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String, // Use String for simplicity in this example
    ref: 'User', // Reference to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "Untitled Room",  // Optional: fallback default
  },
  description: String,
  rent: {
    type: Number,
    required: true,
  },
  location: String,
  facilities: 
  {
    type: [String],
    default: [], // Default to an empty array if no facilities are provided
  },
  photos: [String], // Store URLs or file paths for room photos
  rentedBy: [rentedBySchema], // Keep track of renters and rental dates

  isBooked: { type: Boolean, default: false }, // isBooked field

  
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;