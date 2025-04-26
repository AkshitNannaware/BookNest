// import express from 'express';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth.js';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import roomRoutes from './routes/roomRoutes.js';
// // import adminRoutes from './routes/adminRoutes.js';cd         

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api', roomRoutes);
// app.use('/api', adminRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
//     );
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB Connection Failed:', err.message);
//   });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import roomRoutes from './routes/roomRoutes.js';
// import adminRoutes from './routes/adminRoutes.js'; // ✅ Fixed import

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
// app.use('/api/admin', adminRoutes); // Optional: better endpoint separation

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
  });
