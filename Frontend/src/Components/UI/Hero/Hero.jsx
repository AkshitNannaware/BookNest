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





// import React, { useState } from 'react';
// import './Hero.css';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const [destination, setDestination] = useState('');
//   const [rentalMonths, setRentalMonths] = useState(1);
//   const [priceRange, setPriceRange] = useState([1000, 10000]);
//   const [roomType, setRoomType] = useState('Single Room');
//   const [showFilter, setShowFilter] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(
//       `/residencies?destination=${encodeURIComponent(destination)}&rentalMonths=${rentalMonths}`
//     );
//   };
  
//   return (
//     <section className="Hero">
//       <div>
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
//         <motion.h1
//             className="gradient-text"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//         >
//             Find Your Perfect Room
//         </motion.h1>

//         <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//         >
//             Choose from a variety of student-friendly rooms near your campus.
//         </motion.span>
//           <br />
//         <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//         >
//             Book easily and start your student life without the stress.
//         </motion.span>
//         </motion.div>

//          <div className="advanced-search">
//           <input
//             type="text"
//             placeholder="Search Rooms"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />
          
//           <button
//             className="filter-btn"
//             onClick={() => setShowFilter(!showFilter)}
//           >
//             Filters
//           </button>
//           <button onClick={handleSearch} className="search-btn">
//             Search
//           </button>
//         </div>

//         {showFilter && (
//           <div className="filter-modal">
//             <h3>Filter Options</h3>
//             <div className="filter-group">
//               <label>Rental Months</label>
 
//            <select
//             value={rentalMonths}
//             onChange={(e) => setRentalMonths(e.target.value)}
//             className="rental-months-dropdown"
//            >
//             <option value={1}>1 Month</option>
//             <option value={2}>2 Months</option>
//             <option value={3}>3 Months</option>
//             <option value={6}>6 Months</option>
//             <option value={12}>12 Months</option>
//            </select>

//           </div>
//            <div className="filter-group">
//               <label>Price Range</label>
//               <input
//                 type="range"
//                 min="1000"
//                 max="10000"
//                 value={priceRange[0]}
//                 onChange={(e) =>
//                   setPriceRange([e.target.value, priceRange[1]])
//                 }
//               />
//               <input
//                 type="range"
//                 min="1000"
//                 max="10000"
//                 value={priceRange[1]}
//                 onChange={(e) =>
//                   setPriceRange([priceRange[0], e.target.value])
//                 }
//               />
//               <p>
//                 ₹{priceRange[0]} - ₹{priceRange[1]}
//               </p>
//             </div>
//             <div className="filter-group">
//               <label>Room Type</label>
//               <select
//                 value={roomType}
//                 onChange={(e) => setRoomType(e.target.value)}
//               >
//                 <option>Single Room</option>
//                 <option>Double Room</option>
//                 <option>Studio Apartment</option>
//               </select>
//             </div>
//             <button
//               className="apply-filters-btn"
//               onClick={() => setShowFilter(false)}
//             >
//               Apply Filters
//             </button>
//           </div>
//         )}

//           <button onClick={handleSearch}>Search</button>
//         </div>

//        <div className="about-lines">
//           <p>
//             Finding the right place to stay as a student can be tough. But we make it easy! Browse through affordable and convenient rooms near your college.
//           </p>
//           <p>
//             Book your ideal room today and enjoy a stress-free student life!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;





// import React, { useState } from 'react';
// import './Hero.css';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const [destination, setDestination] = useState('');
//   const [rentalMonths, setRentalMonths] = useState(1);
//   const [priceRange, setPriceRange] = useState([1000, 10000]);
//   const [roomType, setRoomType] = useState('Single Room');
//   const [showFilter, setShowFilter] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(
//       `/residencies?destination=${encodeURIComponent(destination)}&rentalMonths=${rentalMonths}`
//     );
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
//             Find Your Perfect Room
//           </motion.h1>

//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             Choose from a variety of student-friendly rooms near your campus.
//           </motion.span>
//           <br />
//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//           >
//             Book easily and start your student life without the stress.
//           </motion.span>
//         </motion.div>

