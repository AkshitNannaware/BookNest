// import React, { useEffect, useState, useMemo } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import "../Residencies/Residencies.css";

// const Residencies = ({ allRooms = [] }) => {
//   const [residenciesList, setResidenciesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const searchParams = new URLSearchParams(location.search);
//   const destination = searchParams.get("search")?.toLowerCase() || "";

//   const fetchRooms = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/api/rooms/all");
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (Array.isArray(data.rooms)) {
//         setResidenciesList(data.rooms);
//       } else {
//         setError("No room data found.");
//         setResidenciesList([]);
//       }
//     } catch (err) {
//       setError(`Error fetching rooms: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (residenciesList.length === 0) {
//       if (allRooms.length > 0) {
//         setResidenciesList(allRooms);
//         setLoading(false);
//       } else {
//         fetchRooms();
//       }
//     }
//   }, [allRooms, residenciesList]);

//   const handleCardClick = (room) => {
//     navigate(`/room-details/${room._id}`, { state: { room } });
//   };

//   const filteredResidencies = useMemo(() => {
//     return residenciesList.filter((residency) =>
//       residency?.location?.toLowerCase().includes(destination)
//     );
//   }, [residenciesList, destination]);

//   const getImageSrc = (photos) => {
//     if (Array.isArray(photos) && photos.length > 0) {
//       const imageUrl = photos[0];   
//       if (imageUrl.startsWith("/uploads")) {
//         return `http://localhost:5000${imageUrl}`; // Local image path
//       } else if (imageUrl.startsWith("http")) {
//         return imageUrl; // External URL
//       }
//     }
//     return 'https://via.placeholder.com/300x200?text=No+Image+Available';
//   };

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

//         {loading && (
//           <div className="loading">
//             <p>Loading rooms...</p>
//             <div className="spinner" />
//           </div>
//         )}

//         {error && (
//           <div className="error-message">
//             <p>{error}</p>
//             <button className="retry-button" onClick={fetchRooms}>Retry</button>
//           </div>
//         )}

//         <div className="residencies-grid">
//           {!loading && !error && filteredResidencies.length > 0 ? (
//             filteredResidencies.map((room) => (
//               <div
//                 key={room._id}
//                 className="residency-item"
//                 onClick={() => handleCardClick(room)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img
//                   src={getImageSrc(room.photos)}
//                   alt={room.title || "Room"}
//                   className="img1"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/300x200?text=No+Image+Available';
//                   }}
//                 />
//                 <h3 className="primaryText1">{room.title}</h3>
//                 <p className="location"><strong>Location:</strong> {room.location}</p>
//                 <p className="rupees"><strong>Rent:</strong> ₹{room.rent}</p>
//               </div>
//             ))
//           ) : !loading && !error && (
//             <p className="no-results">
//               {`No residencies found${destination ? ` for "${destination}"` : ""}.`}
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Residencies;




import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../Residencies/Residencies.css";

const Residencies = ({ allRooms = [] }) => {
  const [residenciesList, setResidenciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const itemRefs = useRef([]);

  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get("search")?.toLowerCase() || "";

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/rooms/all");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.rooms)) {
        setResidenciesList(data.rooms);
      } else {
        setError("No room data found.");
        setResidenciesList([]);
      }
    } catch (err) {
      setError(`Error fetching rooms: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (residenciesList.length === 0) {
      if (allRooms.length > 0) {
        setResidenciesList(allRooms);
        setLoading(false);
      } else {
        fetchRooms();
      }
    }
  }, [allRooms, residenciesList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [residenciesList]);

  const handleCardClick = (room) => {
    navigate(`/room-details/${room._id}`, { state: { room } });
  };

  const filteredResidencies = useMemo(() => {
    return residenciesList.filter((residency) =>
      residency?.location?.toLowerCase().includes(destination)
    );
  }, [residenciesList, destination]);

  const getImageSrc = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      const imageUrl = photos[0];   
      if (imageUrl.startsWith("/uploads")) {
        return `http://localhost:5000${imageUrl}`;
      } else if (imageUrl.startsWith("http")) {
        return imageUrl;
      }
    }
    return 'https://via.placeholder.com/300x200?text=No+Image+Available';
  };

  return (
    <section className="r-wrapper">
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

        {loading && (
          <div className="loading">
            <p>Loading rooms...</p>
            <div className="spinner" />
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-button" onClick={fetchRooms}>Retry</button>
          </div>
        )}

        <div className="residencies-grid">
          {!loading && !error && filteredResidencies.length > 0 ? (
            filteredResidencies.map((room, index) => (
              <div
                key={room._id}
                className="residency-item fade-in-up"
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleCardClick(room)}
                // style={{ cursor: "pointer" }}
                style={{ cursor: "pointer", animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={getImageSrc(room.photos)}
                  alt={room.title || "Room"}
                  className="img1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image+Available';
                  }}
                />
                <h3 className="primaryText1">{room.title}</h3>
                <p className="location"><strong>Location:</strong> {room.location}</p>
                <p className="rupees"><strong>Rent:</strong> ₹{room.rent}</p>
              </div>
            ))
          ) : !loading && !error && (
            <p className="no-results">
              {`No residencies found${destination ? ` for "${destination}"` : ""}.`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Residencies;