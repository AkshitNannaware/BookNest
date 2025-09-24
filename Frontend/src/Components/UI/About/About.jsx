import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./About.css";
import { API_URL } from "../../../config";

const About = ({ residencies = [] }) => {
  const [rooms, setRooms] = useState(residencies);
  const [loading, setLoading] = useState(!residencies || residencies.length === 0);
  const [error, setError] = useState(null);

  

  // ✅ Fetch rooms if prop is empty
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/rooms/all`);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.rooms)) {
        setRooms(data.rooms);
      } else {
        setRooms([]);
        setError("No rooms found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!residencies || residencies.length === 0) {
      fetchRooms();
    }
  }, [residencies]);

  const getImageSrc = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      const imageUrl = photos[0];
      if (imageUrl.startsWith("/uploads")) {
        return `${API_URL}${imageUrl}`;
      } else if (imageUrl.startsWith("http")) {
        return imageUrl;
      }
    }
    return "https://via.placeholder.com/300x200?text=No+Image+Available";
  };

  const topResidencies = rooms.slice(0, 6);

  return (
    <section className="about">
      <h2 className="primaryText">Top Rooms for Students :-</h2>

      {loading && <p>Loading rooms...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && topResidencies.length > 0 ? (
        <Swiper
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="about-swiper"
        >
          {topResidencies.map((residency, index) => (
            <SwiperSlide key={index}>
              <div className="about-card">
                <img
                  src={getImageSrc(residency.photos)}
                  alt={residency.title || "Room"}
                  className="img1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image+Available";
                  }}
                />
                <h3 className="primaryText1">{residency.title}</h3>
                <p className="location">{residency.location}</p>
                <p className="rupees">₹{residency.rent}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        !loading && !error && <p>No rooms available.</p>
      )}
    </section>
  );
};

export default About;