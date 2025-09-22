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
//     const queryParams = new URLSearchParams();

//     if (destination) queryParams.append('destination', destination);
//     if (selectedProperties.length > 0) queryParams.append('properties', selectedProperties.join(','));
//     if (budget.length === 2) queryParams.append('budget', budget.join(','));
//     if (bedrooms) queryParams.append('bedrooms', bedrooms);
//     if (furnishing) queryParams.append('furnishing', furnishing);

//     console.log("Search query:", `/residencies?${queryParams.toString()}`);
//     navigate(`/residencies?${queryParams.toString()}`);
//   };

//   const handlePropertyChange = (property) => {
//     setSelectedProperties((prevSelected) =>
//       prevSelected.includes(property)
//         ? prevSelected.filter((item) => item !== property)
//         : [...prevSelected, property]
//     );
//   };

//   const handleApplyFilters = () => {
//     console.log("Filters applied");
//     setShowFilter(false);
//     handleSearch();
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
//               {/* Budget Filter */}
//               <div className="filter-group mb-6">
//                 <label className="block mb-2">Budget (₹)</label>
//                 <input
//                   type="range"
//                   min="1000"
//                   max="100000"
//                   value={budget[0]}
//                   onChange={(e) =>
//                     setBudget([parseInt(e.target.value), budget[1]])
//                   }
//                   className="w-full"
//                 />
//                 <input
//                   type="range"
//                   min="1000"
//                   max="100000"
//                   value={budget[1]}
//                   onChange={(e) =>
//                     setBudget([budget[0], parseInt(e.target.value)])
//                   }
//                   className="w-full"
//                 />
//                 <p>₹{budget[0]} - ₹{budget[1]}</p>
//               </div>

//               {/* Bedrooms Filter */}
//               <div className="filter-group mb-6">
//                 <label className="block mb-2">Bedrooms</label>
//                 <select
//                   value={bedrooms}
//                   onChange={(e) => setBedrooms(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">Any</option>
//                   <option value="1">1 BHK</option>
//                   <option value="2">2 BHK</option>
//                   <option value="3">3 BHK</option>
//                 </select>
//               </div>

//               {/* Furnishing Filter */}
//               <div className="filter-group mb-6">
//                 <label className="block mb-2">Furnishing</label>
//                 <select
//                   value={furnishing}
//                   onChange={(e) => setFurnishing(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">Any</option>
//                   <option value="Furnished">Furnished</option>
//                   <option value="Semi-Furnished">Semi-Furnished</option>
//                   <option value="Unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//                 onClick={handleApplyFilters}
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
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [budget, setBudget] = useState([1000, 10000]);
  const [bedrooms, setBedrooms] = useState('');
  const [furnishing, setFurnishing] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (destination) queryParams.append('destination', destination);
    if (selectedProperties.length > 0) queryParams.append('properties', selectedProperties.join(','));
    if (budget.length === 2) queryParams.append('budget', budget.join(','));
    if (bedrooms) queryParams.append('bedrooms', bedrooms);
    if (furnishing) queryParams.append('furnishing', furnishing);

    console.log("Search query:", `/residencies?${queryParams.toString()}`);
    navigate(`/residencies?${queryParams.toString()}`);
  };

  const handlePropertyChange = (property) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(property)
        ? prevSelected.filter((item) => item !== property)
        : [...prevSelected, property]
    );
  };

  const handleApplyFilters = () => {
    console.log("Filters applied");
    setShowFilter(false);
    handleSearch();
  };

  return (
    <section className="Hero">
      <div className="hero-overlay">
        <img
          src="/WhatsApp Image 2025-04-14 at 11.17.47_e5271dee.jpg"
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
          <>
            <div className="modal-overlay" onClick={() => setShowFilter(false)}></div>
            <div className="filter-modal">
              <span className="close-modal" onClick={() => setShowFilter(false)}>&times;</span>
              <h3>Property Types</h3>

              <div className="checkbox-group">
                {[
                  "Flat/Apartment",
                  "Independent House/Villa",
                  "Residential Land",
                  "Other"
                ].map((property, idx) => (
                  <label key={idx}>
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property)}
                      onChange={() => handlePropertyChange(property)}
                    />
                    {property}
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <label>Budget (₹)</label>
                <div className="range-inputs">
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    value={budget[0]}
                    onChange={(e) =>
                      setBudget([parseInt(e.target.value), budget[1]])
                    }
                  />
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    value={budget[1]}
                    onChange={(e) =>
                      setBudget([budget[0], parseInt(e.target.value)])
                    }
                  />
                </div>
                <p>₹{budget[0]} - ₹{budget[1]}</p>
              </div>

              <div className="filter-group">
                <label>Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Furnishing</label>
                <select
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div className="filter-buttons">
                <button
                  className="apply-filters-btn"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowFilter(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

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