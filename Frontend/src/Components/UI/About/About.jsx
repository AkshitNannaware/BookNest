import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./About.css";

const About = ({ residencies }) => {
  const topResidencies = residencies.slice(0, 5);

  return (
    <section className="about-section">
      <h2 className="primaryText">Top Rooms for Students :-</h2>

      <Swiper
        slidesPerView={4}
        grabCursor={true}
        className="about-swiper"
      >
        {topResidencies.map((residency, index) => (
          <SwiperSlide key={index}>
            <div className="about-card">
              <img src={residency.img} alt={residency.name} className="img1" />
              <h3 className="primaryText1">{residency.name}</h3>
              <p className="location">{residency.location}</p>
              <p className="rupees">{residency.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default About;
