import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fake data (replace with actual fetch if needed)
        const usersData = [
          { _id: 'u1', username: 'john_doe', email: 'john@example.com', role: 'student' },
          { _id: 'u2', username: 'owner123', email: 'owner@example.com', role: 'owner' },
          { _id: 'u3', username: 'admin', email: 'admin@example.com', role: 'admin' },
        ];

        const roomsData = [
          {
            _id: 'r1',
            title: 'Cozy Single Room',
            owner: { username: 'owner123' },
            rent: 5000,
            location: 'Indore',
            available: true,
          },
          {
            _id: 'r2',
            title: 'Spacious Double Room',
            owner: { username: 'owner123' },
            rent: 8000,
            location: 'Pune',
            available: false,
          },
        ];

        const rentalsData = [
          {
            _id: 'r1',
            title: 'Cozy Single Room',
            owner: { username: 'owner123' },
            rentedBy: [
              {
                _id: 'rent1',
                user: { username: 'john_doe' },
                rentedAt: new Date().toISOString(),
              },
            ],
          },
        ];

        // Set mock data
        setUsers(usersData);
        setRooms(roomsData);
        setRentals(rentalsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Users Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">All Users</h3>
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Rooms Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">All Rooms</h3>
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Owner</th>
              <th className="py-2 px-4 text-left">Rent</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Available</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b">
                <td className="py-2 px-4">{room.title}</td>
                <td className="py-2 px-4">{room.owner?.username || 'N/A'}</td>
                <td className="py-2 px-4">₹{room.rent}</td>
                <td className="py-2 px-4">{room.location}</td>
                <td className="py-2 px-4">{room.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Rentals Section */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Rental Data</h3>
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Room</th>
              <th className="py-2 px-4 text-left">Owner</th>
              <th className="py-2 px-4 text-left">Rented By</th>
              <th className="py-2 px-4 text-left">Rented At</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((room) =>
              room.rentedBy.map((rental) => (
                <tr key={rental._id} className="border-b">
                  <td className="py-2 px-4">{room.title}</td>
                  <td className="py-2 px-4">{room.owner?.username || 'N/A'}</td>
                  <td className="py-2 px-4">{rental.user?.username || 'N/A'}</td>
                  <td className="py-2 px-4">
                    {new Date(rental.rentedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
