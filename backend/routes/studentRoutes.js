import express from 'express';
import Booking from '../models/bookingSchema.js';
import Room from '../models/Room.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Route to fetch rented rooms for a student
router.get('/rented', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'student' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const bookings = await Booking.find({ studentId: req.user.id }).populate('roomId');

    if (!bookings.length) {
      return res.status(404).json({ message: 'No rented rooms found.' });
    }

    const rentedRooms = bookings
      .filter(booking => booking.roomId)
      .map(booking => ({
        ...booking.roomId.toObject(),
        bookedAt: booking.bookedAt
      }));

    res.status(200).json(rentedRooms);
  } catch (error) {
    console.error('Error fetching rented rooms:', error.message);
    res.status(500).json({ message: 'Failed to fetch rented rooms', error: error.message });
  }
});


router.get("/student/rented", authenticate, async (req, res) => {
  // Reuse the same logic from /rooms/rented
  const bookings = await Booking.find({ studentId: req.user.id }).populate("roomId");

  if (bookings.length === 0) {
    return res.status(404).json({ message: "No rented rooms found." });
  }

  if (req.user.role !== 'student' && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Forbidden" });
  }

  const rentedRooms = bookings.map(booking => {
    if (booking.roomId) {
      return {
        ...booking.roomId.toObject(),
        bookedAt: booking.bookedAt
      };
    } else {
      return null;
    }
  }).filter(room => room !== null);

  res.status(200).json(rentedRooms);
});

export default router;