//         <div className="advanced-search">
//           <input
//             type="text"
//             placeholder="Search Rooms"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />

//           <button
//             className="filter-btn"
//             onClick={() => setShowFilter(!showFilter)}
//           >
//             Filters
//           </button>
//           <button onClick={handleSearch} className="search-btn">
//             Search
//           </button>
//         </div>

//         {/* Filter Modal Starts */}
//         {showFilter && (
//           <div className="filter-modal">
//             <h3 className="text-xl font-semibold mb-4">Filter Options</h3>

//             {/* Rental Months */}
//             <div className="filter-group mb-4">
//               <label className="block mb-2">Rental Months</label>
//               <select
//                 value={rentalMonths}
//                 onChange={(e) => setRentalMonths(e.target.value)}
//                 className="rental-months-dropdown"
//               >
//                 <option value={1}>1 Month</option>
//                 <option value={2}>2 Months</option>
//                 <option value={3}>3 Months</option>
//                 <option value={6}>6 Months</option>
//                 <option value={12}>12 Months</option>
//               </select>
//             </div>

//             {/* Price Range */}
//             <div className="filter-group mb-4">
//               <label className="block mb-2">Price Range</label>
//               <input
//                 type="range"
//                 min="1000"
//                 max="10000"
//                 value={priceRange[0]}
//                 onChange={(e) =>
//                   setPriceRange([parseInt(e.target.value), priceRange[1]])
//                 }
//               />
//               <input
//                 type="range"
//                 min="1000"
//                 max="10000"
//                 value={priceRange[1]}
//                 onChange={(e) =>
//                   setPriceRange([priceRange[0], parseInt(e.target.value)])
//                 }
//               />
//               <p>₹{priceRange[0]} - ₹{priceRange[1]}</p>
//             </div>

//             {/* Room Type */}
//             <div className="filter-group mb-4">
//               <label className="block mb-2">Room Type</label>
//               <select
//                 value={roomType}
//                 onChange={(e) => setRoomType(e.target.value)}
//               >
//                 <option>Single Room</option>
//                 <option>Double Room</option>
//                 <option>Studio Apartment</option>
//               </select>
//             </div>

//             {/* Property Types (Checkboxes) */}
//             <div className="filter-group mb-6">
//               <h4 className="text-lg font-semibold mb-2">Property Types</h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {[
//                   "Flat/Apartment",
//                   "Independent/Builder Floor",
//                   "Independent House/Villa",
//                   "Residential Land",
//                   "1 RK/Studio Apartment",
//                   "Farm House",
//                   "Serviced Apartments",
//                   "Other"
//                 ].map((property, idx) => (
//                   <label key={idx} className="flex items-center gap-2">
//                     <input type="checkbox" checked readOnly className="w-4 h-4" />
//                     {property}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button
//                 className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//                 onClick={() => {
//                   setShowFilter(false);
//                   handleSearch();
//                 }}
//               >
//                 Apply Filters
//               </button>
//               <button
//                 className="text-blue-600 px-5 py-2 rounded-md hover:underline"
//                 onClick={() => setShowFilter(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//         {/* Filter Modal Ends */}

//         <div className="about-lines mt-8">
//           <p>
//             Finding the right place to stay as a student can be tough. But we make it easy! Browse through affordable and convenient rooms near your college.
//           </p>
//           <p>
//             Book your ideal room today and enjoy a stress-free student life!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;







// import React, { useState } from 'react';
// import './Hero.css';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const [destination, setDestination] = useState('');
//   const [showFilter, setShowFilter] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(`/residencies?destination=${encodeURIComponent(destination)}`);
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
//             Find Your Perfect Room
//           </motion.h1>

//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             Choose from a variety of student-friendly rooms near your campus.
//           </motion.span>
//           <br />
//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//           >
//             Book easily and start your student life without the stress.
//           </motion.span>
//         </motion.div>

//         <div className="advanced-search">
//           <input
//             type="text"
//             placeholder="Search Rooms"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />

