import express from 'express';
import multer from 'multer';
import path from 'path';
import Room from '../models/Room.js';
import User from '../models/userSchema.js'; // ✅ Added missing User import
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// ✅ Upload room with photos
router.post('/upload', authenticate, upload.array('photos', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No files uploaded' });
    }

    const ownerId = req.user.id;
    if (!ownerId) {
      return res.status(401).json({ msg: 'Owner ID missing. Please log in again.' });
    }

    const { title, description, rent, location, facilities, mobile, name } = req.body;
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);

    let facilityList = [];
    if (facilities) {
      facilityList = Array.isArray(facilities)
        ? facilities
        : facilities.split(',').map((f) => f.trim());
    }

    if (mobile) {
      const owner = await User.findById(ownerId);
      if (owner && !owner.phone) {
        owner.phone = mobile;
        await owner.save();
      }
    }

    const room = new Room({
      ownerId,
      title,
      description,
      rent,
      location,
      facilities: facilityList,
      photos: photoPaths,
      mobile,
      name,
    });

    const savedRoom = await room.save();
    res.status(201).json({ msg: 'Room uploaded successfully', room: savedRoom });
  } catch (err) {
    console.error('Upload error:', err);
    if (err.message.includes('Only image files are allowed!')) {
      return res.status(400).json({ msg: 'Invalid file type. Only images are allowed.' });
    } else if (err.message.includes('File too large')) {
      return res.status(400).json({ msg: 'File size exceeds the 5MB limit.' });
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ msg: 'Too many files uploaded. Maximum is 3.' });
    }
    res.status(500).json({ msg: 'Server error during upload' });
  }
});

// ✅ Rental history route
router.get('/rental-history', authenticate, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const rooms = await Room.find({ ownerId }).populate('rentedBy.user', 'username email');
    res.status(200).json({ rooms });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch rooms' });
  }
});

// ✅ Secure room creation (alternative route)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, location, rent, photos, description, amenities } = req.body;
    const ownerId = req.user.id;

    if (!title || !location || !rent || !photos || !description || !ownerId) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const newRoom = new Room({
      title,
      location,
      rent,
      photos,
      description,
      amenities,
      ownerId,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    console.error("Error uploading room:", err.message);
    res.status(500).json({ msg: "Server error during upload" });
  }
});

// ✅ Get all rooms (public)
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('ownerId', 'email mobile');
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching rooms' });
  }
});

// ✅ Update room info
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete room (optional)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    if (room.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Room deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete room", error: err.message });
  }
});

// ✅ Get all rooms (duplicate fallback route)
router.get('/all', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch rooms", error: err.message });
  }
});

export default router;