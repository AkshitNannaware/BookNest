// import React, { useState } from 'react';
// import './Hero.css';
// import { motion } from 'framer-motion';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Hero = () => {
//   const [destination, setDestination] = useState('');
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);

//   const handleSearch = () => {
//     console.log('Search initiated:', { destination, checkIn, checkOut });
//   };

//   return (
//     <section className="Hero">
//       <div className="hero-overlay">
//         <img
//           src="\WhatsApp Image 2025-04-14 at 11.17.47_e5271dee.jpg"
//           className="heroimg"
//           alt="hero background"
//         />

//         <motion.div
//           className="hero-text"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           <motion.h1
//             className="gradient-text"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             Discover Most Suitable Property
//           </motion.h1>

//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             Find a variety of properties that suits your interest.
//           </motion.span>
//           <br />
//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//           >
//             Forget all difficulties in finding a residence for you.
//           </motion.span>
//         </motion.div>

//         <div className="advanced-search">
//           <input
//             type="text"
//             placeholder="Where are you going?"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />

//           <DatePicker
//             selected={checkIn}
//             onChange={(date) => setCheckIn(date)}
//             placeholderText="Check-In"
//             className="date-picker"
//           />

//           <DatePicker
//             selected={checkOut}
//             onChange={(date) => setCheckOut(date)}
//             placeholderText="Check-Out"
//             className="date-picker"
//           />

//           <button onClick={handleSearch}>Search</button>
//         </div>

//         <div className="about-lines">
//           <p>
//             Welcome to the best room booking platform for students! Our website helps you find suitable accommodations for your needs. Whether you’re looking for a peaceful study environment or a vibrant student community, we’ve got you covered. Explore available rooms with detailed information, including amenities, price, and availability. Start your journey to a hassle-free student living experience!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useState } from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Hero = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);


  const handleSearch = () => {
    console.log('Search initiated:', { destination, checkIn, checkOut });
  };
  
  return (
    <section className="Hero">
      <div className="hero-overlay">
        <img
          src="\WhatsApp Image 2025-04-14 at 11.17.47_e5271dee.jpg"
          className="heroimg"
          alt="hero background"
        />

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.h1
            className="gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Find Your Perfect Room
          </motion.h1>

          <motion.span
            className="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Choose from a variety of student-friendly rooms near your campus.
          </motion.span>
          <br />
          <motion.span
            className="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            Book easily and start your student life without the stress.
          </motion.span>
        </motion.div>

        <div className="advanced-search">
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            placeholderText="Check-In"
            className="date-picker"
          />

          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            placeholderText="Check-Out"
            className="date-picker"
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="about-lines">
          <p>
            Finding the right place to stay as a student can be tough. But we make it easy! Browse through affordable and convenient rooms near your college.
          </p>
          <p>
            Book your ideal room today and enjoy a stress-free student life!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
