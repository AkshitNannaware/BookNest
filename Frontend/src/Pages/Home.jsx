// import React from 'react';
// import Hero from '../Components/UI/Hero/Hero';
// import Residencies from './Residencies/Residencies';



// const Home = () => {
//   return (
//     <>
//      <Hero/>
//      {/* <Residencies/> */}
//     </>
//   )
// }

// export default Home


import React, { useEffect, useState } from "react";
import Hero from "../Components/UI/Hero/Hero";
import About from "../Components/UI/About/About";
import Residencies from "./Residencies/Residencies";

const Home = () => {
  const [residenciesList, setResidenciesList] = useState([]);

  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms");
        const data = await response.json();
        setResidenciesList(data);
      } catch (error) {
        console.error("Error fetching residencies:", error);
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

  return (
    <>
      <Hero />
      <About residencies={residenciesList} />
      {/* <Residencies residencies={residenciesList} /> */}
    </>
  );
};

export default Home;
