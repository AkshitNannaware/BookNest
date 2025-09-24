import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiHome, FiMapPin, FiDollarSign, FiCalendar, FiTrash2, FiClock, FiAlertCircle } from 'react-icons/fi';
import { FaBed, FaBath, FaWifi, FaParking, FaSnowflake } from 'react-icons/fa';

const StudentDashboard = () => {
  const [rentedRooms, setRentedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [noRooms, setNoRooms] = useState(false);


  const getImageSrc = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      const imageUrl = photos[0];
      if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        return 'https://via.placeholder.com/600x400?text=No+Image+Available';
      }
      if (imageUrl.startsWith('/uploads')) {
        return `http://localhost:5000${imageUrl}`;
      } else if (imageUrl.startsWith('http')) {
        return imageUrl;
      } else {
        return `http://localhost:5000${imageUrl}`;
      }
    }
    return 'https://via.placeholder.com/600x400?text=No+Image+Available';
  };

  const fetchRentedRooms = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      setLoading(true);
      const decoded = jwtDecode(token);
      const role = decoded?.role?.toLowerCase();
      if (!role || (role !== 'student' && role !== 'admin')) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/student/rented`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      if (response.status === 404) {
        setNoRooms(true);
        setRentedRooms([]);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch rented rooms');
      }

      const data = await response.json();
      const roomsWithBookingId = data.map((room) => ({
        ...room,
        bookingId: room.bookingId || room._id,
      }));

      setRentedRooms(roomsWithBookingId);
      setNoRooms(data.length === 0);
    } catch (error) {
      console.error('Error:', error);
      setAccessDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`hhtp://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to cancel booking');

      await fetchRentedRooms();
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const canCancel = (bookedAt) => {
    const bookedDate = new Date(bookedAt);
    const now = new Date();
    const diffHours = (now - bookedDate) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <FaWifi className="text-blue-500" />;
      case 'parking':
        return <FaParking className="text-gray-600" />;
      case 'ac':
        return <FaSnowflake className="text-blue-300" />;
      case 'bed':
        return <FaBed className="text-brown-500" />;
      case 'bath':
        return <FaBath className="text-blue-400" />;
      default:
        return <FiHome className="text-gray-500" />;
    }
  };

  useEffect(() => {
    fetchRentedRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <FiAlertCircle className="text-red-600 text-3xl" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          You don't have permission to view this dashboard.
        </p>
      </div>
    );
  }

  if (noRooms) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <FiHome className="text-blue-600 text-3xl" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Rented Rooms</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          You haven't rented any rooms yet.
        </p>
        <button
          onClick={() => (window.location.href = '/rooms')}
          className="mt-4 w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Browse Available Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            My Rented Rooms
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-gray-500">
            Manage your current room bookings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rentedRooms.map((room) => (
            <div
              key={room.bookingId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <img
                  src={getImageSrc(room.photos)}
                  alt={room.title || 'Room'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image+Available';
                  }}
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-md shadow-sm">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    ₹{room.rent}/mo
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {room.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1 text-xs sm:text-sm">
                      <FiMapPin className="mr-1" size={14} />
                      <span>{room.location}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-2 sm:mt-3 text-gray-600 text-sm line-clamp-2">
                  {room.description}
                </p>

                {room.facilities?.length > 0 && (
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                      Facilities:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {getFacilityIcon(facility)}
                          <span className="ml-1">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <FiCalendar className="mr-1" size={14} />
                    <span>
                      Booked on: {new Date(room.bookedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {canCancel(room.bookedAt) ? (
                    <button
                      onClick={() => cancelBooking(room.bookingId)}
                      className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      <FiTrash2 className="inline mr-1" />
                      Cancel Booking
                    </button>
                  ) : (
                    <div className="mt-3 sm:mt-4 flex items-center justify-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-xs sm:text-sm text-gray-500">
                      <FiClock className="mr-1" />
                      Cancellation period expired
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;