import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String, // URL of image from cloudinary
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Owner'],
    default: 'User'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
