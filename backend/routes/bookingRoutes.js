import express from 'express';
import mongoose from 'mongoose';
import Booking from '../models/bookingSchema.js';
import Room from '../models/Room.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// POST /book-room
router.post('/book-room', authenticate, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students can book rooms." });
    }

    const studentId = req.user.id;
    const { roomId } = req.body;

    console.log(`Booking attempt by student: ${studentId}, Room ID: ${roomId}`);

    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ error: 'Invalid roomId or studentId format' });
    }

    // Check if the room exists and is not already booked
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    if (room.isBooked) {
      return res.status(400).json({ error: 'Room is already booked.' });
    }

    // Check if the student has already booked this room
    const existingBooking = await Booking.findOne({ roomId, studentId });
    if (existingBooking) {
      return res.status(400).json({ error: "Room already booked by this user" });
    }

    const booking = new Booking({ studentId, roomId });
    await booking.save();
    console.log('Booking saved:', booking);

    room.isBooked = true;
    await room.save();

    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
});

// GET /api/rooms/rented
router.get("/rooms/rented", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user.id }).populate("roomId");
    console.log('Fetched rented rooms:', bookings);

    const rentedRooms = bookings.map(booking => ({
      ...booking.roomId.toObject(),
      bookedAt: booking.bookedAt
    }));

    if (!rentedRooms.length) {
      return res.status(404).json({ message: "No rented rooms found." });
    }

    res.status(200).json(rentedRooms);
  } catch (error) {
    console.error('Failed to fetch rented rooms:', error.message);
    res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
});

export default router;