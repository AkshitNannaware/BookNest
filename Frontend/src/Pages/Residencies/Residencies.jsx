// import React, { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import '../Residencies/Residencies.css';

// const Residencies = () => {

//   const [residenciesList, setResidenciesList] = useState([]);

//   const Residencies = () => {
//     const location = useLocation();
  
//     // Get search parameters from URL
//     const searchParams = new URLSearchParams(location.search);
//     const destination = searchParams.get("destination")?.toLowerCase() || "";
  

//   useEffect(() => {
//     const fetchResidencies = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/rooms');
//         const data = await response.json();
//         setResidenciesList(data);
//       } catch (error) {
//         console.error('Error fetching residencies:', error);
//       }
//     };

//     fetchResidencies();
//   }, []);

//   // Sample data for residencies (you can replace this with your API data)
//   // const residenciesList = [
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//   //     price: "Rs.3,950,000",
//   //     name: "Mannat House",
//   //     location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//   //     price: "Rs.5,510,000",
//   //     name: "Bajaj Mansion",
//   //     location: "Bandra(West), Wardha, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//   //     price: "Rs.2,977,550",
//   //     name: "Gupta Mansion",
//   //     location: "Kolkata, West Bengal",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//   //     price: "Rs.3,950,900",
//   //     name: "Aliva Priva Jardin",
//   //     location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//   //     price: "Rs.2,990,990",
//   //     name: "Asatti Garden City",
//   //     location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//   //     price: "Rs.1,950,900",
//   //     name: "J.K. House",
//   //     location: "Ghatkopar(W), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//   //     price: "Rs.3,950,000",
//   //     name: "Mannat House",
//   //     location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//   //     price: "Rs.5,510,000",
//   //     name: "Bajaj Mansion",
//   //     location: "Bandra(West), Wardha, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//   //     price: "Rs.2,977,550",
//   //     name: "Gupta Mansion",
//   //     location: "Kolkata, West Bengal",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//   //     price: "Rs.3,950,900",
//   //     name: "Aliva Priva Jardin",
//   //     location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//   //     price: "Rs.2,990,990",
//   //     name: "Asatti Garden City",
//   //     location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//   //     price: "Rs.1,950,900",
//   //     name: "J.K. House",
//   //     location: "Ghatkopar(W), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//   //     price: "Rs.3,950,000",
//   //     name: "Mannat House",
//   //     location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//   //     price: "Rs.5,510,000",
//   //     name: "Bajaj Mansion",
//   //     location: "Bandra(West), Wardha, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//   //     price: "Rs.2,977,550",
//   //     name: "Gupta Mansion",
//   //     location: "Kolkata, West Bengal",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//   //     price: "Rs.3,950,900",
//   //     name: "Aliva Priva Jardin",
//   //     location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//   //     price: "Rs.2,990,990",
//   //     name: "Asatti Garden City",
//   //     location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//   //   },
//   //   {
//   //     img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//   //     price: "Rs.1,950,900",
//   //     name: "J.K. House",
//   //     location: "Ghatkopar(W), Mumbai, Maharashtra",
//   //   },
//   // ];


//   const filteredResidencies = residenciesList.filter((residency) =>
//     residency.location.toLowerCase().includes(destination)
//   );


//   return (
//     <section className="r-wrapper">
//       <div className="r-container">
//         <div className="r-head">
//           <span className="orangeText1">Best Choices</span> <br />
//           <span className="primaryText1">Popular Residencies</span>
//         </div>

//         <p className="subText">
//             {destination
//               ? `Showing results for "${destination}"`
//               : "Find cozy and budget-friendly places to stay in top student cities."}
//           </p>

//         {/* Grid Layout */}
//         <div className="residencies-grid">
//         {filteredResidencies.length > 0 ? (
//             filteredResidencies.map((curEle, index) => (
//           // {residenciesList.map((curEle, index) => (
//             <div key={index} className="residency-item">
//               <img
//                 // src={curEle.img}
//                 // alt={curEle.name}
//                 src={curEle.photos[0]} // Display the first photo
//                 alt={curEle.title}
//                 className="image-residencies img1"
//               />
//               <p className="rupees">
//                 <strong>Rs:</strong> {curEle.price}
//               </p>
//               <h3 className="primaryText1">{curEle.name}</h3>
//               <p className="location">{curEle.location}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Residencies;







// import React, { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import "../Residencies/Residencies.css";

// const Residencies = () => {
//   const [residenciesList, setResidenciesList] = useState([]);
//   const location = useLocation();

//   // Read search query from URL
//   const searchParams = new URLSearchParams(location.search);
//   const destination = searchParams.get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     const fetchResidencies = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/rooms');
//         const data = await response.json();
//         setResidenciesList(data);
//       } catch (error) {
//         console.error('Error fetching residencies:', error);
//       }
//     };