//           <button
//             className="filter-btn"
//             onClick={() => setShowFilter(!showFilter)}
//           >
//             Filters
//           </button>
//           <button onClick={handleSearch} className="search-btn">
//             Search
//           </button>
//         </div>

//         {/* Filter Modal */}
//         {showFilter && (
//           <div className="filter-modal">
//             <h3 className="text-xl font-semibold mb-4">Property Types</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
//               {[
//                 "Flat/Apartment",
//                 "Independent/Builder Floor",
//                 "Independent House/Villa",
//                 "Residential Land",
//                 "1 RK/Studio Apartment",
//                 "Other"
//               ].map((property, idx) => (
//                 <label key={idx} className="flex items-center gap-2">
//                   <input type="checkbox" checked readOnly className="w-4 h-4" />
//                   {property}
//                 </label>
//               ))}
//             </div>

//             <div className="flex gap-4">
//               <button
//                 className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//                 onClick={() => {
//                   setShowFilter(false);
//                   handleSearch();
//                 }}
//               >
//                 Apply Filters
//               </button>
//               <button
//                 className="text-blue-600 px-5 py-2 rounded-md hover:underline"
//                 onClick={() => setShowFilter(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="about-lines mt-8">
//           <p>
//             Finding the right place to stay as a student can be tough. But we make it easy! Browse through affordable and convenient rooms near your college.
//           </p>
//           <p>
//             Book your ideal room today and enjoy a stress-free student life!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React, { useState } from 'react';
// import './Hero.css';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const [destination, setDestination] = useState('');
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedProperties, setSelectedProperties] = useState([]);
//   const [budget, setBudget] = useState([1000, 10000]);
//   const [bedrooms, setBedrooms] = useState('');
//   const [furnishing, setFurnishing] = useState('');

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(`/residencies?destination=${encodeURIComponent(destination)}&properties=${encodeURIComponent(selectedProperties.join(','))}&budget=${budget.join(',')}&bedrooms=${bedrooms}&furnishing=${furnishing}`);
//   };

//   const handlePropertyChange = (property) => {
//     setSelectedProperties((prevSelected) =>
//       prevSelected.includes(property)
//         ? prevSelected.filter((item) => item !== property)
//         : [...prevSelected, property]
//     );
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
//             Find Your Perfect Room
//           </motion.h1>

//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             Choose from a variety of student-friendly rooms near your campus.
//           </motion.span>
//           <br />
//           <motion.span
//             className="black"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//           >
//             Book easily and start your student life without the stress.
//           </motion.span>
//         </motion.div>

//         <div className="advanced-search">
//           <input
//             type="text"
//             placeholder="Search Rooms"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />
//           <button
//             className="filter-btn"
//             onClick={() => setShowFilter(!showFilter)}
//           >
//             Filters
//           </button>
//           <button onClick={handleSearch} className="search-btn">
//             Search
//           </button>
//         </div>

//         {/* Filter Modal */}
//         {showFilter && (
//           <div className="filter-modal">
//             <h3 className="text-xl font-semibold mb-4">Property Types</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
//               {[
//                 "Flat/Apartment",
//                 "Independent House/Villa",
//                 "Residential Land",
//                 "Other"
//               ].map((property, idx) => (
//                 <label key={idx} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedProperties.includes(property)}
//                     onChange={() => handlePropertyChange(property)}
//                     className="w-4 h-4"
//                   />
//                   {property}
//                 </label>
//               ))}
//             </div>
//             <div className="horizontal-filters">
//             {/* Budget Filter */}
//             <div className="filter-group mb-6">
//               <label className="block mb-2">Budget (₹)</label>
//               <input
//                 type="range"
//                 min="1000"
//                 max="100000"
//                 value={budget[0]}
//                 onChange={(e) =>
//                   setBudget([parseInt(e.target.value), budget[1]])
//                 }
//                 className="w-full"
//               />
//               <input
//                 type="range"
//                 min="1000"
//                 max="100000"
//                 value={budget[1]}
//                 onChange={(e) =>
//                   setBudget([budget[0], parseInt(e.target.value)])
//                 }
//                 className="w-full"
//               />
//               <p>₹{budget[0]} - ₹{budget[1]}</p>
//             </div>

