import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../Residencies/Residencies.css";

const Residencies = () => {
  const [residenciesList, setResidenciesList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
    
  // Read search query from URL
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms/all");
        const data = await response.json();
  
        if (response.ok) {
          setResidenciesList(data.rooms); // assuming backend sends { rooms: [...] }
        } else {
          console.error("Failed to fetch rooms:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
  
    fetchRooms();
  }, []);

  const handleCardClick = (room) => {
    navigate(`/room-details/${room._id}`, { state: { room } }); // passing room data too
  };

  const filteredResidencies = residenciesList.filter((residency) =>
    residency.location.toLowerCase().includes(destination)
  );

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

        <div className="residencies-grid">
          {filteredResidencies.length > 0 ? (
            filteredResidencies.map((room) => {
              console.log(room.title, room.photos); // log inside the map loop
              return (
                <div
                  key={room._id}
                  className="residency-item"
                  onClick={() => handleCardClick(room)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={room.photos?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={room.title}
                    className="img1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-placeholder.jpg';
                    }}
                  />
                  <h3 className="primaryText1">{room.title}</h3>
                  <p className="location"><strong>Location:</strong> {room.location}</p>
                  <p className="rupees"><strong>Rent:</strong> ₹{room.rent}</p>
                </div>
              );
            })
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