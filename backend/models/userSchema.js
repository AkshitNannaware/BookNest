import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  photo: {
    type: String,
    required: true,
    default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'owner', 'admin'], required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema); // ✅ Correct export