//             {/* Bedrooms Filter */}
//             <div className="filter-group mb-6">
//               <label className="block mb-2">Bedrooms</label>
//               <select
//                 value={bedrooms}
//                 onChange={(e) => setBedrooms(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Any</option>
//                 <option value="1">1 BHK</option>
//                 <option value="2">2 BHK</option>
//                 <option value="3">3 BHK</option>
//               </select>
//             </div>

//             {/* Furnishing Filter */}
//             <div className="filter-group mb-6">
//               <label className="block mb-2">Furnishing</label>
//               <select
//                 value={furnishing}
//                 onChange={(e) => setFurnishing(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Any</option>
//                 <option value="Furnished">Furnished</option>
//                 <option value="Semi-Furnished">Semi-Furnished</option>
//                 <option value="Unfurnished">Unfurnished</option>
//               </select>
//             </div>
//           </div>

//             <div className="flex gap-4">
//               <button
//                 className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//                 onClick={() => {
//                   setShowFilter(false);
//                   handleSearch();
//                 }}
//               >
//                 Apply Filters
//               </button>
//               <button
//                 className="text-blue-600 px-5 py-2 rounded-md hover:underline"
//                 onClick={() => setShowFilter(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="about-lines mt-8">
//           <p>
//             Finding the right place to stay as a student can be tough. But we make it easy! Browse through affordable and convenient rooms near your college.
//           </p>
//           <p>
//             Book your ideal room today and enjoy a stress-free student life!
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
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [budget, setBudget] = useState([1000, 10000]);
  const [bedrooms, setBedrooms] = useState('');
  const [furnishing, setFurnishing] = useState('');

  const navigate = useNavigate();

  // Function to handle search and navigate to the residencies page with filters
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      destination: destination,
      properties: selectedProperties.join(','),
      budget: budget.join(','),
      bedrooms: bedrooms,
      furnishing: furnishing,
    });

    // Debug: check if the URL params are being set correctly
    console.log("Search query:", `/residencies?${queryParams.toString()}`);

    // Navigate to the residencies page with the query params
    // navigate(`/residencies?${queryParams.toString()}`);
    navigate(`/residencies?destination=${encodeURIComponent(destination)}`);
  };

  const handlePropertyChange = (property) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(property)
        ? prevSelected.filter((item) => item !== property)
        : [...prevSelected, property]
    );
  };

  // Apply filters and navigate
  const handleApplyFilters = () => {
    console.log("Filters applied");

    // Close the filter modal
    setShowFilter(false);

    // Navigate to the residencies page with the selected filters
    handleSearch();
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
            placeholder="Search Rooms"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </button>
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>

        {/* Filter Modal */}
        {showFilter && (
          <div className="filter-modal">
            <h3 className="text-xl font-semibold mb-4">Property Types</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {[
                "Flat/Apartment",
                "Independent House/Villa",
                "Residential Land",
                "Other"
              ].map((property, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedProperties.includes(property)}
                    onChange={() => handlePropertyChange(property)}
                    className="w-4 h-4"
                  />
                  {property}
                </label>
              ))}
            </div>

            <div className="horizontal-filters">
              {/* Budget Filter */}
              <div className="filter-group mb-6">
                <label className="block mb-2">Budget (₹)</label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  value={budget[0]}
                  onChange={(e) =>
                    setBudget([parseInt(e.target.value), budget[1]])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  value={budget[1]}
                  onChange={(e) =>
                    setBudget([budget[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <p>₹{budget[0]} - ₹{budget[1]}</p>
              </div>

              {/* Bedrooms Filter */}
              <div className="filter-group mb-6">
                <label className="block mb-2">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                </select>
              </div>

              {/* Furnishing Filter */}
              <div className="filter-group mb-6">
                <label className="block mb-2">Furnishing</label>
                <select
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Any</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleApplyFilters} // This triggers the navigation with filters
              >
                Apply Filters
              </button>
              <button
                className="text-blue-600 px-5 py-2 rounded-md hover:underline"
                onClick={() => setShowFilter(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="about-lines mt-8">
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