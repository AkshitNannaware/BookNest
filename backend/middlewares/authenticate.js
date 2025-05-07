import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    console.log("Raw Authorization Header:", authHeader);
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ msg: 'Access denied, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

export default authenticate;