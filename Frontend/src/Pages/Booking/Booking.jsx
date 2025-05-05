import React, { useState } from 'react';
import "./Booking.css";

const BookingForm = ({ roomId, roomName, roomPrice }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email') {
      setUserDetails({ ...userDetails, [name]: value });
    } else {
      if (name === 'startDate') setStartDate(value);
      if (name === 'endDate') setEndDate(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !userDetails.name || !userDetails.email) {
      setError("Please fill in all fields.");
      return;
    }

    const bookingData = {
      roomId,
      userId: "dummyUserId", // Replace with actual user ID
      name: userDetails.name,
      email: userDetails.email,
      startDate,
      endDate,
    };

    try {
      const response = await fetch('http://localhost:5000/api/book-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful! Check your email for confirmation.");
        setError("");
      } else {
        setError(data.message || "Booking failed. Please try again.");
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <section className="booking-form-section">
      <div className="booking-form-container">
        <h2 className="form-title">Book Your Stay at {roomName}</h2>
        <p className="room-price">Price: ₹{roomPrice}</p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleInputChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="submit-btn">Book Now</button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;