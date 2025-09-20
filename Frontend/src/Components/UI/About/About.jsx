import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./About.css";

const About = ({ residencies }) => {
  const topResidencies = residencies.slice(0, 6);

  const getImageSrc = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      const imageUrl = photos[0];
      if (imageUrl.startsWith("/uploads")) {
        return `http://localhost:5000${imageUrl}`;
      } else if (imageUrl.startsWith("http")) {
        return imageUrl;
      }
    }
    return "https://via.placeholder.com/300x200?text=No+Image+Available";
  };

  return (
    <section className="about">
      <h2 className="primaryText">Top Rooms for Students :-</h2>

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
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available";
                }}
              />
              <h3 className="primaryText1">{residency.title}</h3>
              <p className="location">{residency.location}</p>
              <p className="rupees">₹{residency.rent}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default About;