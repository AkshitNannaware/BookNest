import React from "react";
import '../Residencies/Residencies.css';

const Residencies = () => {
  const residenciesList = [
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
      price: "Rs.3,950,000",
      name: "Mannat House",
      location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
      price: "Rs.5,510,000",
      name: "Bajaj Mansion",
      location: "Bandra(West), Wardha, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
      price: "Rs.2,977,550",
      name: "Gupta Mansion",
      location: "Kolkata, West Bengal",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
      price: "Rs.3,950,900",
      name: "Aliva Priva Jardin",
      location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
      price: "Rs.2,990,990",
      name: "Asatti Garden City",
      location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
      price: "Rs.1,950,900",
      name: "J.K. House",
      location: "Ghatkopar(W), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
      price: "Rs.3,950,000",
      name: "Mannat House",
      location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
      price: "Rs.5,510,000",
      name: "Bajaj Mansion",
      location: "Bandra(West), Wardha, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
      price: "Rs.2,977,550",
      name: "Gupta Mansion",
      location: "Kolkata, West Bengal",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
      price: "Rs.3,950,900",
      name: "Aliva Priva Jardin",
      location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
      price: "Rs.2,990,990",
      name: "Asatti Garden City",
      location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
      price: "Rs.1,950,900",
      name: "J.K. House",
      location: "Ghatkopar(W), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_b3aa38c9.jpg",
      price: "Rs.3,950,000",
      name: "Mannat House",
      location: "Land's End, Bandstand, Bandra(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.31_f4aeb742.jpg",
      price: "Rs.5,510,000",
      name: "Bajaj Mansion",
      location: "Bandra(West), Wardha, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_73b9e805.jpg",
      price: "Rs.2,977,550",
      name: "Gupta Mansion",
      location: "Kolkata, West Bengal",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.32_e3225993.jpg",
      price: "Rs.3,950,900",
      name: "Aliva Priva Jardin",
      location: "Shimpoli Rd, Borivali(West), Mumbai, Maharashtra",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_6e8e27bf.jpg",
      price: "Rs.2,990,990",
      name: "Asatti Garden City",
      location: "48 Venkatachala Mudali St, Periamet, Chennai, Tamilnadu",
    },
    {
      img: "/WhatsApp Image 2025-04-04 at 13.47.33_9351b488.jpg",
      price: "Rs.1,950,900",
      name: "J.K. House",
      location: "Ghatkopar(W), Mumbai, Maharashtra",
    },
  ];

  return (
    <section className="r-wrapper">
      <div className="r-container">
        <div className="r-head">
          <span className="orangeText1">Best Choices</span> <br />
          <span className="primaryText1">Popular Residencies</span>
        </div>

        {/* Grid Layout */}
        <div className="residencies-grid">
          {residenciesList.map((curEle, index) => (
            <div key={index} className="residency-item">
              <img
                src={curEle.img}
                alt={curEle.name}
                className="image-residencies img1"
              />
              {/* <p className="rupees">
                <strong>Rs:</strong> {curEle.price}
              </p>
              <h3 className="primaryText1">{curEle.name}</h3>
              <p className="location">{curEle.location}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Residencies;
