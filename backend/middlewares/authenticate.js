import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'; // ✅ Corrected: added .js

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log('Decoded Token:', decoded); // 👈 See what's inside

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    console.error('JWT Error:', error); // 👈 Print detailed error
    res.status(400).json({ msg: 'Invalid token' });
  }
};

export default authenticate;