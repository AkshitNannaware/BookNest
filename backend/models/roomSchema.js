import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: [String],
  available: {
    type: Boolean,
    default: true,
  },
  rentedBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);