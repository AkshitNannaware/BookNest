import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
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
            <img src="/IMG_20250306_153931.png" alt="BookNest Logo" className='brand' />
          </NavLink>
        </div>

        <div className="advanced-search">
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <nav className='nav-links'>
          <NavLink to="/" className="nav">Home</NavLink>
          <NavLink to="/Residencies" className="nav">Residencies</NavLink>

          <div className="user-menu">
            <div className="icon-button" onClick={toggleDropdown}>
              <IoReorderThreeOutline className='icon' />
              <FaUser className='icon' />
            </div>
            {showDropdown && (
              <ul className="dropdown-list">
                <li><NavLink to="/Login">Login</NavLink></li>
                <li><NavLink to="/Signup">Sign Up</NavLink></li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
