import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve image files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api', bookingRoutes);
app.use("/api", studentRoutes);



// Environment variables
const PORT = process.env.PORT || 5001;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookenest';

// MongoDB connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((error) => console.error('❌ MongoDB connection error:', error.message));

// MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connection is open');
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the BookNest API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});