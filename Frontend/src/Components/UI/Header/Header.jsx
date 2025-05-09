import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import './Header.css'; // Import your CSS file for styling

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 🔍 Check login state and extract email from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email); // ✅ set email from token
      } catch (err) {
        console.error("Invalid token", err);
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    navigate('/');
  };

  return (
    <header>
      <div className='navbar'>
        <div className='logo'>
          <NavLink to="/">
            <img src="/IMG_20250415_130640[1],logo.jpg" alt="BookNest Logo" className='brand' />
          </NavLink>
          <NavLink to="/">
            <p className='textbrand'>Book Nest</p>
          </NavLink>
        </div>
        <nav className='nav-links'>
          <NavLink to="/" className="nav">Home</NavLink>
          <NavLink to="/Residencies" className="nav">Residencies</NavLink>
          <NavLink to="/Contact" className="nav">Contact</NavLink>

          <div className="user-menu" ref={dropdownRef}>
            <div className="icon-button" onClick={toggleDropdown}>
              <IoReorderThreeOutline className='icon' />
              <FaUser className='icon' />
            </div>
            {showDropdown && (
              <ul className="dropdown-list">
                {!userEmail ? (
                  <>
                    <li><NavLink to="/Login" onClick={closeDropdown}>Login</NavLink></li>
                    <li><NavLink to="/Signup" onClick={closeDropdown}>Sign Up</NavLink></li>
                  </>
                ) : (
                  <>
                    <li className="username">{userEmail.split('@')[0]}</li>
                    <li><NavLink to="/Dashboard" onClick={closeDropdown}>Dashboard</NavLink></li>
                    <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                  </>
                )}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;