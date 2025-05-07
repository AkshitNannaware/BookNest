import React, { useState } from 'react';
import "./Booking.css";

const BookingForm = ({ roomId, roomName, roomPrice }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    guests: 1,
    months: 1,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.gender) {
      setError("Please fill in all required fields.");
      return;
    }

    const bookingData = {
      roomId,
      ...userDetails,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setError("You must be logged in to book a room.");
        setLoading(false);
        return;
      }

      console.log("Token:", token);
      console.log("Booking Data:", bookingData);

      const response = await fetch('http://localhost:5000/api/book-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful! Check your email for confirmation.");
        setError("");
        setUserDetails({
          name: "",
          email: "",
          phone: "",
          gender: "",
          guests: 1,
          months: 1,
        });
      } else {
        setError(data.error || "Booking failed. Please try again.");
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setMessage("");
    } finally {
      setLoading(false);
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-toggle-group">
              {["Male", "Female", "Other"].map((option) => (
                <label key={option} className={`toggle-option ${userDetails.gender === option ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={userDetails.gender === option}
                    onChange={handleInputChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={userDetails.guests}
              onChange={handleInputChange}
              className="styled-select"
            >
              {[1, 2, 3, 4].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="months">How many months do you want to rent?</label>
            <select
              id="months"
              name="months"
              value={userDetails.months}
              onChange={handleInputChange}
              className="styled-select"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} month(s)</option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>

        <div className="booking-instructions">
          <h3>Booking Instructions</h3>
          <p>After submitting the form, you will receive an email confirmation. Please bring your student ID and Aadhaar card when you check in. You may cancel within 24 hours of booking.</p>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;