// // import express from 'express';
// // import mongoose from 'mongoose';
// // import authRoutes from './routes/auth.js';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import roomRoutes from './routes/roomRoutes.js';
// // // import adminRoutes from './routes/adminRoutes.js';cd         

// // dotenv.config();
// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // app.use('/api/auth', authRoutes);
// // app.use('/api', roomRoutes);
// // app.use('/api', adminRoutes);

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log('✅ MongoDB connected');
// //     app.listen(process.env.PORT || 5000, () =>
// //       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
// //     );
// //   })
// //   .catch((err) => {
// //     console.error('❌ MongoDB Connection Failed:', err.message);
// //   });

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import authRoutes from './routes/auth.js';
// import roomRoutes from './routes/roomRoutes.js';
// // import adminRoutes from './routes/adminRoutes.js'; // ✅ Fixed import

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomRoutes);
// // app.use('/api/admin', adminRoutes); // Optional: better endpoint separation



// // MongoDB Connection and Server Start
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log('✅ MongoDB connected');
// //     app.listen(process.env.PORT || 5000, () =>
// //       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
// //     );
// //   })
// //   .catch((err) => {
// //     console.error('❌ MongoDB Connection Failed:', err.message);
// //   });


// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// const app = express();

// dotenv.config();

// const PORT = process.env.PORT || 5001;
// const URI=process.env.MONGO_URI || 'mongodb://localhost:27017/BookNest';

// // connect to MongoDB
// try {
//   mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log('MongoDB connected successfully');
// } catch (error) {
//   console.error('MongoDB connection error:', error.message);
// }

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });





import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
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