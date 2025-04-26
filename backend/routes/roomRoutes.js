import express from 'express';
import User from '../models/userSchema.js';
import Room from '../models/roomSchema.js';

const router = express.Router();

// Fetch all users
router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch users', error: error.message });
  }
});

// Fetch all rooms with their owners and renters
router.get('/admin/rooms', async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate('owner', 'username email')
      .populate('rentedBy.user', 'username email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch rooms', error: error.message });
  }
});

// Fetch rental data (who rented which room)
router.get('/admin/rentals', async (req, res) => {
  try {
    const rentals = await Room.find({ 'rentedBy.0': { $exists: true } }) // Rooms with at least one renter
      .populate('owner', 'username email')
      .populate('rentedBy.user', 'username email');
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch rental data', error: error.message });
  }
});

// Endpoint to upload room data
router.post('/rooms/upload', async (req, res) => {
  try {
    const { ownerId, title, description, rent, location, photos } = req.body;

    const newRoom = new Room({
      owner: ownerId,
      title,
      description,
      rent,
      location,
      photos,
      rentedBy: [], // Initially no renters
    });

    await newRoom.save();
    res.status(201).json({ msg: 'Room uploaded successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to upload room', error: error.message });
  }
});

// Endpoint to fetch rental history for an owner's rooms
router.get('/rooms/rental-history/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;

    const rooms = await Room.find({ owner: ownerId }).populate('rentedBy.user', 'username email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch rental history', error: error.message });
  }
});

// Fetch rooms rented by a specific user
router.get('/rooms/rented/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const rentedRooms = await Room.find({ 'rentedBy.user': userId }).populate('owner', 'username email');
    res.status(200).json(rentedRooms);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch rented rooms', error: error.message });
  }
});

export default router;