//     const residenciesList = [
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//             price: "Rs.3,950,000",
//             name: "Mannat House",
//             location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//             price: "Rs.5,510,000",
//             name: "Bajaj Mansion",
//             location: "Bandra(West), Wardha, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//             price: "Rs.2,977,550",
//             name: "Gupta Mansion",
//             location: "Kolkata, West Bengal",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//             price: "Rs.3,950,900",
//             name: "Aliva Priva Jardin",
//             location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//             price: "Rs.2,990,990",
//             name: "Asatti Garden City",
//             location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//             price: "Rs.1,950,900",
//             name: "J.K. House",
//             location: "Ghatkopar(W), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//             price: "Rs.3,950,000",
//             name: "Mannat House",
//             location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//             price: "Rs.5,510,000",
//             name: "Bajaj Mansion",
//             location: "Bandra(West), Wardha, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//             price: "Rs.2,977,550",
//             name: "Gupta Mansion",
//             location: "Kolkata, West Bengal",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//             price: "Rs.3,950,900",
//             name: "Aliva Priva Jardin",
//             location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//             price: "Rs.2,990,990",
//             name: "Asatti Garden City",
//             location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//             price: "Rs.1,950,900",
//             name: "J.K. House",
//             location: "Ghatkopar(W), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
//             price: "Rs.3,950,000",
//             name: "Mannat House",
//             location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
//             price: "Rs.5,510,000",
//             name: "Bajaj Mansion",
//             location: "Bandra(West), Wardha, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
//             price: "Rs.2,977,550",
//             name: "Gupta Mansion",
//             location: "Kolkata, West Bengal",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
//             price: "Rs.3,950,900",
//             name: "Aliva Priva Jardin",
//             location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
//             price: "Rs.2,990,990",
//             name: "Asatti Garden City",
//             location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
//           },
//           {
//             img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
//             price: "Rs.1,950,900",
//             name: "J.K. House",
//             location: "Ghatkopar(W), Mumbai, Maharashtra",
//           },
//         ];

//     fetchResidencies();
//   }, []);

//   // Filter residencies based on search
//   const filteredResidencies = residenciesList.filter((residency) =>
//     residency.location.toLowerCase().includes(destination)
//   );

//   return (
//     <section className="r-wrapper">
//       <div className="r-container">
//         <div className="r-head">
//           <span className="orangeText1">Affordable Living</span>
//           <span className="primaryText1">Residencies for Students</span>
//           <p className="subText">
//             {destination
//               ? `Showing results for "${destination}"`
//               : "Find cozy and budget-friendly places to stay in top student cities."}
//           </p>
//         </div>

//         <div className="residencies-grid">
//           {filteredResidencies.length > 0 ? (
//             filteredResidencies.map((curEle, index) => (
//               <div key={index} className="residency-item">
//                 <img
//                   src={curEle.photos?.[0] || '/default-placeholder.jpg'}
//                   alt={curEle.name}
//                   className="img1"
//                 />
//                 <h3 className="primaryText1">{curEle.name}</h3>
//                 <p className="location">{curEle.location}</p>
//                 <p className="rupees">{curEle.price}</p>
//                 <button className="book-now-btn">Book Now</button>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">
//               No residencies found {destination && `for "${destination}"`}
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Residencies;



import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "../Residencies/Residencies.css";
import { useNavigate } from "react-router-dom";

const Residencies = ({ residencies }) => {
  const [residenciesList, setResidenciesList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Read search query from URL
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        const data = await response.json();
        setResidenciesList(data);
      } catch (error) {
        console.error('Error fetching residencies:', error);
        // If fetch fails, use dummy data
        const dummyData = [
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
            price: "Rs.5000 / month",
            area: "Vijay Nagar",
            location: "Opposite C21 mall",
          },
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
            price: "Rs.5500 / month",
            area: "MahaLaxmi Nagar",
            location: "Near Nipaniya",
          },
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
            price: "Rs.6000 / month",
            area: "60, feet road",
            location: "Airport Road",
          },
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
            price: "Rs.5000 / month",
            area: "LIG Colony",
            location: "near Zoo",
          },
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
            price: "Rs.6500 / month",
            area: "Cosmos City",
            location: "Bicholi Mardana",
          },
          {
            img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
            price: "Rs.7000 / month",
            area: "Shrinath ji Vihar",
            location: "Near Agrawal Public School",
          },
        ];
        setResidenciesList(dummyData);
      }
    };

    fetchResidencies();
  }, []);

  // Filter residencies based on search
  const filteredResidencies = residenciesList.filter((residency) =>
    residency.location.toLowerCase().includes(destination)
  );

  const handleBookNow = (room) => {
    navigate("/booking", { state: { room } }); // Pass room details via state
  };

  return (
    <section className="r-wrapper">
      {/* Same code you wrote */}
      <div className="r-container">
        <div className="r-head">
          <span className="orangeText1">Affordable Living</span>
          <span className="primaryText1">Residencies for Students</span>
          <p className="subText">
            {destination
              ? `Showing results for "${destination}"`
              : "Find cozy and budget-friendly places to stay in top student cities."}
          </p>
        </div>

        <div className="residencies-grid">
          {filteredResidencies.length > 0 ? (
            filteredResidencies.map((room, index) => (
              <div key={index} className="residency-item">
                <img
                  src={room.img || '/default-placeholder.jpg'}
                  alt={room.name}
                  className="img1"
                />
                <h3 className="primaryText1">{room.area}</h3>
                <p className="location">{room.location}</p>
                <p className="rupees">{room.price}</p>
                <button className="book-now-btn"   onClick={() => handleBookNow(room)} >Book Now</button>
              </div>
            ))
          ) : (
            <p className="no-results">
              No residencies found {destination && `for "${destination}"`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Residencies;
