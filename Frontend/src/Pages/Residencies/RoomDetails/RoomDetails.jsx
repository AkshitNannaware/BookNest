import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./RoomDetails.css";
import axios from "axios";
import BookingForm from "../../Booking/Booking";

const RoomDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedRoom = location.state?.room;

  const [room, setRoom] = useState(passedRoom || null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (passedRoom) return;

    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(res.data);
        console.log(res.data);  // Log the response to check the room object
      } catch (err) {
        console.error("Failed to fetch room details", err);
        setError("Unable to load room details.");
      }
    };

    fetchRoom();
  }, [id, passedRoom]);

  if (error) return <p className="error-message">{error}</p>;
  if (!room) return <p>Loading room details...</p>;

  const getImageSrc = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      const imageUrl = photos[0];
      if (imageUrl.startsWith("/uploads")) {
        return `http://localhost:5000${imageUrl}`; // Local image
      } else if (imageUrl.startsWith("http")) {
        return imageUrl; // External URL
      }
    }
    return "https://via.placeholder.com/300x200?text=No+Image+Available"; // Fallback
  };

  return (
    <div className="room-details-container">
      <h1 className="room-title">{room.title}</h1>
      <img
        src={getImageSrc(room.photos)}
        alt={room.title}
        className="room-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available"; // Fallback if error
        }}
      />
      <p className="room-location">
        <strong>Location:</strong> {room.location}
      </p>
      <p className="room-rent">
        <strong>Rent:</strong> ₹{room.rent}
      </p>
      <p className="room-mobile">
        <strong>Owner Mobile:</strong> {room.mobile || "Not provided"}
      </p>
      <p className="room-description">
        <strong>Description:</strong> {room.description || "No description available."}
      </p>
      <p className="room-facilities">
        <strong>Facilities:</strong>
        {room.facilities && room.facilities.length > 0
          ? room.facilities.join(", ")
          : "No facilities listed."}
      </p>

      <button className="book-now-btn" onClick={() => setShowBookingForm(true)}>
        Book Now
      </button>

      {showBookingForm && (
        <BookingForm
          roomId={room._id}
          roomName={room.title}
          roomPrice={room.rent}
          room={room}
        />
      )}
    </div>
  );
};

export default RoomDetails;