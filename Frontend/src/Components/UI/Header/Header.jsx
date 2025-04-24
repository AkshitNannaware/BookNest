import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut) {
      alert("Please fill in all search details: Destination, Check-In, and Check-Out.");
      return;
    }
    console.log("Search Details:");
    console.log("Destination:", destination);
    console.log("Check-In:", checkIn);
    console.log("Check-Out:", checkOut);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <div className='navbar'>
        <div className='logo'>
          <NavLink to="/">
          {/* <img src="/IMG_20250415_130640[1].jpg" alt="" className='brand' /> */}
            <img src="/IMG_20250415_130640[1],logo.jpg" alt="BookNest Logo" className='brand' />
          </NavLink>
          <NavLink to="/">
            {/* <img src="/IMG_20250415_130640[1],logo text.jpg" alt="text" className='textbrand'/> */}
            <p className='textbrand'>Book Nest</p>
          </NavLink>
        </div>
        <nav className='nav-links'>
          <NavLink to="/" className="nav">Home</NavLink>
          <NavLink to="/Residencies" className="nav">Residencies</NavLink>
          <NavLink to="/Contact" className="nav">Contact</NavLink>

          <div className="user-menu">
            <div className="icon-button" onClick={toggleDropdown}>
              <IoReorderThreeOutline className='icon' />
              <FaUser className='icon' />
            </div>
            {showDropdown && (
              <ul className="dropdown-list">
                <li><NavLink to="/Login">Login</NavLink></li>
                <li><NavLink to="/Signup">Sign Up</NavLink></li>
                <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
