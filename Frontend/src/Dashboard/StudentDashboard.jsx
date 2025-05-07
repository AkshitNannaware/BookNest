import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const StudentDashboard = () => {
  const [rentedRooms, setRentedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRentedRooms = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first.');
        window.location.href = '/login';
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);

        if (decoded.role !== 'student' && decoded.role !== 'admin') {
          alert('Access denied. Only students and admins can view this page.');
          return;
        }

        const response = await fetch('http://localhost:5000/api/rooms/rented', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rented rooms');
        }

        const data = await response.json();
        setRentedRooms(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Invalid or expired session. Please login again.');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchRentedRooms();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rented-rooms-container">
      <h2>My Rented Rooms</h2>
      {rentedRooms.length === 0 ? (
        <p>You have not rented any rooms yet.</p>
      ) : (
        <div className="rented-rooms-grid">
          {rentedRooms.map((room) => (
            <div key={room._id} className="rented-room-card">
              <img src={room.photos && room.photos[0]} alt={room.title} className="room-image" />
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <p><strong>Rent:</strong> Rs. {room.rent}</p>
              <p><strong>Location:</strong> {room.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;