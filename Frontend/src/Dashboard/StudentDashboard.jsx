import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const StudentDashboard = () => {
  const [rentedRooms, setRentedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const fetchRentedRooms = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const role = decoded?.role;

        if (role !== 'student' && role !== 'admin') {
          accessDenied(true);
          return;
        }

        const response = await fetch('http://localhost:5000/api/student/rented', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rented rooms');
        }

        const data = await response.json();
        setRentedRooms(data);
      } catch (error) {
        console.error('Error:', error);
        setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRentedRooms();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (accessDenied) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold text-xl">
        You do not have permission to view this dashboard.
      </div>
    );
  }

  return (
    <div className="rented-rooms-container">
      <h2 className="text-2xl font-bold mb-4">My Rented Rooms</h2>
      {rentedRooms.length === 0 ? (
        <p>You have not rented any rooms yet.</p>
      ) : (
        <div className="rented-rooms-grid">
          {rentedRooms.map((room) => (
            <div key={room._id} className="rented-room-card">
              <img src={room.photos?.[0]} alt={room.title} className="room-image" />
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <p><strong>Rent:</strong> Rs. {room.rent}</p>
              <p><strong>Location:</strong> {room.location}</p>
              <p><strong>Booked At:</strong> {new Date(room.bookedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;