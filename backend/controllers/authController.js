// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/userSchema.js';
// // import cloudinary from 'cloudinary';
// import { v2 as cloudinary } from 'cloudinary'; // ✅ Correct import

// // cloudinary.v2.config({
// //   // cloud_name: 'your-cloud-name',
// //   // api_key: 'your-api-key',
// //   // api_secret: 'your-api-secret'
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.API_KEY,
// //   api_secret: process.env.API_SECRET
// // });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // cloudinary.uploader.upload('path/to/test-image.jpg', { folder: 'test' })
// //   .then(result => console.log('Upload successful:', result))
// //   .catch(err => console.error('Upload failed:', err));

// cloudinary.uploader.upload('path/to/test-image.jpg', { folder: 'test' })
//   .then(result => console.log('Upload successful:', result))
//   .catch(err => console.error('Upload failed:', err));

// // Register Controller
// export const register = async (req, res) => {
//   try {

//     console.log('Request body:', req.body);
//     console.log('Uploaded file:', req.file);


//     const { username, email, password, role } = req.body;
//     const file = req.file; // assuming photo comes via form-data

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ msg: 'User already exists' });

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: 'users'
//     });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       photo: result.secure_url,
//       role
//     });

//     res.status(201).json({ msg: 'User registered successfully', user });
//   } catch (err) {
//     res.status(500).json({ msg: 'Registration failed', error: err.message });
//   }
// };

// // Login Controller
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       // 'your_jwt_secret', // store this in env
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       msg: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         photo: user.photo
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: 'Login failed', error: err.message });
//   }
// };








import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import { v2 as cloudinary } from 'cloudinary'; // ✅ Correct import

// ✅ Correct cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ NO random uploader.upload() here!

// Register Controller
export const register = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { username, email, password, role } = req.body;
    const file = req.file; // assuming photo comes via form-data

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, { folder: 'users' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      photo: result.secure_url,
      role
    });

    res.status(201).json({ msg: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
}