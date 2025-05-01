import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

app.use('/api/auth', authRoutes);

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