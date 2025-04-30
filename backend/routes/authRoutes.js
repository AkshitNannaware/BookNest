// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import { login } from '../controllers/AuthController.js'; // Adjust the import path as necessary
// import User from '../models/userSchema.js'; // Adjust the import path as necessary

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Multer instance with image type filter
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Only JPEG, PNG, and GIF images are allowed.'), false);
//     }
//     cb(null, true);
//   }
// });

// // Define the login route
// router.post('/login', login);

// // Route to handle form data with image
// router.post('/register', upload.single('photo'), (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const photo = req.file;

//     if (!username || !email || !password || !role || !photo) {
//       return res.status(400).json({ msg: 'All fields including photo are required.' });
//     }
    

//     // Save to database
//     const newUser = new User({
//       username,
//       email,
//       password, // ideally hash this before saving (bcrypt)
//       role,
//       photo: `/uploads/${photo.filename}`
//     });

//     return res.status(201).json({
//       msg: 'User registered successfully!',
//       user: {
//         id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//         role: newUser.role,
//         photoUrl: newUser.photo
//       }
//     });
//     // console.log('Received data:', req.body);
//     // console.log('Uploaded photo:', photo.filename);

//     // // TODO: Save user to database (you can include photo path as: `/uploads/${photo.filename}`)

//     // return res.status(201).json({
//     //   msg: 'User registered successfully!',
//     //   photoUrl: `/uploads/${photo.filename}`
//     // });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// });

// export default router;




import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import fs from 'fs';
import User from '../models/userSchema.js'; // Adjust the import path as necessary
import { login } from '../controllers/AuthController.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and GIF images are allowed.'), false);
    }
    cb(null, true);
  }
});

// Login route
router.post('/login', login);

// Register route
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const photo = req.file;

    if (!username || !email || !password || !role || !photo) {
      return res.status(400).json({ msg: 'All fields including photo are required.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // will be auto-hashed via pre-save hook
      role,
      photo: `/uploads/${photo.filename}`
    });

    await newUser.save();

    return res.status(201).json({
      msg: 'User registered successfully!',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        photoUrl: newUser.photo
      }
    });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
