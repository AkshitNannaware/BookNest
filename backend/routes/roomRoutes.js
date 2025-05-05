import express from 'express';
import multer from 'multer';
import path from 'path';
import Room from '../models/Room.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Set up Multer for file uploads with additional error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for validating image types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Set limits (file size limit of 5MB for each image)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// POST /api/rooms/upload to upload room data and photos
router.post('/upload', authenticate, upload.array('photos', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    // const { ownerId, title, description, rent, location, facilities } = req.body;
    // const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);
    // const facilityList = Array.isArray(facilities) ? facilities : [facilities];

    const ownerId = req.user.id; // ✅ Get owner ID from the token
    if (!ownerId) {
      return res.status(401).json({ msg: "Owner ID missing. Please log in again." });
    }

    const { title, description, rent, location, facilities } = req.body;
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);
    // const facilityList = Array.isArray(facilities) ? facilities : [facilities];

    let facilityList;
if (Array.isArray(facilities)) {
  facilityList = facilities;
} else if (typeof facilities === 'string') {
  facilityList = facilities.split(',').map(f => f.trim());
} else {
  facilityList = [];
}


    const room = new Room({
      ownerId,
      title,
      description,
      rent,
      location,
      // facilities: facilityList,
      facilities: facilityList,
      photos: photoPaths,
    });

    const savedRoom = await room.save();

    res.status(201).json({ msg: 'Room uploaded successfully', room: savedRoom });
  } catch (err) {
    console.error('Upload error:', err);
    if (err.message.includes('Only image files are allowed!')) {
      res.status(400).json({ msg: 'Invalid file type. Only images are allowed.' });
    } else if (err.message.includes('File too large')) {
      res.status(400).json({ msg: 'File size exceeds the 5MB limit.' });
    } else {
      res.status(500).json({ msg: 'Server error during upload' });
    }
  }
});

// GET /api/rooms/rental-history/:ownerId to fetch rental history of a room owner
router.get('/rental-history', authenticate, async (req, res) => {
  try {
    const ownerId = req.user.id; // Assuming user is added by the authenticate middleware
    const rooms = await Room.find({ ownerId }).populate('rentedBy.user', 'username email');
    res.status(200).json({ rooms });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch rooms' });
  }
});

// POST /api/rooms to create a new room
router.post('/', async (req, res) => {
  try {
    const { title, location, rent, photos, description, amenities, ownerId } = req.body;

    const newRoom = new Room({ title, location, rent, photos, description, amenities, ownerId });
    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (err) {
    console.error("Error uploading room:", err.message);
    res.status(500).json({ msg: "Server error during upload" });
  }
});

// GET /api/rooms/all to fetch all rooms
router.get('/all', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    res.status(500).json({ msg: "Server error fetching rooms" });
  }
});

// GET /api/rooms/search to filter rooms by location
router.get('/search', async (req, res) => {
  try {
    const { location } = req.query;
    const query = location ? { location: { $regex: new RegExp(location, 'i') } } : {};
    const rooms = await Room.find(query);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering rooms.' });
  }
});

// PUT /api/rooms/:id to update room information by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;