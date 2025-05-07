import express from "express";
import Booking from "../models/bookingSchema.js";
import Room from "../models/Room.js";
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// rooms/rented route to fetch rented rooms
router.get("/rooms/rented", authenticate, async (req, res) => {  
  try {
    // Fetch bookings based on userId (from the authenticated user in req.user)
    const bookings = await Booking.find({ studentId: req.user.id }).populate("roomId");

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No rented rooms found." });
    }

    // Map the bookings to return room data with the booking info (including bookedAt)
    const rentedRooms = bookings.map(booking => ({
      ...booking.roomId.toObject(),
      bookedAt: booking.bookedAt
    }));

    // Return rented rooms data
    res.status(200).json(rentedRooms);
  } catch (error) {
    // Error handling for failed request
    res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
});

export default router;
