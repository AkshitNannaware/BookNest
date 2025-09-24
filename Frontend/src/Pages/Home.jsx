import React, { useEffect, useState } from "react";
import Hero from "../Components/UI/Hero/Hero";
import About from "../Components/UI/About/About";
import { API_URL } from "../config";

const Home = () => {
  const [residenciesList, setResidenciesList] = useState([]);

  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        const response = await fetch(`${API_URL}/api/rooms`);
        const data = await response.json();
        console.log(data);  // Log the fetched data for debugging
        setResidenciesList(data);
      } catch (error) {
        console.error("Error fetching residencies:", error);
      }
    };

    fetchResidencies();  
  }, []);

  return (
    <>
      <Hero />
      <About residencies={residenciesList} />
    </>
  );
};

export default Home;